/**
 * Contrast guarantee for the client showcase.
 *
 *   node scripts/check-backdrop-contrast.ts            # check, exit 1 on failure
 *   node scripts/check-backdrop-contrast.ts --sheet     # also write a preview sheet
 *
 * The backdrops are generated artwork, so "it looked fine" is not a guarantee —
 * retuning one number in lib/backdrops.ts can quietly push the eyebrow under
 * threshold on one of seven compositions at one of two breakpoints. This
 * measures it instead: it simulates the finished frame (scripts/backdrop-sim.ts),
 * walks the rectangle each piece of type actually occupies, and reports the worst
 * ratio found in it.
 *
 * Every composition is checked twice — with the plate and without it — because
 * the coded layer is a shipping fallback, not a placeholder.
 */

import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { clientBackdrops, type Backdrop } from "../lib/backdrops.ts";
import { decodePlate, simulate } from "./backdrop-sim.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(HERE, "..", "public");

/* ---- what the type needs ------------------------------------------- */

type Zone = {
  label: string;
  /** White alpha the type is drawn at. */
  alpha: number;
  /** WCAG AA floor: 3 for large text, 4.5 for the rest. */
  floor: number;
  rect: [x0: number, y0: number, x1: number, y1: number];
};

/**
 * Type positions, derived from the flex layout in CustomerStories.tsx by walking
 * the margin chain. Rectangles are drawn generously — a zone wider than the
 * glyphs can only pull in brighter pixels, which lowers the reported ratio.
 */
function zones(w: number, h: number, wide: boolean): Zone[] {
  const padX = wide ? 32 : 20;
  const padY = wide ? 48 : 40;
  const centre = Math.min(672, w - padX * 2);
  const cx0 = (w - centre) / 2;
  const cx1 = cx0 + centre;
  const figX1 = Math.min(padX + 544, w - padX);

  // Top block, top-down.
  const eyebrowY = padY;
  const h2Y = eyebrowY + 11 + 20;
  const h2H = wide ? 2 * 48 : 4 * 33;
  const pY = h2Y + h2H + 16;
  const pH = wide ? 53 : 69;
  const logoY = pY + pH + 36;

  // Figure block, bottom-up.
  const bottom = h - padY;
  const linkY = bottom - 20;
  const sectorY1 = linkY - 28;
  const sectorH = wide ? 53 : 74;
  const h3Y1 = sectorY1 - sectorH - 16;
  const h3H = wide ? 46 : 32;
  const relY1 = h3Y1 - h3H - 16;

  return [
    { label: "eyebrow CLIENTS", alpha: 0.55, floor: 4.5, rect: [cx0, eyebrowY, cx1, eyebrowY + 11] },
    { label: "h2 heading", alpha: 1, floor: 3, rect: [cx0, h2Y, cx1, h2Y + h2H] },
    { label: "sub-paragraph", alpha: 0.65, floor: 4.5, rect: [cx0, pY, cx1, pY + pH] },
    { label: "logo rail (inactive)", alpha: 0.4, floor: 3, rect: [padX, logoY, w - padX, logoY + 49] },
    { label: "relationship", alpha: 0.55, floor: 4.5, rect: [padX, relY1 - 13, figX1, relY1] },
    { label: "h3 company", alpha: 1, floor: 3, rect: [padX, h3Y1 - h3H, figX1, h3Y1] },
    { label: "sector", alpha: 0.7, floor: 4.5, rect: [padX, sectorY1 - sectorH, figX1, sectorY1] },
    { label: "CTA link", alpha: 0.85, floor: 4.5, rect: [padX, linkY, figX1, linkY + 20] },
  ];
}

/** Two breakpoints: the lg frame, and mobile at the height the content forces. */
const FRAMES = [
  { name: "lg", w: 1152, h: 608, wide: true },
  { name: "sm", w: 375, h: 668, wide: false },
];

/* ---- WCAG ---------------------------------------------------------- */

const channel = (v: number) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (r: number, g: number, b: number) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

function ratio(a: number, b: number): number {
  const hi = Math.max(a, b);
  const lo = Math.min(a, b);
  return (hi + 0.05) / (lo + 0.05);
}

