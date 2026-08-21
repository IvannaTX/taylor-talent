"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/reveal";

/**
 * Interior-page opener. Same rhythm as the homepage hero, less height.
 *
 * Standalone copy is centred. Where an artifact is passed as `aside` the copy is
 * one half of a two-column split and stays left-aligned, because centring a
 * column against a neighbouring panel reads as a mistake rather than a choice.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  primary,
  secondary,
  aside,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Optional artifact shown beside the copy at lg+. */
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-clip pb-8 pt-28 sm:pt-36">
      <div className="shell">
        <div
          className={
            aside
              ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14"
              : ""
          }
        >
          <div className={aside ? "min-w-0" : "min-w-0 text-center"}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            >
              <span className="eyebrow">{eyebrow}</span>
            </motion.div>

            <h1 className={cn("display mt-5 max-w-[24ch] text-display-md text-ink", !aside && "mx-auto")}>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.05, delay: 0.16, ease: EASE }}
                >
                  {title}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.36, ease: EASE }}
              className={cn("mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted sm:text-lg", !aside && "mx-auto")}
            >
              {lede}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.46, ease: EASE }}
              className={cn("mt-9 flex flex-col gap-3 sm:flex-row sm:items-center", !aside && "sm:justify-center")}
            >
              <Button href={primary.href} size="lg" className="w-full sm:w-auto">
                {primary.label}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </Button>
              {secondary && (
                <Button
                  href={secondary.href}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {secondary.label}
                </Button>
              )}
            </motion.div>
          </div>

          {aside && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            >
              {aside}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
