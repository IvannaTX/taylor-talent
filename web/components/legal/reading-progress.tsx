"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline reading indicator pinned to the very top of the viewport, above the
 * nav. Spring-smoothed so a trackpad flick reads as motion rather than a jump.
 *
 * Decorative: the same information is available structurally from the table of
 * contents, so it is hidden from assistive tech rather than exposed as a
 * progressbar the reader would have to skip past.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-ring-gradient"
    />
  );
}
