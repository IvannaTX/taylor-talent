"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/reveal";

/* ------------------------------------------------------------------ */
/* Shared chrome for the interface artifacts. These are original UI
   surfaces, not screenshots — so they animate, theme, and stay crisp.  */
/* ------------------------------------------------------------------ */

/**
 * The window an artifact sits in. Deliberately restrained: a title bar with a
 * label and a live badge, then content. No fake traffic-light dots — those read
 * as a stock mockup rather than a product.
 */
export function ArtifactFrame({
  label,
  badge,
  children,
  className,
  footer,
}: {
  label: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className={cn("artifact min-w-0 overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-raised/60 px-4 py-3 sm:px-5">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">
          {label}
        </span>
        {badge}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
      {footer && (
        <div className="border-t border-line bg-raised/40 px-4 py-3 sm:px-5">
          {footer}
        </div>
      )}
    </div>
  );
}

/** Small pulsing "live" indicator for the frame's badge slot. */
export function LiveBadge({ children = "Live search" }: { children?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-2.5 py-1">
      <span className="relative grid h-1.5 w-1.5 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-ok/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-ok" />
      </span>
      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
        {children}
      </span>
    </span>
  );
}

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "ok" | "warn" | "accent";
  className?: string;
}) {
  const tones = {
    neutral: "border-line bg-raised text-muted",
    ok: "border-ok/30 bg-ok/10 text-ok",
    warn: "border-warn/30 bg-warn/10 text-warn",
    accent: "border-accent-indigo/35 bg-accent-indigo/10 text-accent-indigo",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-pill border px-2 py-[0.1875rem] font-mono text-[0.5625rem] uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Candidate avatar.
 *
 * With `src`, renders the photograph. Without it, renders a designed monogram
 * whose hue is derived from the name, so a set of candidates reads as a set of
 * distinct people rather than four identical grey circles. Dropping licensed
 * photography in later is a one-line change per candidate in lib/candidates.ts.
 */
export function Avatar({
  name,
  src,
  size = 36,
  className,
}: {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  // Stable hue per name — no randomness, so server and client agree.
  //
  // Constrained to 205-285deg (blue through violet) for two reasons: it keeps the
  // avatars inside the brand family instead of scattering rainbow circles across
  // a restrained palette, and it guarantees contrast. Across the full 360deg
  // wheel the yellows land at 2.74:1 against white initials; within this band the
  // worst case is 4.94:1, so every monogram clears AA.
  const HUE_MIN = 205;
  const HUE_SPAN = 80;
  const hue =
    HUE_MIN +
    (Math.abs(
      name.split("").reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) | 0, 7),
    ) %
      HUE_SPAN);

  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-line",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={size * 2}
          height={size * 2}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <span
            className="absolute inset-0"
            style={{
              // Second stop wraps *inside* the band rather than +42deg around the
              // whole wheel, which would escape into magenta at the top end.
              background: `linear-gradient(140deg, hsl(${hue} 58% 40%), hsl(${
                HUE_MIN + ((hue - HUE_MIN + 34) % HUE_SPAN)
              } 64% 28%))`,
            }}
          />
          <span
            className="relative font-medium text-white/95"
            style={{ fontSize: size * 0.36 }}
          >
            {initials}
          </span>
        </>
      )}
    </span>
  );
}

/** Horizontal meter used for fit scores and coverage. */
export function Meter({
  value,
  max = 100,
  tone = "accent",
  className,
  delay = 0,
}: {
  value: number;
  max?: number;
  tone?: "accent" | "ok" | "warn" | "muted";
  className?: string;
  delay?: number;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const tones = {
    accent: "bg-accent-indigo",
    ok: "bg-ok",
    warn: "bg-warn",
    muted: "bg-line-strong",
  } as const;

  return (
    <span
      className={cn(
        "block h-1 w-full overflow-hidden rounded-pill bg-sunken",
        className,
      )}
    >
      <motion.span
        className={cn("block h-full rounded-pill", tones[tone])}
        initial={{ width: "0%" }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      />
    </span>
  );
}

/** Pass / fail signal line inside candidate cards. */
export function Signal({ label, pass }: { label: string; pass: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-[0.75rem] leading-tight">
      <span
        className={cn(
          "grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full",
          pass ? "bg-ok/15 text-ok" : "bg-warn/15 text-warn",
        )}
      >
        {pass ? (
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        ) : (
          <X className="h-2.5 w-2.5" strokeWidth={3} />
        )}
      </span>
      <span className={pass ? "text-muted" : "text-faint"}>{label}</span>
    </span>
  );
}

/** Label / value row used across the briefs and trackers. */
export function Field({
  k,
  v,
  locked,
  mono,
}: {
  k: string;
  v: string;
  locked?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0">
      <span className="text-[0.75rem] text-faint">{k}</span>
      <span
        className={cn(
          "flex items-center gap-1.5 text-right text-[0.8125rem] text-ink",
          mono && "num font-mono",
        )}
      >
        {locked && (
          <Lock className="h-3 w-3 shrink-0 text-faint" strokeWidth={2} />
        )}
        {v}
      </span>
    </div>
  );
}
