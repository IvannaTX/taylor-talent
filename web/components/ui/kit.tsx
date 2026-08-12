"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, Reveal } from "@/components/motion/reveal";

/** Vertical rhythm wrapper. */
export function Section({
  id,
  children,
  className,
  bleed,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-section", className)}>
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}

export function Eyebrow({
  children,
  dot = true,
  className,
}: {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {dot && (
        <span
          aria-hidden
          className="h-1 w-1 shrink-0 rounded-full bg-accent-indigo"
        />
      )}
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/**
 * Serif section headline. Reveals per-line rather than per-word — a serif at
 * display size reads better arriving in whole lines.
 */
export function DisplayHead({
  children,
  className,
  as: Tag = "h2",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-display-sm",
    md: "text-display-md",
    lg: "text-display-lg",
  } as const;

  return (
    <Tag className={cn("display text-ink", sizes[size], className)}>
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

/** Standard section opener: eyebrow, serif head, lede. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  className,
  align = "left",
  size = "md",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  className?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal blur={false}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <DisplayHead
        size={size}
        className={cn("mt-4 max-w-[24ch]", centered && "mx-auto")}
      >
        {title}
      </DisplayHead>
      {lede && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-muted",
              centered && "mx-auto",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/**
 * The single figure that closes a beat. Serif numeral, mono caption — the
 * pairing is what makes it read as a stated fact rather than decoration.
 */
export function Metric({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <span
        aria-hidden
        className="mt-3 h-px w-8 shrink-0 bg-gradient-to-r from-accent-indigo to-transparent sm:w-10"
      />
      <div className="min-w-0">
        <div className="display num text-metric leading-none text-ink">
          {value}
        </div>
        <div className="mt-2 max-w-[24ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-faint">
          {label}
        </div>
      </div>
    </div>
  );
}

/** Full-bleed hairline that fades at both ends. */
export function Rule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-line to-transparent",
        className,
      )}
    />
  );
}