/** Worst ratio for white-at-alpha over any pixel inside the zone. */
function worst(px: Buffer, w: number, zone: Zone): number {
  const [x0, y0, x1, y1] = zone.rect.map(Math.round) as [number, number, number, number];
  let low = Infinity;
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const o = (y * w + x) * 3;
      const bg = luminance(px[o], px[o + 1], px[o + 2]);
      const fg = luminance(
        zone.alpha * 255 + (1 - zone.alpha) * px[o],
        zone.alpha * 255 + (1 - zone.alpha) * px[o + 1],
        zone.alpha * 255 + (1 - zone.alpha) * px[o + 2],
      );
      const r = ratio(fg, bg);
      if (r < low) low = r;
    }
  }
  return low;
}

/* ---- run ----------------------------------------------------------- */

const wantSheet = process.argv.includes("--sheet");
const tiles: Buffer[] = [];
const failures: string[] = [];
let globalWorst = { ratio: Infinity, where: "" };
// Tracked apart from the decorative logo rail: only this one gates the design,
// and knowing its headroom is what says whether the set can go brighter.
let worstText = { ratio: Infinity, where: "" };

for (const [id, raw] of Object.entries(clientBackdrops)) {
  const spec = raw as Backdrop;
  const line: string[] = [];

  for (const frame of FRAMES) {
    for (const withPlate of [true, false]) {
      const plate = withPlate
        ? await decodePlate(join(PUBLIC, spec.plate), frame.w, frame.h)
        : null;
      const px = await simulate(spec, frame.w, frame.h, plate);

      if (wantSheet && withPlate && frame.wide) {
        tiles.push(
          await sharp(px, { raw: { width: frame.w, height: frame.h, channels: 3 } })
            .resize(576)
            .composite([
              {
                input: Buffer.from(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="576" height="304"><text x="14" y="26" font-family="monospace" font-size="17" fill="#fff">${id}</text></svg>`,
                ),
                top: 0,
                left: 0,
              },
            ])
            .png()
            .toBuffer(),
        );
      }

      let frameWorst = Infinity;
      for (const zone of zones(frame.w, frame.h, frame.wide)) {
        const r = worst(px, frame.w, zone);
        frameWorst = Math.min(frameWorst, r);
        const where = `${id} ${frame.name}${withPlate ? "" : " (coded only)"} — ${zone.label}`;
        if (r < globalWorst.ratio) globalWorst = { ratio: r, where };
        if (zone.floor >= 4.5 && r < worstText.ratio) worstText = { ratio: r, where };
        if (r < zone.floor) {
          failures.push(`${where}: ${r.toFixed(2)}:1, needs ${zone.floor}:1`);
        }
      }
      line.push(`${frame.name}${withPlate ? "" : "*"} ${frameWorst.toFixed(1)}`);
    }
  }

  console.log(`  ${id.padEnd(12)} worst ratio  ${line.join("   ")}`);
}

console.log("\n  * = coded layer only, plate absent");
console.log(`  tightest anywhere:   ${globalWorst.ratio.toFixed(2)}:1 — ${globalWorst.where}`);
console.log(`  tightest small text: ${worstText.ratio.toFixed(2)}:1 (needs 4.50) — ${worstText.where}`);

if (wantSheet) {
  const sheet = await sharp({
    create: { width: 576 * 2, height: 304 * 4, channels: 3, background: "#000" },
  })
    .composite(tiles.map((input, i) => ({ input, left: (i % 2) * 576, top: Math.floor(i / 2) * 304 })))
    .png()
    .toBuffer();
  // Gitignored: a build artefact for eyeballing, not a repo asset.
  const out = join(HERE, "..", "backdrop-sheet.png");
  await writeFile(out, sheet);
  console.log(`  sheet: ${out}`);
}

if (failures.length) {
  console.error(`\n  ${failures.length} zone(s) under AA:`);
  for (const f of failures) console.error(`    ${f}`);
  process.exit(1);
}
console.log("  all zones clear WCAG AA.\n");
