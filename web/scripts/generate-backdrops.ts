/**
 * Renders the seven client showcase plates.
 *
 *   node scripts/generate-backdrops.ts
 *
 * Reads the same specs the coded layer draws from (lib/backdrops.ts), so the
 * plate and the CSS/SVG beneath it describe one form instead of two that
 * happen to sit on top of each other. Deterministic: same spec in, byte-identical
 * plate out, so re-running this is never a source of diff noise.
 *
 * WHAT THE PLATE CARRIES. Only what CSS cannot do cheaply — true Gaussian
 * falloff on the ridge haze, the light bleeding over each crest, the soft
 * gradation of the bloom, and grain. It does *not* restate the ground gradient:
 * the plate composites in `screen`, so anything drawn twice would simply double.
 *
 * WHY IT IS SO DARK. `screen` over a near-black ground is close to a plain add,
 * so a plate pixel is roughly the light it contributes. The section's budget is
 * about 40/255 of added light at the brightest point, which keeps the dimmest
 * type on the section above 4.5:1. Rather than store those tiny values — where
 * webp would band badly — each plate is rendered at ~3x amplitude and scaled
 * back by PLATE_OPACITY in the component. Same result on screen, three times the
 * quantisation headroom.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  ACCENT_RGB,
  GROUND_RGB,
  ORB_RGB,
  TINT_RGB,
  VIEW,
  clientBackdrops,
  ridgeCurve,
  type Backdrop,
  type AccentToken,
  type OrbToken,
} from "../lib/backdrops.ts";

/* ---- output shape -------------------------------------------------- */

/** The frame is ~1152 CSS px at the widest; 2400 covers 2x DPR with room. */
const W = 2400;
const H = 1280;
const SCALE = W / VIEW.w;

/**
 * Must match PLATE_OPACITY in components/site/client-backdrop.tsx. The plates
 * are rendered this many times brighter than they are shown.
 */
const AMPLITUDE = 3.05;

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "client-backdrops");

/* ---- tunables, shared by all seven --------------------------------- */

/**
 * The plate carries the rim light and the bloom, and nothing else.
 *
 * It composites in `screen`, so it can only add light — it cannot draw the dark
 * mass of a ridge, and it must not restate the ground gradient, which would
 * simply double. What it contributes that CSS cannot is a true Gaussian rim
 * instead of a six-step stack, and smoothstep gradation on the bloom.
 */
const RIM_SHARE = 0.55;
/** Fraction of the coded bloom that the plate's soft gradation adds. */
const BLOOM_SHARE = 0.55;
/** Same, for the bright core. Held lower — the core is already a hard peak. */
const CORE_SHARE = 0.4;
/** Edge falloff. Identical across the set — part of the shared family. */
const VIGNETTE = 0.58;
/** Grain amplitude in 8-bit levels, pre-amplitude. Identical across the set. */
const GRAIN = 3.2;

/* ---- helpers ------------------------------------------------------- */

/** Rasterises one SVG to a single-channel mask, Gaussian-softened. */
async function mask(svg: string, sigma: number): Promise<Buffer> {
  let pipe = sharp(Buffer.from(svg));
  if (sigma > 0.4) pipe = pipe.blur(sigma);
  return pipe.toColourspace("b-w").raw().toBuffer();
}

function ridgeSvg(body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${VIEW.w} ${VIEW.h}" preserveAspectRatio="none"><rect width="${VIEW.w}" height="${VIEW.h}" fill="#000"/>${body}</svg>`;
}

/**
 * Brightened form of a token, for the rim. Light coming over a ridge reads
 * lighter and less saturated than the mass it clears, so the rim cannot simply
 * reuse the tint at full saturation.
 */
function rimTint(token: OrbToken | AccentToken): [number, number, number] {
  const [r, g, b] = TINT_RGB[token];
  return [r + (255 - r) * 0.4, g + (255 - g) * 0.4, b + (255 - b) * 0.4];
}

/** Deterministic value noise. Seeded per plate so the grain is stable. */
function noise(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff - 0.5;
  };
}

/* ---- one plate ----------------------------------------------------- */

