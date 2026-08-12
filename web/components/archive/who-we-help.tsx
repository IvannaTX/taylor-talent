"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Check, UserRound } from "lucide-react";
import { audiences } from "@/lib/content";
import { Section, SectionHead } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const ICONS = { companies: Building2, leaders: UserRound } as const;

export function WhoWeHelp() {

  return (
    <Section id="who-we-help">
      <SectionHead
        eyebrow="Who we help"
        title="Two audiences, one relationship."
        lede="Most searches fail on one side of the table before the other side ever hears about it. We work both sides deliberately."
      />

      <Stagger className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6" stagger={0.12}>
        {audiences.map((a) => {
          const Icon = ICONS[a.key];
          return (
            <StaggerItem key={a.key} as="article">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="card ring-grad group flex h-full flex-col overflow-clip p-7 sm:p-9"
              >
                {/* Hover wash — sits under the content, never shifts layout */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-ring-gradient-soft opacity-0 transition-opacity duration-500 ease-apple group-hover:opacity-100"
                />

                <div className="relative flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-[0.7rem] border border-line bg-raised text-accent-blue">
                    <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.8} />
                  </span>
                  <span className="eyebrow">{a.eyebrow}</span>
                </div>

                <h3 className="relative mt-6 max-w-[24ch] text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.028em] text-ink sm:text-[1.75rem]">
                  {a.title}
                </h3>

                <p className="relative mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                  {a.body}
                </p>

                <ul className="relative mt-7 space-y-2.5">
                  {a.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[0.875rem] text-muted"
                    >
                      <Check
                        aria-hidden
                        className="mt-[0.15rem] h-3.5 w-3.5 shrink-0 text-accent-cyan"
                        strokeWidth={2.4}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href={a.cta.href}
                  className="relative mt-9 inline-flex items-center gap-1.5 self-start text-[0.9375rem] font-medium text-ink"
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-apple group-hover:bg-[length:100%_1px]">
                    {a.cta.label}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-500 ease-apple group-hover:translate-x-1 motion-reduce:transition-none"
                    strokeWidth={2}
                  />
                </Link>
              </motion.div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
