import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Original mark: a gradient-ringed aperture (the "search" idea, drawn as an
 * open ring rather than a magnifier) beside the wordmark. Pure SVG/CSS so it is
 * crisp at any size and inherits the theme.
 */
export function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-pill outline-none",
        className,
      )}
      aria-label="Taylor Talent Partners — home"
    >
      <span className="relative grid h-8 w-8 shrink-0 place-items-center">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden
          className="h-full w-full"
        >
          <defs>
            {/* userSpaceOnUse: without it these coords are read as 0-1
                fractions and the gradient lands off the shape. */}
            <linearGradient
              id="tt-mark"
              x1="4"
              y1="28"
              x2="28"
              y2="4"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(var(--a-violet))" />
              <stop offset="52%" stopColor="rgb(var(--a-indigo))" />
              <stop offset="100%" stopColor="rgb(var(--a-cyan))" />
            </linearGradient>
          </defs>
          {/* Open ring — the gap reads as forward motion. Rotation is done in
              CSS only: an SVG transform="rotate(a cx cy)" attribute plus a CSS
              transform-origin would apply the centre twice and displace it. */}
          <g className="origin-center -rotate-[38deg] transition-transform duration-900 ease-apple [transform-box:view-box] group-hover:rotate-[38deg] motion-reduce:transition-none motion-reduce:group-hover:-rotate-[38deg]">
            <circle
              cx="16"
              cy="16"
              r="11"
              stroke="url(#tt-mark)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeDasharray="56 13"
            />
          </g>
          <circle cx="16" cy="16" r="3.25" fill="url(#tt-mark)" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.9375rem] font-semibold tracking-[-0.02em] text-ink">
          Taylor Talent
        </span>
        <span className="mt-[0.2rem] font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-faint">
          Partners
        </span>
      </span>
    </Link>
  );
}
