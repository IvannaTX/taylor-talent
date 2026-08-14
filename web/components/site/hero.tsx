"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/copy";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/reveal";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { ExecutiveSearchStories } from "@/components/home/ExecutiveSearchStories";

/**
 * Hero.
 *
 * Stacked rather than split: the serif claim gets the full measure so each line
 * lands whole, and the console gets the full width its six-stage rail needs.
 * Order is the argument — claim, one sentence, one CTA, then proof of work.
 *
 * The console lifts on scroll slightly slower than the copy, so the two layers
 * separate as you leave. That is the only parallax on the page.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  // Output ranges are flattened under reduced motion rather than dropping the
  // style prop, so the server-rendered value at progress 0 is identical.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);

  return (
    <section ref={ref} className="relative overflow-clip pt-28 sm:pt-36">
      <div className="shell">
        <motion.div style={{ y: copyY }} className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <span className="eyebrow">{hero.eyebrow}</span>
          </motion.div>

          {/* Two deliberate lines, each masked so it rises from behind the one
              above. The second carries the gradient and the italic. */}
          <h1 className="display mt-6 max-w-[17ch] text-display-lg text-ink sm:max-w-none">
            {[hero.line1, hero.line2].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.18 + i * 0.1,
                    ease: EASE,
                  }}
                >
                  {i === 1 ? (
                    <span className="grad-text italic">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.44, ease: EASE }}
              className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted sm:text-lg"
            >
              {hero.lede}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.54, ease: EASE }}
              className="min-w-0"
            >
              <div className="flex items-center">
                <Button
                  href={site.bookCall}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {hero.cta}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                </Button>
              </div>
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-faint">
                {hero.note}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.68, ease: EASE }}
          className="mt-14 sm:mt-16"
        >
          <TrustedCompanies />
        </motion.div>

        <ExecutiveSearchStories />

      </div>
    </section>
  );
}
