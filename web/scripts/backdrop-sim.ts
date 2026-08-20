/**
 * Pixel-accurate simulation of a finished client showcase frame.
 *
 * MIRRORS components/site/client-backdrop.tsx AND the two scrims in
 * components/home/CustomerStories.tsx. Those three and this file must be changed
 * together — this is the model the contrast guarantee is measured against, so if
 * it drifts from the components the guarantee stops meaning anything. Running
 * the checker with --sheet renders the simulation as an image, which is the
 * cheapest way to notice drift.
 *
 * Node-only on purpose: none of this belongs in the browser bundle.
 */

import sharp from "sharp";
import {
  ACCENT_RGB,
  GROUND_RGB,
  ORB_RGB,
  TINT_RGB,
  RIDGE_BANDS,
  VIEW,
  rimStrokes,
  shadeBands,
  type Backdrop,
} from "../lib/backdrops.ts";

/** Must match PLATE_OPACITY in the component. */
export const PLATE_OPACITY = 0.33;

type RGB = [number, number, number];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** source-over of an opaque tint at `alpha` onto `base`. */
function over(base: RGB, tint: RGB, alpha: number): RGB {
  return [
    lerp(base[0], tint[0], alpha),
    lerp(base[1], tint[1], alpha),
    lerp(base[2], tint[2], alpha),
  ];
}

/**
 * Coverage masks for one ridge: the stacked shade regions, and the stacked rim
 * strokes. Every band is drawn at 1/N opacity, so the grey value is the fraction
 * of the stack covering that pixel.
 *
 * Multiplying that by the ridge's alpha slightly overstates the true sequential
 * source-over accumulation, which makes the simulated backdrop marginally
 * brighter than the real one and the reported contrast marginally worse. That
 * direction is deliberate.
 */
function svgMask(body: string, w: number, h: number): Promise<Buffer> {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${VIEW.w} ${VIEW.h}" preserveAspectRatio="none"><rect width="${VIEW.w}" height="${VIEW.h}" fill="#000"/>${body}</svg>`;
  return sharp(Buffer.from(svg)).toColourspace("b-w").raw().toBuffer();
}

async function coverage(
  spec: Backdrop,
  w: number,
  h: number,
): Promise<{ shade: Buffer; rim: Buffer }[]> {
  return Promise.all(
    spec.ridges.map(async (ridge) => {
      const shadeBody = shadeBands(ridge, RIDGE_BANDS)
        .map((b) => `<path d="${b.d}" fill="#fff" fill-opacity="${(1 / RIDGE_BANDS).toFixed(5)}"/>`)
        .join("");
      const rimBody = rimStrokes(ridge, RIDGE_BANDS)
        .map(
          (st) =>
            `<path d="${st.d}" fill="none" stroke="#fff" stroke-opacity="${(1 / RIDGE_BANDS).toFixed(5)}" stroke-width="${st.width.toFixed(3)}"/>`,
        )
        .join("");
      const [shade, rim] = await Promise.all([
        svgMask(shadeBody, w, h),
        svgMask(rimBody, w, h),
      ]);
      return { shade, rim };
    }),
  );
}

/** Two stacked black scrims. Alpha of their union at a given pixel. */
export function scrimAlpha(x: number, y: number, w: number, h: number): number {
  const fy = y / h;
  // bg-gradient-to-t from-black/72 via-black/22 to-black/34 — bottom to top.
  const vertical = fy > 0.5 ? lerp(0.22, 0.72, (fy - 0.5) / 0.5) : lerp(0.34, 0.22, fy / 0.5);
  // bg-gradient-to-r from-black/48 via-black/4 to-transparent — left to right.
  const fx = x / w;
  const horizontal = fx < 0.5 ? lerp(0.48, 0.04, fx / 0.5) : lerp(0.04, 0, (fx - 0.5) / 0.5);
  return 1 - (1 - vertical) * (1 - horizontal);
}

