"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/content";
import { Section, SectionHead } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Industries() {

  return (
    <Section id="industries">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky on desktop, plain block on mobile. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow="Industries"
            title="Where the pattern recognition is real."
            lede="Depth beats breadth in search. These are the markets where the map is already in hand."
          />
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.09}>
          {industries.map((ind, i) => (
            <StaggerItem key={ind.title} as="article">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="card group relative h-full overflow-clip p-6 sm:p-7"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-ring-gradient-soft opacity-0 transition-opacity duration-500 ease-apple group-hover:opacity-100"
                />
                {/* Top hairline that draws in on hover */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ring-gradient transition-transform duration-700 ease-apple group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <span className="relative font-mono text-[0.6875rem] tracking-[0.14em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-5 text-[1.125rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.1875rem]">
                  {ind.title}
                </h3>
                <p className="relative mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {ind.body}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
