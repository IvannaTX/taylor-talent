"use client";

import { MotionConfig } from "framer-motion";

/**
 * One place that teaches every motion component how to behave for people who
 * ask their OS for less motion.
 *
 * `reducedMotion="user"` makes Framer Motion snap transform and layout
 * animations straight to their end value while still allowing opacity to
 * animate. That means components never have to branch their rendered output on
 * useReducedMotion() — which is what keeps server and client markup identical
 * and avoids hydration mismatches.
 */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