/**
 * Renders one frame as raw RGB. `plate` is the generated webp, already decoded
 * and resized to w x h, or null to simulate the coded layer on its own — which
 * is the fallback path and gets checked too.
 */
export async function simulate(
  spec: Backdrop,
  w: number,
  h: number,
  plate: Buffer | null,
): Promise<Buffer> {
  const masks = await coverage(spec, w, h);

  const lx = (spec.light.x / 100) * w;
  const ly = (spec.light.y / 100) * h;
  const farthest = Math.max(
    ...([[0, 0], [w, 0], [0, h], [w, h]] as const).map(([px, py]) => Math.hypot(px - lx, py - ly)),
  );
  const bloomR = farthest * (spec.light.spread / 100);
  const coreR = farthest * (spec.light.core.spread / 100);
  const bloomTint = ORB_RGB[spec.light.tint];
  const coreTint = ACCENT_RGB[spec.light.core.tint];

  const gFrom = ORB_RGB[spec.ground.from];
  const gTo = ORB_RGB[spec.ground.to];
  // CSS gradient angles run clockwise from "to top".
  const rad = ((spec.ground.angle - 90) * Math.PI) / 180;
  const ax = Math.cos(rad);
  const ay = Math.sin(rad);

  const out = Buffer.allocUnsafe(w * h * 3);

  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const i = y * w + x;
      let px: RGB = [...GROUND_RGB] as RGB;

      // Ground gradient: from -> to at 62% -> transparent at 100%.
      const t = clamp01((x / w - 0.5) * ax + (y / h - 0.5) * ay + 0.5);
      if (t < 0.62) {
        const u = t / 0.62;
        px = over(
          px,
          [lerp(gFrom[0], gTo[0], u), lerp(gFrom[1], gTo[1], u), lerp(gFrom[2], gTo[2], u)],
          lerp(spec.ground.alpha, spec.ground.alpha * 0.45, u),
        );
      } else {
        px = over(px, gTo, spec.ground.alpha * 0.45 * (1 - (t - 0.62) / 0.38));
      }

      // Bloom, then its core on top.
      const dist = Math.hypot(x - lx, y - ly);
      if (dist < bloomR) px = over(px, bloomTint, spec.light.strength * (1 - dist / bloomR));
      if (dist < coreR) px = over(px, coreTint, spec.light.core.strength * (1 - dist / coreR));

      // Ridge mass, then rim, per ridge, back to front.
      for (let k = 0; k < spec.ridges.length; k += 1) {
        const ridge = spec.ridges[k];
        px = over(px, GROUND_RGB, (masks[k].shade[i] / 255) * ridge.shade);
        px = over(px, TINT_RGB[ridge.tint], (masks[k].rim[i] / 255) * ridge.rim);
      }

      // radial-gradient(115% 85% at 50% 35%, transparent, bd-ground/0.6)
      const vd = clamp01(Math.hypot((x / w - 0.5) / 1.15, (y / h - 0.35) / 0.85));
      px = over(px, GROUND_RGB, 0.6 * vd);

      // Plate, screen at PLATE_OPACITY. Grain is omitted: at 0.04 opacity it
      // moves a channel by under one level and cannot decide a ratio.
      if (plate) {
        const o = i * 3;
        for (let c = 0; c < 3; c += 1) {
          const s = plate[o + c];
          const screened = 255 - ((255 - px[c]) * (255 - s)) / 255;
          px[c] = px[c] + PLATE_OPACITY * (screened - px[c]);
        }
      }

      // Scrims.
      const k = 1 - scrimAlpha(x, y, w, h);
      const o = i * 3;
      out[o] = Math.max(0, Math.min(255, px[0] * k));
      out[o + 1] = Math.max(0, Math.min(255, px[1] * k));
      out[o + 2] = Math.max(0, Math.min(255, px[2] * k));
    }
  }

  return out;
}

export async function decodePlate(file: string, w: number, h: number): Promise<Buffer> {
  return sharp(file).resize(w, h, { fit: "cover" }).removeAlpha().raw().toBuffer();
}
