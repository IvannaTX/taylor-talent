"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** Apple-ish settle: quick departure, long deceleration, no bounce. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fires a little before the element is fully on screen so it never "pops". */
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type Dir = "up" | "down" | "left" | "right" | "none";

const offset: Record<Dir, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

/*
 * IMPORTANT: nothing in this file may branch its rendered output on
 * useReducedMotion(). That hook resolves differently on the server than on the
 * first client render, so using it to pick `initial`/`animate`/`style` produces
 * a hydration mismatch for every visitor who has reduce-motion enabled.
 *
 * Reduced motion is handled globally instead, by <MotionConfig reducedMotion="user">
 * in components/motion/config.tsx: Framer Motion then snaps transform and layout
 * animations to their end state and keeps opacity, which is the behaviour we want.
 */

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.75,
  dir = "up",
  as = "div",
  blur = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  dir?: Dir;
  as?: "div" | "section" | "li" | "span" | "p";
  blur?: boolean;
}) {
  const Comp = motion[as] as typeof motion.div;
  const { x, y } = offset[dir];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? "blur(6px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger: parent schedules, children animate. Lets cards in a grid
   arrive independently rather than as one block.                      */
/* ------------------------------------------------------------------ */

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

/** Opt-in card settle for large editorial surfaces; transform is disabled by
 * the global MotionConfig when a visitor requests reduced motion. */
const scaledItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.985, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  scale = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  scale?: boolean;
}) {
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp className={className} variants={scale ? scaledItem : item}>
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Word-by-word headline reveal. Words keep their own inline-block box
   so wrapping is identical to plain text at every breakpoint.         */
/* ------------------------------------------------------------------ */

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");

  return (
    <Tag className={cn("inline-block", className)}>
      {/* The full string is exposed to assistive tech in one piece; the visible
          spans are per-word and hidden from the accessibility tree. */}
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block whitespace-pre will-change-[transform,opacity]"
          initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: delay + i * stagger, ease: EASE }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
