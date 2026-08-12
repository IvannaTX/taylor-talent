"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { Section, SectionHead } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Testimonials() {

  return (
    <Section id="testimonials">
      <SectionHead
        eyebrow="References"
        title="What clients and candidates say."
        lede="Placeholder quotes below. Real references are available on request and are swapped in from a single content file."
      />

      <Stagger className="mt-14 grid gap-4 lg:grid-cols-3" stagger={0.1}>
        {testimonials.map((t, i) => (
          <StaggerItem key={i} as="article">
            <motion.figure
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="card group relative flex h-full flex-col overflow-clip p-7 sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ring-gradient-soft opacity-0 transition-opacity duration-500 ease-apple group-hover:opacity-100"
              />

              {/* Quote mark as a drawn glyph, not an emoji */}
              <span
                aria-hidden
                className="grad-text relative font-mono text-3xl leading-none"
              >
                &ldquo;
              </span>

              <blockquote className="relative mt-5 flex-1 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                {t.quote}
              </blockquote>

              <figcaption className="relative mt-7 border-t border-line pt-5">
                <span className="block text-[0.9375rem] font-medium text-ink">
                  {t.name}
                </span>
                <span className="mt-0.5 block text-[0.8125rem] text-faint">
                  {t.role}
                </span>
                <span className="mt-3 inline-flex rounded-pill border border-dashed border-line px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
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
