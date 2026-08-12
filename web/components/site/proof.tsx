"use client";

import { motion } from "framer-motion";
import { proof } from "@/lib/copy";
import { Section, SectionHead } from "@/components/ui/kit";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * References.
 *
 * Format follows the pattern that works for this kind of proof: a company slot,
 * a short quote set in the serif, then attribution. The placeholder state is
 * explicit — a dashed company plate and a marked chip — so nothing can be
 * mistaken for a real endorsement before the real ones arrive.
 */
export function Proof() {
  return (
    <Section id="proof">
      <SectionHead
        eyebrow={proof.eyebrow}
        title={proof.title}
        lede={proof.lede}
      />

      <Stagger className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3" stagger={0.1}>
        {proof.quotes.map((q, i) => (
          <StaggerItem key={i} as="article">
            <motion.figure
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="card flex h-full flex-col p-6 sm:p-7"
            >
              {/* Company plate — dashed while it is a placeholder */}
              <div className="flex h-9 items-center">
                <span className="inline-flex items-center rounded-lg border border-dashed border-line px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
                  {q.company}
                </span>
              </div>

              <blockquote className="display mt-6 flex-1 text-[1.1875rem] leading-[1.45] text-ink sm:text-[1.25rem]">
                “{q.quote}”
              </blockquote>

              <figcaption className="mt-7 flex items-baseline justify-between gap-3 border-t border-line pt-5">
                <span className="min-w-0">
                  <span className="block truncate text-[0.875rem] text-ink">
                    {q.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.75rem] text-faint">
                    {q.role}
                  </span>
                </span>
                <span className="shrink-0 rounded-pill border border-dashed border-line px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-faint">
                  Placeholder
                </span>
              </figcaption>
            </motion.figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
