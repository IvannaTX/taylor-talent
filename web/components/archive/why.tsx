"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { stats, why } from "@/lib/content";
import { Section, SectionHead } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * Counts up the numeric part of a stat once it scrolls into view, preserving any
 * prefix/suffix ("75+", "9/10", "121%"). The final value is always in the DOM
 * for assistive tech via aria-label, so nothing depends on the animation.
 */
function StatValue({ value }: { value: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  // A bare four-digit number is a year — counting up from zero to 2015 reads as
  // a glitch rather than a flourish, so those render statically.
  const isYear = /^\d{4}$/.test(value);
  const match = isYear ? null : value.match(/^(\D*)(\d+)(.*)$/);

  // Start from the final value: useReducedMotion resolves differently on the
  // server than on first client render, so seeding state from it caused a
  // hydration mismatch. The effect rewinds to zero once it is safe to animate.
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    if (reduce || !match) return;

    if (!inView) {
      setDisplay(`${match[1]}0${match[3]}`);
      return;
    }

    const target = Number(match[2]);
    const controls = animate(0, target, {
      duration: Math.min(1.5, 0.6 + target / 160),
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${match[1]}${Math.round(v)}${match[3]}`),
    });
    return () => controls.stop();
  }, [inView, reduce, match]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden className="tabular-nums">
        {match ? display : value}
      </span>
    </span>
  );
}

export function Why() {
  return (
    <Section id="why">
      <SectionHead
        eyebrow="Why Taylor Talent"
        title="Senior work, done by the senior person."
        lede="Search is a judgment business. The differentiator is not the tooling — it is who is actually reading the résumés and taking the calls."
      />

      <Stagger
        className="mt-14 grid gap-px overflow-clip rounded-card border border-line bg-line sm:grid-cols-2"
        stagger={0.08}
      >
        {why.map((w, i) => (
          <StaggerItem key={w.title} as="article">
            <div className="group relative h-full bg-surface p-7 transition-colors duration-500 hover:bg-raised sm:p-9">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.125rem]">
                  {w.title}
                </h3>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted sm:pl-[1.9rem]">
                {w.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Track record — 2 cols on mobile, 4 from sm. Never scrolls sideways. */}
      <Reveal delay={0.1} className="mt-5">
        <div className="card ring-grad grain relative overflow-clip">
          {/* Mobile: one per row, value beside the text so the detail line gets
              full width. Desktop: four columns, value stacked above the text. */}
          <div className="grid grid-cols-1 gap-7 p-7 sm:grid-cols-4 sm:gap-6 sm:p-9">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline gap-4 sm:block sm:gap-0"
              >
                <div className="w-[4.25rem] shrink-0 text-[2rem] font-semibold tracking-[-0.035em] text-ink sm:w-auto sm:text-[2.5rem]">
                  <StatValue value={s.value} />
                </div>
                <div className="min-w-0 sm:mt-1.5">
                  <div className="text-[0.8125rem] font-medium text-ink/90">
                    {s.label}
                  </div>
                  <div className="mt-1 text-[0.8125rem] leading-snug text-faint">
                    {s.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
