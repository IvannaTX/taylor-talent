"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { services } from "@/lib/content";
import { Section, SectionHead } from "@/components/ui/section";
import { Reveal, EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Services as an editorial ledger: full-width rows on every breakpoint, each
 * expanding in place. No carousel, so mobile behaviour is identical to desktop —
 * tap a row, it opens, the page grows downward.
 */
export function Services() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <Section id="services">
      <SectionHead
        eyebrow="Services"
        title="Four ways to engage."
        lede="Pick the one that matches the constraint you actually have — a single critical seat, a hiring surge, a steady trickle, or no plan yet."
      />

      <div className="mt-14 border-t border-line">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={s.n} delay={i * 0.06} blur={false}>
              <div className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`service-${s.n}`}
                    className="group flex w-full items-start gap-4 py-7 text-left sm:gap-8 sm:py-8"
                  >
                    <span className="mt-2 font-mono text-[0.6875rem] tracking-[0.14em] text-faint sm:mt-3">
                      {s.n}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block text-[1.375rem] font-semibold tracking-[-0.028em] transition-colors duration-400 sm:text-[1.625rem]",
                          isOpen
                            ? "text-ink"
                            : "text-muted group-hover:text-ink",
                        )}
                      >
                        {s.title}
                      </span>
                      {/* Summary always visible on mobile; it is the scannable
                          layer when rows are collapsed. */}
                      <span className="mt-2 block max-w-[52ch] text-[0.9375rem] leading-relaxed text-faint sm:mt-2.5">
                        {s.summary}
                      </span>
                    </span>

                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-pill border border-line text-muted transition-[transform,color,border-color,background-color] duration-500 ease-apple",
                        isOpen
                          ? "rotate-45 border-transparent bg-ring-gradient text-on-accent"
                          : "group-hover:border-accent-blue/45 group-hover:text-ink",
                      )}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-${s.n}`}
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <ul className="grid gap-3 pb-9 sm:grid-cols-3 sm:gap-5 sm:pl-[3.25rem]">
                        {s.includes.map((inc, j) => (
                          <motion.li
                            key={inc}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.08 + j * 0.06,
                              ease: EASE,
                            }}
                            className="card bg-raised/60 p-4 text-[0.875rem] leading-snug text-muted sm:p-5"
                          >
                            {inc}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
