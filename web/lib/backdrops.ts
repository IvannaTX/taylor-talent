/**
 * Client showcase backdrops — the Monterey-inspired atmospheric system.
 *
 * This section carries no photography. Seven named clients each get their own
 * composition, and a stranger from a stock library standing in for a company we
 * actually recruit for is exactly what this replaces.
 *
 * Each backdrop is rendered twice from the single spec below:
 *
 *   1. A coded layer (components/site/client-backdrop.tsx) — a deep ground, a
 *      bloom at the light origin, and the ridge silhouettes as gradient-filled
 *      SVG. Reads from the CSS custom properties, so the theme toggle retunes
 *      it, and it is a complete backdrop on its own: if the plate never loads,
 *      nothing looks broken or unfinished.
 *   2. A generated plate (scripts/generate-backdrops.ts -> public/images/
 *      client-backdrops/*.webp) — the same ridge geometry rendered at 2400px
 *      with true Gaussian falloff, atmospheric haze and baked grain, which is
 *      the dimensional depth CSS cannot reach cheaply. It composites over the
 *      coded layer in `soft-light`, so it deepens and lifts what is already
 *      there rather than covering it.
 *
 * Sharing the geometry is the point: both layers draw the same ridges, so they
 * reinforce into one form instead of fighting as two.
 *
 * PALETTE DISCIPLINE. globals.css reserves the violet -> cyan accent ramp for
 * the mark, the hero line and active states — "never for large fills". So every
 * large fill here is built on the `--orb-*` atmospheric tokens, which exist for
 * exactly this purpose, and the accent ramp appears only as the small bright
 * core of a bloom, at or below 0.12 alpha over a fraction of the frame.
 *
 * The tokens carry more alpha here than the site-wide ambient field does, which
 * runs them at 0.22. That field sits behind every page and has to stay out of
 * the way; here the backdrop is the subject of a self-contained dark card. The
 * guarantee is therefore measured rather than assumed —
 * scripts/check-backdrop-contrast.ts simulates the finished composite, scrims
 * included, and reports the worst-case ratio for every piece of type that sits
 * over it. Retune these numbers and re-run it.
 *
 * The set is deliberately blue-violet throughout, with cyan spent as an accent
 * rather than a field: the teal token at field strength over near-black reads
 * green, which looks unwell rather than premium. What distinguishes the cool
 * compositions from the warm ones is where the cyan lands, not how much of it
 * there is.
 */

/* ---- geometry ----------------------------------------------------- */

/** The coordinate space both renderers draw in. */
export const VIEW = { w: 1000, h: 560 } as const;

export type AccentToken = "bd-violet" | "bd-indigo" | "bd-cyan";

/**
 * The accent end of the same palette, spent only on rim light and bloom cores.
 * Mirrors `--bd-violet` / `--bd-indigo` / `--bd-cyan`.
 */
export const ACCENT_RGB: Record<AccentToken, [number, number, number]> = {
  "bd-violet": [167, 139, 250],
  "bd-indigo": [110, 123, 255],
  "bd-cyan": [52, 231, 228],
};

/**
 * A ridge is sampled heights across the frame, left to right, where 0 is the
 * top edge and 1 the bottom. Stored as samples rather than path data so the
 * curve is generated identically in the browser and in Node, and so a
 * composition can be retuned by editing numbers instead of bezier handles.
 *
 * Each ridge renders as two things, which together are what actually reads as a
 * ridge rather than as a cloud: a dark mass deepening below the crest, and a rim
 * of light caught along the crest itself. An earlier revision had only soft
 * tinted haze, and the silhouettes disappeared into the bloom.
 */
export type Ridge = {
  heights: number[];
  /**
   * Tint of the rim light on the crest. Accent-ramp tokens are allowed here and
   * only here: the rim is a narrow bright line, which is accent use, and the
   * teal atmospheric token brightens to a green that reads unwell. Accent rims
   * run at roughly half the alpha, being far brighter to begin with.
   */
  tint: OrbToken | AccentToken;
  /** Peak alpha of that rim. */
  rim: number;
  /** How far the rim spreads either side of the crest, as a fraction of height. */
  spread: number;
  /** Peak alpha of the mass below the crest. Pulls toward the ground colour. */
  shade: number;
  /** How deep that mass reaches, as a fraction of the frame. */
  depth: number;
  /** Extra Gaussian softness, plate only, in viewBox units. */
  softness: number;
};

export type OrbToken = "bd-a" | "bd-b" | "bd-c";

