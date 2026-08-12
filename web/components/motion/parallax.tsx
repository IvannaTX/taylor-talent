"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "./reveal";

/**
 * Vertical parallax on scroll.
 *
 * The output range starts at 0 so the value at scroll-progress 0 — which is what
 * the server renders — is identical whether or not reduced motion is active.
 * That is deliberate: mapping to [+d, -d] would emit a different transform on
 * the server than on a reduce-motion client and mismatch during hydration.
 */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = reduce ? 0 : distance * 2;
  const raw = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Image that scales down to rest as it enters the viewport — the Apple
 * product-shot move. `overflow-clip` on the frame keeps the scale from ever
 * creating horizontal overflow.
 */
export function ScaleInImage({
  className,
  frameClassName,
  alt,
  ...img
}: Omit<ImageProps, "className"> & {
  className?: string;
  frameClassName?: string;
  alt: string;
}) {
  return (
    <div className={cn("overflow-clip", frameClassName)}>
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="h-full w-full"
      >
        <Image alt={alt} className={cn("h-full w-full", className)} {...img} />
      </motion.div>
    </div>
  );
}

/**
 * Scroll-linked progress rail for the sticky process section. Returns a
 * normalised 0->1 spring the caller can bind to height/scaleY.
 */
export function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 85%"],
  });
  return useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.3 });
}
