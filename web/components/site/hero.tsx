"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/copy";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/reveal";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { CustomerStories } from "@/components/home/CustomerStories";
import { ExecutiveSearchStories } from "@/components/home/ExecutiveSearchStories";
import { ExecutiveNetwork } from "@/components/home/ExecutiveNetwork";

/**
 * Hero.
 *
 * Below lg every element is centred in one stack: claim, one sentence, one CTA,
 * then proof of work, matching the section heads and the leadership carousel
 * further down the page.
 *
 * From lg the eyebrow and the serif claim stay centred across the full measure
 * and only what sits beneath them splits: the two supporting paragraphs on the
 * left, the CTA and its caption on the right. Text stays centred in both
 * columns. The paragraphs set the height of the row, and the CTA group centres
 * itself vertically against them with self-center rather than the grid centring
 * both columns, so the paragraph block keeps sitting directly under the claim.
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
        <motion.div style={{ y: copyY }} className="min-w-0 text-center">
          {/* Eyebrow and claim. Centred across the hero at every width. */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              <span className="eyebrow">{hero.eyebrow}</span>
            </motion.div>

            {/* Two deliberate lines, each masked so it rises from behind the one
                above. The second carries the gradient and the italic. */}
            <h1 className="display mx-auto mt-6 max-w-[17ch] text-display-lg text-ink sm:max-w-none">
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
          </div>

          {/* Supporting paragraphs left, CTA right, from lg. Below that the two
              stack and stay centred with everything above them. */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.44, ease: EASE }}
              className="min-w-0"
            >
              <p className="mx-auto max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
                {hero.lede}
              </p>
              {/* The plain statement of who we serve and how engagements run.
                  Kept as ordinary text so a crawler or an agent can read it
                  without executing anything. */}
              <p className="mx-auto mt-4 max-w-[56ch] text-[0.9375rem] leading-relaxed text-faint">
                {hero.positioning}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.54, ease: EASE }}
              className="min-w-0 lg:self-center"
            >
              <div className="flex items-center justify-center">
                <Button
                  href={site.bookCall}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {hero.cta}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                </Button>
              </div>
              <p className="mx-auto mt-4 max-w-[46ch] text-[0.8125rem] leading-relaxed text-faint">
                {hero.note}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* The gap that separates the hero copy from the proof of work below it.
            Opened up from lg only: the desktop split leaves the copy shorter
            than the stacked mobile version, so the logo row was arriving too
            close behind it. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.68, ease: EASE }}
          className="mt-14 sm:mt-16 lg:mt-28"
        >
          <TrustedCompanies />
        </motion.div>

        <CustomerStories />
        <ExecutiveSearchStories />
        <ExecutiveNetwork />
      </div>
    </section>
  );
}
