"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { process } from "@/lib/content";
import { Reveal, TextReveal, EASE } from "@/components/motion/reveal";
import { useSectionProgress } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";

/**
 * Sticky storytelling. On lg+ the left rail stays fixed while the steps scroll
 * past and the active step drives it. Below lg the same content is one plain
 * vertical stack — the sticky panel is simply not sticky, so nothing to break.
 */
function Step({
  step,
  i,
  active,
  onActive,
}: {
  step: (typeof process)[number];
  i: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = React.useRef<HTMLLIElement>(null);
  // A band across the middle of the viewport decides which step is "current".
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  React.useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);

  return (
    <li ref={ref} className="relative pl-10 sm:pl-14">
      {/* Rail + node */}
      <span
        aria-hidden
        className="absolute left-[0.4375rem] top-2 h-full w-px bg-line sm:left-[0.6875rem]"
      />
      <motion.span
        aria-hidden
        animate={{ scale: active ? 1 : 0.6, opacity: active ? 1 : 0.45 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          "absolute left-0 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full sm:left-1",
          active ? "bg-ring-gradient" : "bg-line",
        )}
      />

      {/* Inactive steps are signalled by heading colour, not opacity. Fading the
          whole block looked better but pushed 11px indices and body copy under
          the 4.5:1 floor; the scaling node and step counter carry it instead. */}
      <div className="pb-14 sm:pb-16">
        <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint">
          {step.n}
        </span>
        <h3
          className={cn(
            "mt-3 text-[1.375rem] font-semibold tracking-[-0.028em] transition-colors duration-500 ease-apple sm:text-[1.75rem]",
            active ? "text-ink" : "text-muted",
          )}
        >
          {step.title}
        </h3>
        <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted sm:text-base">
          {step.body}
        </p>
      </div>
    </li>
  );
}

export function Process() {
  const [active, setActive] = React.useState(0);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(sectionRef);

  const onActive = React.useCallback((i: number) => setActive(i), []);

  return (
    <section id="process" className="relative scroll-mt-24 py-section">
      <div className="shell" ref={sectionRef}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Sticky panel */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <Reveal blur={false}>
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-ring-gradient"
                />
                <span className="eyebrow">Search process</span>
              </div>
            </Reveal>

            <TextReveal
              text="Five stages. No surprises."
              delay={0.06}
              className="mt-4 text-display-sm font-semibold text-ink"
            />

            <Reveal delay={0.16}>
              <p className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
                Every mandate runs the same way, and you always know which stage
                you are in. Weekly written updates, including the bad news.
              </p>
            </Reveal>

            {/* Progress readout — desktop only, purely decorative */}
            <div aria-hidden className="mt-10 hidden lg:block">
              <div className="flex items-baseline gap-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={process[active].n}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="grad-text text-[3.5rem] font-semibold leading-none tracking-[-0.04em]"
                  >
                    {process[active].n}
                  </motion.span>
                </AnimatePresence>
                <span className="font-mono text-[0.75rem] text-faint">
                  / {String(process.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-6 h-px w-full overflow-hidden bg-line">
                <motion.div
                  className="h-full origin-left bg-ring-gradient"
                  style={{ scaleX: progress }}
                />
              </div>
            </div>
          </div>

          <ol className="relative">
            {process.map((step, i) => (
              <Step
                key={step.n}
                step={step}
                i={i}
                active={active === i}
                onActive={onActive}
              />
            ))}
            {/* Mask the rail past the final node */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[0.4375rem] h-16 w-px bg-bg sm:left-[0.6875rem]"
            />
          </ol>
        </div>
      </div>
    </section>
  );
}