async function render(id: string, spec: Backdrop): Promise<number> {
  // One Gaussian rim per ridge — the plate's whole reason for existing.
  const rims = await Promise.all(
    spec.ridges.map((ridge) =>
      mask(
        ridgeSvg(
          `<path d="${ridgeCurve(ridge.heights)}" fill="none" stroke="#fff" stroke-width="${(VIEW.h * ridge.spread).toFixed(2)}"/>`,
        ),
        ridge.spread * VIEW.h * 0.5 * SCALE + ridge.softness,
      ),
    ),
  );

  // Bloom geometry, mirroring the CSS radial in the coded layer.
  const lx = (spec.light.x / 100) * W;
  const ly = (spec.light.y / 100) * H;
  const corners = [
    [0, 0],
    [W, 0],
    [0, H],
    [W, H],
  ];
  const farthest = Math.max(...corners.map(([x, y]) => Math.hypot(x - lx, y - ly)));
  const bloomR = farthest * (spec.light.spread / 100);
  const bloomTint = ORB_RGB[spec.light.tint];
  const coreR = farthest * (spec.light.core.spread / 100);
  const coreTint = ACCENT_RGB[spec.light.core.tint];

  const rnd = noise(
    // Seed from the id so each plate's grain differs while staying reproducible.
    [...id].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7),
  );

  const out = Buffer.allocUnsafe(W * H * 3);
  const cx = W / 2;
  const cy = H / 2;
  const halfDiag = Math.hypot(cx, cy);

  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      const i = y * W + x;
      let r = 0;
      let g = 0;
      let b = 0;

      for (let k = 0; k < spec.ridges.length; k += 1) {
        const ridge = spec.ridges[k];
        const tint = rimTint(ridge.tint);
        const a = (rims[k][i] / 255) * ridge.rim * RIM_SHARE;
        r += a * tint[0];
        g += a * tint[1];
        b += a * tint[2];
      }

      const dist = Math.hypot(x - lx, y - ly);
      const dc = dist / coreR;
      if (dc < 1) {
        const t = 1 - dc;
        const core = t * t * (3 - 2 * t) * spec.light.core.strength * CORE_SHARE;
        r += core * coreTint[0];
        g += core * coreTint[1];
        b += core * coreTint[2];
      }

      const d = dist / bloomR;
      if (d < 1) {
        // Smoothstep rather than the linear CSS ramp — the gradation is the
        // whole reason the plate exists.
        const t = 1 - d;
        const bloom = t * t * (3 - 2 * t) * spec.light.strength * BLOOM_SHARE;
        r += bloom * bloomTint[0];
        g += bloom * bloomTint[1];
        b += bloom * bloomTint[2];
      }

      // Attenuate toward the edges. Additive layer, so this is a scale, not a
      // multiply toward black.
      const v = 1 - VIGNETTE * (Math.hypot(x - cx, y - cy) / halfDiag) ** 2;
      const n = rnd() * GRAIN;

      const o = i * 3;
      out[o] = Math.max(0, Math.min(255, (r * v + n) * AMPLITUDE));
      out[o + 1] = Math.max(0, Math.min(255, (g * v + n) * AMPLITUDE));
      out[o + 2] = Math.max(0, Math.min(255, (b * v + n) * AMPLITUDE));
    }
  }

  const webp = await sharp(out, { raw: { width: W, height: H, channels: 3 } })
    .webp({ quality: 84, effort: 6, smartSubsample: true })
    .toBuffer();

  await writeFile(join(OUT_DIR, `${id}.webp`), webp);
  return webp.length;
}

/* ---- run ----------------------------------------------------------- */

await mkdir(OUT_DIR, { recursive: true });

let total = 0;
for (const [id, spec] of Object.entries(clientBackdrops)) {
  const bytes = await render(id, spec as Backdrop);
  total += bytes;
  console.log(`  ${id.padEnd(12)} ${(bytes / 1024).toFixed(1).padStart(7)} KB   ${spec.note}`);
}
console.log(`\n  ${"total".padEnd(12)} ${(total / 1024).toFixed(1).padStart(7)} KB  across ${Object.keys(clientBackdrops).length} plates`);
console.log(`  ground reference ${GROUND_RGB.join(",")} — plates add light only\n`);
