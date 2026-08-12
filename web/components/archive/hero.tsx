"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/reveal";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  // Content lifts and fades slightly as you scroll past — the Apple "the page
  // is a stack of planes" feel. Reduced motion flattens the output range rather
  // than dropping the style prop, so the value at progress 0 (what the server
  // renders) is the same either way and hydration stays clean.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] items-center overflow-clip pb-20 pt-28 sm:min-h-[94svh] sm:pt-32"
    >
      <motion.div
        style={{ y, opacity }}
        className="shell relative w-full"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface/60 py-1.5 pl-2 pr-3.5 backdrop-blur-md ring-grad"
        >
          <span
            aria-hidden
            className="relative grid h-4 w-4 place-items-center"
          >
            <span className="absolute inset-0 rounded-full bg-ring-gradient opacity-30" />
            <span className="h-1.5 w-1.5 rounded-full bg-ring-gradient" />
          </span>
          <span className="eyebrow text-muted">{hero.eyebrow}</span>
        </motion.div>

        {/* Headline — two lines, revealed in sequence, second line in gradient */}
        <h1 className="mt-7 text-display-lg font-semibold text-ink">
          {hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "108%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1.05,
                  delay: 0.22 + i * 0.11,
                  ease: EASE,
                }}
              >
                {i === hero.title.length - 1 ? (
                  <span className="grad-text">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.46, ease: EASE }}
          className="mt-7 max-w-[46rem] text-[1.0625rem] leading-relaxed text-muted sm:text-xl sm:leading-relaxed"
        >
          {hero.lede}
        </motion.p>

        {/* CTAs — stack full-width on mobile, inline from sm up */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.56, ease: EASE }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button href={site.bookCall} size="lg" className="w-full sm:w-auto">
            {hero.primary.label}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
          </Button>
          <Button
            href={hero.secondary.href}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {hero.secondary.label}
            <ArrowDown className="h-4 w-4" strokeWidth={2} />
          </Button>
        </motion.div>

        {/* Proof strip — a real grid on mobile, no horizontal scroll */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.68, ease: EASE }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8 sm:mt-16 sm:grid-cols-3 sm:gap-8"
        >
          {hero.proof.map((p) => (
            <div key={p.label} className="min-w-0">
              <dt className="sr-only">{p.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
                  {p.value}
                </span>
                <span className="mt-1.5 block text-[0.8125rem] leading-snug text-faint">
                  {p.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