/**
 * The atmospheric palette, duplicated here because the plate generator runs in
 * Node with no CSS to read. Mirrors the `--bd-*` custom properties in
 * globals.css, which are defined once and never overridden per theme: the
 * showcase's type is hardcoded white, so the surface is dark in both themes and
 * a theme-aware ground would turn pale under it.
 */
export const ORB_RGB: Record<OrbToken, [number, number, number]> = {
  "bd-a": [79, 70, 229],
  "bd-b": [30, 64, 175],
  "bd-c": [13, 148, 136],
};

/** Near-black ground, matching `--bd-ground`. */
export const GROUND_RGB: [number, number, number] = [6, 7, 9];

/** Either palette family, for the one field that accepts both. */
export const TINT_RGB: Record<OrbToken | AccentToken, [number, number, number]> = {
  ...ORB_RGB,
  ...ACCENT_RGB,
};

export type Light = {
  /** Position as a percentage of the frame. */
  x: number;
  y: number;
  /** Radius as a percentage of the frame's larger axis. */
  spread: number;
  /** Peak alpha of the bloom. */
  strength: number;
  tint: OrbToken;
  /**
   * The small bright centre of the bloom — the sun behind the ridge. This is the
   * only place the accent ramp appears, and it is what gives each composition a
   * real luminance peak instead of a uniformly dim field.
   */
  core: { tint: AccentToken; spread: number; strength: number };
};

export type Backdrop = {
  /** Human-readable composition note. Kept next to the numbers on purpose. */
  note: string;
  /** Ground gradient: two atmospheric tokens and the angle between them. */
  ground: { from: OrbToken; to: OrbToken; angle: number; alpha: number };
  light: Light;
  ridges: Ridge[];
  /** Generated plate for this composition. */
  plate: string;
};

/**
 * The open curve through the sampled heights. Catmull-Rom converted to cubic
 * beziers, with the endpoints duplicated so the curve stays put at the frame
 * edges instead of drifting.
 */
