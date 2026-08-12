"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Reveal, TextReveal } from "@/components/motion/reveal";

export function Contact({
  title = "Bring the role, the constraint and the deadline.",
  lede = "Thirty minutes. You will leave with an honest read on whether the search is straightforward, hard, or mis-scoped — whether or not we work together.",
  primaryLabel = "Book an intro call",
}: {
  title?: string;
  lede?: string;
  primaryLabel?: string;
}) {
  return (
    <section id="contact" className="relative scroll-mt-24 py-section">
      <div className="shell">
        <div className="card ring-grad grain relative overflow-clip">
          {/* Gradient wash anchored bottom-left, kept inside the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-ring-gradient opacity-[0.18] blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-ring-gradient opacity-[0.12] blur-[90px]"
          />

          <div className="relative px-7 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <Reveal blur={false}>
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-ring-gradient"
                />
                <span className="eyebrow">Contact</span>
              </div>
            </Reveal>

            <TextReveal
              text={title}
              delay={0.06}
              className="mt-5 max-w-[26ch] text-display-md font-semibold text-ink"
            />

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
                {lede}
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href={site.bookCall}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {primaryLabel}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                </Button>
                <Button
                  href={`mailto:${site.email}`}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                  {site.email}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <p className="mt-8 max-w-prose text-[0.8125rem] leading-relaxed text-faint">
                Senior leaders: an intro call is confidential and carries no
                obligation. Nothing is shared with a client until you say so.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
