"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { jarod } from "@/lib/copy";
import { site } from "@/lib/site";
import { Section, Eyebrow, DisplayHead } from "@/components/ui/kit";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import founderImg from "@/public/images/founder.png";

/**
 * Who you actually work with.
 *
 * Framed as an answer to the obvious question about a one-person firm rather than
 * a bio. The portrait is small and set into a card beside hard facts — the
 * numbers do the persuading, the photograph just confirms a person exists.
 */
export function Jarod() {
  return (
    <Section id="jarod">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal blur={false}>
            <Eyebrow>{jarod.eyebrow}</Eyebrow>
          </Reveal>
          <DisplayHead className="mt-4 max-w-[20ch]">{jarod.title}</DisplayHead>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
              {jarod.lede}
            </p>
          </Reveal>

          {/* Facts table — the persuasive part */}
          <Reveal delay={0.18} className="mt-9">
            <dl className="border-t border-line">
              {jarod.facts.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                >
                  <dt className="min-w-0 text-[0.875rem] text-muted">{f.k}</dt>
                  <dd className="num display shrink-0 text-[1.25rem] text-ink">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Portrait card */}
        <Reveal delay={0.1} dir="up">
          <div className="card overflow-hidden">
            <div className="flex items-center gap-4 p-5 sm:p-6">
              <motion.span
                initial={{ scale: 1.06, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20"
              >
                <Image
                  src={founderImg}
                  alt={`${jarod.name}, ${jarod.role} of ${site.name}`}
                  sizes="80px"
                  placeholder="blur"
                  className="h-full w-full object-cover"
                />
              </motion.span>
              <div className="min-w-0">
                <div className="display text-[1.375rem] leading-tight text-ink">
                  {jarod.name}
                </div>
                <div className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent-indigo">
                  {jarod.role}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] text-faint">
                  <MapPin className="h-3 w-3" strokeWidth={2} aria-hidden />
                  {jarod.location}
                </div>
              </div>
            </div>

            <div className="space-y-3.5 border-t border-line p-5 sm:p-6">
              {jarod.body.map((para, i) => (
                <p
                  key={i}
                  className="text-[0.9375rem] leading-relaxed text-muted"
                >
                  {para}
                </p>
              ))}
              <Button href={site.linkedin} variant="secondary" size="sm">
                Jarod on LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
