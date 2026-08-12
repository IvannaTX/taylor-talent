"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { activeSearch, candidates } from "@/lib/candidates";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/reveal";
import {
  ArtifactFrame,
  Avatar,
  Chip,
  LiveBadge,
  Meter,
} from "@/components/artifacts/chrome";

/**
 * The hero artifact: one search, mid-flight.
 *
 * This is the page's proof-of-work — it says "this is what you get" before any
 * paragraph does. The stage rail fills on entry, and the shortlist rows arrive
 * one at a time, so the eye is walked left-to-right then down.
 */
export function SearchConsole({ className }: { className?: string }) {
  const total = activeSearch.stages[0].count;

  return (
    <ArtifactFrame
      label={`Search · ${activeSearch.role}`}
      // The day counter lives on the role header below; the frame badge says
      // what kind of surface this is instead of repeating it.
      badge={<LiveBadge>Live search</LiveBadge>}
      className={className}
      footer={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
            Illustrative — not a real client search
          </span>
          <span className="num font-mono text-[0.625rem] text-muted">
            {activeSearch.band}
          </span>
        </div>
      }
    >
      {/* Role header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="display text-[1.375rem] leading-tight text-ink sm:text-[1.625rem]">
            {activeSearch.role}
          </h3>
          <p className="mt-1 text-[0.8125rem] text-faint">
            {activeSearch.client} · {activeSearch.location}
          </p>
        </div>
        <Chip tone="accent">{activeSearch.opened}</Chip>
      </div>

      {/* Stage rail — the shape of the whole engagement in one row */}
      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {activeSearch.stages.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
            className="min-w-0"
          >
            <div
              className={cn(
                "num font-mono text-[1.125rem] leading-none sm:text-[1.25rem]",
                s.done ? "text-ink" : "text-faint",
              )}
            >
              {s.count}
            </div>
            <div className="mt-1.5 truncate font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-faint">
              {s.label}
            </div>
            <Meter
              className="mt-2"
              value={s.count}
              max={total}
              tone={s.done ? "accent" : "muted"}
              delay={0.1 + 0.06 * i}
            />
          </motion.div>
        ))}
      </div>

      {/* Shortlist preview */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
            Current shortlist
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-accent-indigo">
            Weekly update sent
            <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={2.5} />
          </span>
        </div>

        {candidates.slice(0, 3).map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.55, delay: 0.3 + i * 0.09, ease: EASE }}
            className="artifact-row flex items-center gap-3 p-2.5 sm:gap-4 sm:p-3"
          >
            <Avatar name={c.name} src={c.photo} size={34} />

            {/* Name + role. Flexes, and truncates rather than wrapping so every
                row stays exactly one line tall at any width. */}
            <div className="min-w-0 flex-[2]">
              <div className="truncate text-[0.8125rem] font-medium text-ink">
                {c.name}
              </div>
              <div className="truncate text-[0.6875rem] text-faint">
                {c.title} · {c.company}
              </div>
            </div>

            {/* Extra columns earn their place only once there is width for them */}
            <div className="hidden min-w-0 flex-1 lg:block">
              <div className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-faint">
                Location
              </div>
              <div className="mt-0.5 truncate text-[0.75rem] text-muted">
                {c.location}
              </div>
            </div>

            <div className="hidden w-28 shrink-0 sm:block">
              <div className="num font-mono text-[0.625rem] text-muted">
                {c.fit}% fit
              </div>
              <Meter className="mt-1" value={c.fit} delay={0.4 + i * 0.09} />
            </div>

            <Chip tone={c.stage === "Final round" ? "ok" : "neutral"}>
              {c.stage}
            </Chip>
          </motion.div>
        ))}
      </div>
    </ArtifactFrame>
  );
}
