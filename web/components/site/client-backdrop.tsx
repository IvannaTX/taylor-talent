import Image from "next/image";
import {
  RIDGE_BANDS,
  VIEW,
  rimStrokes,
  shadeBands,
  type Backdrop,
} from "@/lib/backdrops";

/**
 * How much of the plate reaches the composite. The plates are rendered ~3x
 * brighter than they are shown so their very low values survive webp
 * quantisation; this scales them back. Must match AMPLITUDE in
 * scripts/generate-backdrops.ts.
 */
const PLATE_OPACITY = 0.33;

/**
 * One client showcase backdrop.
 *
 * Three layers, in order:
 *
 *   1. Ground — a near-black field, a two-token atmospheric gradient and the
 *      bloom at this composition's light origin. Pure CSS custom properties, so
 *      the theme toggle retunes it.
 *   2. Ridges — the composition's silhouettes, as stacked contour-following
 *      bands. No SVG filter: see the note on ridgeBands().
 *   3. Plate — the generated 2400px artwork, composited in `screen`.
 *
 * `screen` is the load-bearing choice. It can only ever *add* light, never
 * subtract it, so the plate cannot obscure or muddy the coded layer beneath —
 * it lays in the atmospheric gradation and haze bleed that CSS would need an
 * expensive full-bleed blur to approximate. Remove the plate and layers 1-2 are
 * still a finished backdrop; that is the fallback, and it needs no code path.
 *
 * Grain and vignette are deliberately identical across all seven. Composition,
 * hue path and light origin are what vary — see lib/backdrops.ts.
 */
export function ClientBackdrop({
  backdrop,
  priority = false,
}: {
  backdrop: Backdrop;
  priority?: boolean;
}) {
  const { ground, light, ridges, plate } = backdrop;

  return (
    /* `isolate` keeps the screen blend inside this frame instead of letting it
       reach the page behind the section. */
    <div aria-hidden className="absolute inset-0 isolate overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgb(var(--bd-ground))",
          backgroundImage: [
            /* The core sits above the bloom: a small, bright centre is what
               gives each composition a luminance peak rather than a uniformly
               dim field. Only place the accent ramp appears here. */
            `radial-gradient(circle at ${light.x}% ${light.y}%, rgb(var(--${light.core.tint}) / ${light.core.strength}), transparent ${light.core.spread}%)`,
            `radial-gradient(circle at ${light.x}% ${light.y}%, rgb(var(--${light.tint}) / ${light.strength}), transparent ${light.spread}%)`,
            `linear-gradient(${ground.angle}deg, rgb(var(--${ground.from}) / ${ground.alpha}), rgb(var(--${ground.to}) / ${ground.alpha * 0.45}) 62%, transparent)`,
          ].join(", "),
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        {ridges.map((ridge, index) => (
          <g key={index}>
            {/* Mass first, then the rim on top of it: a nearer ridge's mass has
                to be able to cover the ridge behind it. */}
            {shadeBands(ridge, RIDGE_BANDS).map((band, step) => (
              <path
                key={`shade-${step}`}
                d={band.d}
                fill="rgb(var(--bd-ground))"
                fillOpacity={band.alpha}
              />
            ))}
            {rimStrokes(ridge, RIDGE_BANDS).map((stroke, step) => (
              <path
                key={`rim-${step}`}
                d={stroke.d}
                fill="none"
                stroke={`rgb(var(--${ridge.tint}))`}
                strokeOpacity={stroke.alpha}
                strokeWidth={stroke.width}
                strokeLinecap="butt"
              />
            ))}
          </g>
        ))}
      </svg>

      <Image
        src={plate}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 72rem, 100vw"
        className="object-cover"
        style={{ mixBlendMode: "screen", opacity: PLATE_OPACITY }}
      />

      {/* Vignette — holds the type contrast steady wherever the bloom lands. */}
      <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_35%,transparent,rgb(var(--bd-ground)/0.6))]" />

      <div className="grain absolute inset-0" />
    </div>
  );
}
