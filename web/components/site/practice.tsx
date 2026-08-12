"use client";

import { motion } from "framer-motion";
import { practice } from "@/lib/copy";
import { Section, SectionHead } from "@/components/ui/kit";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * Practice areas.
 *
 * A dense index rather than a card grid — functions as a list with a hairline
 * between each row, levels as a single pill row, sectors as four quiet cards.
 * Density is the point here: it should read like a firm with a defined remit,
 * not four marketing tiles.
 */
export function Practice() {
  return (
    <Section id="practice">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow={practice.eyebrow}
            title={practice.title}
            lede={practice.lede}
          />

          <Reveal delay={0.2} className="mt-8">
            <div>
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
                Levels
              </span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {practice.levels.map((l) => (
                  <span
                    key={l}
                    className="inline-flex rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-muted"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div>
          {/* Functions — an index, hairline separated */}
          <Stagger className="border-t border-line" stagger={0.05}>
            {practice.functions.map((f) => (
              <StaggerItem key={f.name}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline justify-between gap-6 border-b border-line py-4"
                >
                  <span className="display min-w-0 text-[1.125rem] text-ink transition-colors duration-400 sm:text-[1.25rem]">
                    {f.name}
                  </span>
                  <span className="shrink-0 text-right text-[0.75rem] text-faint">
                    {f.note}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Sectors */}
          <Reveal delay={0.1} className="mt-10">
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
              Sectors
            </span>
          </Reveal>
          <Stagger className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" stagger={0.07}>
            {practice.sectors.map((s) => (
              <StaggerItem key={s.name}>
                <div className="card h-full p-5">
                  <div className="text-[0.9375rem] font-medium text-ink">
                    {s.name}
                  </div>
                  <div className="mt-1.5 text-[0.8125rem] leading-snug text-muted">
                    {s.note}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