export function ridgeCurve(heights: number[], w = VIEW.w, h = VIEW.h): string {
  const n = heights.length;
  if (n < 2) return "";

  const pt = (i: number) => {
    const clamped = Math.min(Math.max(i, 0), n - 1);
    return { x: (clamped / (n - 1)) * w, y: heights[clamped] * h };
  };

  let d = `M 0 ${pt(0).y.toFixed(2)}`;
  for (let i = 0; i < n - 1; i += 1) {
    const p0 = pt(i - 1);
    const p1 = pt(i);
    const p2 = pt(i + 1);
    const p3 = pt(i + 2);
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

/** The curve closed to below the bottom edge, so a blur never reveals a seam. */
export function ridgePath(heights: number[], w = VIEW.w, h = VIEW.h): string {
  return `${ridgeCurve(heights, w, h)} L ${w} ${(h * 1.08).toFixed(2)} L 0 ${(h * 1.08).toFixed(2)} Z`;
}

/* ---- the seven compositions --------------------------------------- */

/**
 * Distinct in hue path, form and light origin; identical in value range, edge
 * vignette and grain. That combination is what makes them a set rather than
 * seven unrelated pictures.
 */
export const clientBackdrops = {
  "dusk-ridge": {
    note: "Deep indigo into slate. Ridges descending left to right, light high on the left.",
    ground: { from: "bd-a", to: "bd-b", angle: 155, alpha: 0.52 },
    light: { x: 14, y: 12, spread: 78, strength: 0.4, tint: "bd-a", core: { tint: "bd-violet", spread: 20, strength: 0.11 } },
    ridges: [
      { heights: [0.3, 0.34, 0.4, 0.47, 0.55, 0.62, 0.7, 0.76], tint: "bd-b", rim: 0.3, spread: 0.075, shade: 0.16, depth: 0.34, softness: 22 },
      { heights: [0.52, 0.55, 0.6, 0.66, 0.72, 0.79, 0.85, 0.9], tint: "bd-a", rim: 0.34, spread: 0.05, shade: 0.24, depth: 0.26, softness: 13 },
      { heights: [0.74, 0.78, 0.82, 0.86, 0.9, 0.94, 0.97, 1.0], tint: "bd-b", rim: 0.38, spread: 0.035, shade: 0.34, depth: 0.2, softness: 8 },
    ],
    plate: "/images/client-backdrops/dusk-ridge.webp",
  },

  bloom: {
    note: "Indigo into violet. Concentric bands cresting at centre, light low and central.",
    ground: { from: "bd-b", to: "bd-a", angle: 0, alpha: 0.5 },
    light: { x: 50, y: 88, spread: 70, strength: 0.42, tint: "bd-a", core: { tint: "bd-violet", spread: 22, strength: 0.12 } },
    ridges: [
      { heights: [0.62, 0.52, 0.42, 0.36, 0.36, 0.42, 0.52, 0.62], tint: "bd-a", rim: 0.3, spread: 0.075, shade: 0.16, depth: 0.34, softness: 22 },
      { heights: [0.8, 0.72, 0.64, 0.58, 0.58, 0.64, 0.72, 0.8], tint: "bd-a", rim: 0.34, spread: 0.05, shade: 0.24, depth: 0.26, softness: 13 },
      { heights: [0.95, 0.9, 0.85, 0.81, 0.81, 0.85, 0.9, 0.95], tint: "bd-b", rim: 0.38, spread: 0.035, shade: 0.34, depth: 0.2, softness: 8 },
    ],
    plate: "/images/client-backdrops/bloom.webp",
  },

  sweep: {
    note: "Violet-dominant single diagonal, light low on the right. The one composition with no horizon.",
    ground: { from: "bd-a", to: "bd-b", angle: 118, alpha: 0.54 },
    light: { x: 84, y: 82, spread: 74, strength: 0.4, tint: "bd-a", core: { tint: "bd-violet", spread: 21, strength: 0.11 } },
    ridges: [
      { heights: [0.16, 0.26, 0.36, 0.46, 0.56, 0.66, 0.76, 0.86], tint: "bd-a", rim: 0.3, spread: 0.075, shade: 0.16, depth: 0.34, softness: 22 },
      { heights: [0.44, 0.54, 0.64, 0.73, 0.82, 0.9, 0.96, 1.0], tint: "bd-b", rim: 0.34, spread: 0.05, shade: 0.24, depth: 0.26, softness: 13 },
      { heights: [0.72, 0.8, 0.88, 0.94, 0.99, 1.0, 1.0, 1.0], tint: "bd-a", rim: 0.38, spread: 0.035, shade: 0.34, depth: 0.2, softness: 8 },
    ],
    plate: "/images/client-backdrops/sweep.webp",
  },

  folds: {
    note: "Blue field with cyan caught in the lowest fold. Rising toward the bottom-right, light centre-right.",
    ground: { from: "bd-b", to: "bd-a", angle: 62, alpha: 0.5 },
    light: { x: 72, y: 44, spread: 66, strength: 0.4, tint: "bd-b", core: { tint: "bd-cyan", spread: 19, strength: 0.11 } },
    ridges: [
      { heights: [0.78, 0.72, 0.65, 0.57, 0.49, 0.41, 0.34, 0.28], tint: "bd-b", rim: 0.3, spread: 0.075, shade: 0.16, depth: 0.34, softness: 22 },
      { heights: [0.92, 0.87, 0.81, 0.74, 0.67, 0.6, 0.53, 0.47], tint: "bd-b", rim: 0.34, spread: 0.05, shade: 0.24, depth: 0.26, softness: 13 },
      { heights: [1.0, 0.98, 0.94, 0.9, 0.86, 0.81, 0.77, 0.72], tint: "bd-cyan", rim: 0.19, spread: 0.035, shade: 0.34, depth: 0.2, softness: 8 },
    ],
    plate: "/images/client-backdrops/folds.webp",
  },

  nightfall: {
    note: "Near-black navy, one steep central mass, and a narrow cyan horizon behind it. The darkest of the seven.",
    ground: { from: "bd-b", to: "bd-b", angle: 180, alpha: 0.44 },
    light: { x: 50, y: 66, spread: 46, strength: 0.4, tint: "bd-b", core: { tint: "bd-cyan", spread: 15, strength: 0.13 } },
    ridges: [
      { heights: [0.55, 0.55, 0.54, 0.54, 0.53, 0.53, 0.52, 0.52], tint: "bd-cyan", rim: 0.15, spread: 0.075, shade: 0.16, depth: 0.34, softness: 22 },
      { heights: [0.6, 0.62, 0.68, 0.8, 0.92, 0.8, 0.68, 0.62], tint: "bd-b", rim: 0.34, spread: 0.05, shade: 0.24, depth: 0.26, softness: 13 },
      { heights: [0.88, 0.9, 0.93, 0.96, 0.99, 0.96, 0.93, 0.9], tint: "bd-b", rim: 0.38, spread: 0.035, shade: 0.34, depth: 0.2, softness: 8 },
    ],
    plate: "/images/client-backdrops/nightfall.webp",
  },

  valley: {
    note: "Violet walls falling to a teal floor. A wide open valley, light dead centre.",
    ground: { from: "bd-a", to: "bd-b", angle: 96, alpha: 0.52 },
    light: { x: 50, y: 40, spread: 72, strength: 0.38, tint: "bd-b", core: { tint: "bd-cyan", spread: 20, strength: 0.11 } },
    ridges: [
      { heights: [0.32, 0.4, 0.5, 0.6, 0.6, 0.5, 0.4, 0.32], tint: "bd-a", rim: 0.3, spread: 0.075, shade: 0.16, depth: 0.34, softness: 22 },
      { heights: [0.58, 0.66, 0.76, 0.84, 0.84, 0.76, 0.66, 0.58], tint: "bd-b", rim: 0.34, spread: 0.05, shade: 0.24, depth: 0.26, softness: 13 },
      { heights: [0.84, 0.9, 0.95, 0.99, 0.99, 0.95, 0.9, 0.84], tint: "bd-cyan", rim: 0.19, spread: 0.035, shade: 0.34, depth: 0.2, softness: 8 },
    ],
    plate: "/images/client-backdrops/valley.webp",
  },

  drift: {
    note: "The coolest of the set — blue bands with cyan settling into the lowest one. Light upper-right.",
    ground: { from: "bd-b", to: "bd-a", angle: 42, alpha: 0.5 },
    light: { x: 82, y: 18, spread: 68, strength: 0.4, tint: "bd-b", core: { tint: "bd-cyan", spread: 18, strength: 0.12 } },
    ridges: [
      { heights: [0.38, 0.37, 0.39, 0.36, 0.38, 0.35, 0.37, 0.34], tint: "bd-b", rim: 0.3, spread: 0.075, shade: 0.16, depth: 0.34, softness: 22 },
      { heights: [0.6, 0.62, 0.59, 0.61, 0.58, 0.6, 0.57, 0.59], tint: "bd-b", rim: 0.34, spread: 0.05, shade: 0.24, depth: 0.26, softness: 13 },
      { heights: [0.82, 0.8, 0.83, 0.81, 0.84, 0.82, 0.85, 0.83], tint: "bd-cyan", rim: 0.19, spread: 0.035, shade: 0.34, depth: 0.2, softness: 8 },
    ],
    plate: "/images/client-backdrops/drift.webp",
  },
} satisfies Record<string, Backdrop>;

export type BackdropId = keyof typeof clientBackdrops;

/** Ordered ids, for the generator and the imagery audit. */
export const backdropIds = Object.keys(clientBackdrops) as BackdropId[];

/* ---- decomposition ------------------------------------------------- */

/** Steps each stack is built from. Past the point where they are visible. */
export const RIDGE_BANDS = 6;

/**
 * The dark mass below a crest, as stacked contour-following regions.
 *
 * Each band is the whole area below the crest, offset a little deeper than the
 * last, at a fraction of the ridge's shade. Drawn back to front they accumulate
 * downward, which produces a mass that deepens away from the crest and follows
 * its shape exactly — a plain vertical gradient would not, because the crest
 * height varies across the frame.
 *
 * Stacking rather than blurring is also what keeps this cheap: the section
 * animates a 9s scale over it, and a full-bleed SVG blur filter would
 * re-rasterise on every frame of that.
 */
export function shadeBands(
  ridge: Ridge,
  steps = RIDGE_BANDS,
  w = VIEW.w,
  h = VIEW.h,
): { d: string; alpha: number }[] {
  const bands: { d: string; alpha: number }[] = [];
  for (let k = 0; k < steps; k += 1) {
    bands.push({
      d: ridgePath(
        ridge.heights.map((y) => y + (k / steps) * ridge.depth),
        w,
        h,
      ),
      alpha: ridge.shade / steps,
    });
  }
  return bands;
}

/**
 * The rim light on a crest, as strokes of decreasing width on the same curve.
 *
 * Widest first, so the narrow strokes land on top: the accumulation peaks along
 * the crest line and falls away either side of it. A symmetric band centred on
 * the curve, which is what an offset region stack cannot produce.
 */
export function rimStrokes(
  ridge: Ridge,
  steps = RIDGE_BANDS,
  w = VIEW.w,
  h = VIEW.h,
): { d: string; width: number; alpha: number }[] {
  const d = ridgeCurve(ridge.heights, w, h);
  const widest = ridge.spread * h * 2;
  const strokes: { d: string; width: number; alpha: number }[] = [];
  for (let k = 0; k < steps; k += 1) {
    strokes.push({
      d,
      width: widest * (1 - k / steps),
      alpha: ridge.rim / steps,
    });
  }
  return strokes;
}
