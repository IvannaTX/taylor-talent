"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { finale } from "@/lib/copy";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Eyebrow, DisplayHead } from "@/components/ui/kit";
import { Reveal } from "@/components/motion/reveal";
import { SchedulerArtifact } from "@/components/artifacts/scheduler";

/**
 * The close.
 *
 * The scheduler artifact sits right next to the CTA on purpose: the visitor sees
 * a day/time grid before they click, so landing on Jarod's Paraform booking page
 * is a continuation of something already started rather than a new context.
 */
export function Finale({
  eyebrow = finale.eyebrow,
  title = finale.title,
  lede = finale.lede,
  cta = finale.cta,
  bullets = finale.bullets,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  cta?: string;
  bullets?: readonly string[];
} = {}) {
  return (
    <section id="book" className="relative scroll-mt-24 py-section">
      <div className="shell">
        <div className="card grain relative overflow-hidden">
          {/* Single restrained wash, kept inside the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-accent-indigo/[0.12] blur-[100px]"
          />

          <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-14 lg:p-14">
            <div>
              <Reveal blur={false}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>

              <DisplayHead size="md" className="mt-4 max-w-[22ch]">
                {title}
              </DisplayHead>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
                  {lede}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <ul className="mt-7 space-y-2.5">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[0.9375rem] text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.1875rem] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ok/15 text-ok"
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    href={site.bookCall}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {cta}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                  </Button>
                  <Button
                    href={`mailto:${site.email}`}
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Or email directly
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.16} dir="up">
              <SchedulerArtifact />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
