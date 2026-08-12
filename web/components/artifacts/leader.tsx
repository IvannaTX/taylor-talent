"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, EyeOff, Lock, X } from "lucide-react";
import { introRequest, leaderProfile, trajectory } from "@/lib/candidates";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/reveal";
import { ArtifactFrame, Chip, Field } from "@/components/artifacts/chrome";

const rise = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" } as const,
  transition: { duration: 0.5, delay: 0.06 * i, ease: EASE },
});

/* ------------------------------------------------------------------ */
/* Confidential profile — the visibility state is the whole message    */
/* ------------------------------------------------------------------ */

export function ConfidentialArtifact() {
  return (
    <ArtifactFrame
      label="Your record"
      badge={
        <span className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-2.5 py-1">
          <EyeOff className="h-3 w-3 text-faint" strokeWidth={2} aria-hidden />
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
            {leaderProfile.visibility}
          </span>
        </span>
      }
      footer={
        <p className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-muted">
          <Lock
            className="mt-0.5 h-3 w-3 shrink-0 text-accent-indigo"
            strokeWidth={2}
            aria-hidden
          />
          {leaderProfile.footnote}
        </p>
      }
    >
      <div>
        {leaderProfile.fields.map((f, i) => (
          <motion.div key={f.k} {...rise(i)}>
            <Field k={f.k} v={f.v} locked />
          </motion.div>
        ))}
      </div>

      {/* A deliberately redacted block — reads instantly as "withheld". */}
      <motion.div {...rise(3)} className="mt-4 space-y-2" aria-hidden>
        {[92, 76, 84].map((w, i) => (
          <span
            key={i}
            className="block h-2.5 rounded-pill bg-sunken"
            style={{ width: `${w}%` }}
          />
        ))}
      </motion.div>
    </ArtifactFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Intro request — the approval gate                                   */
/* ------------------------------------------------------------------ */

export function IntroArtifact() {
  return (
    <ArtifactFrame
      label="Introduction request"
      badge={<Chip tone="warn">Awaiting your approval</Chip>}
      footer={
        <p className="text-[0.75rem] text-muted">{introRequest.reveals}</p>
      }
    >
      <motion.div {...rise(0)}>
        <div className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
          {introRequest.company}
        </div>
        <h4 className="display mt-1.5 text-[1.25rem] leading-tight text-ink">
          {introRequest.role}
        </h4>
        <div className="num mt-1 font-mono text-[0.75rem] text-muted">
          {introRequest.band}
        </div>
      </motion.div>

      <motion.p
        {...rise(1)}
        className="mt-3.5 border-l-2 border-accent-indigo/40 pl-3 text-[0.8125rem] leading-relaxed text-muted"
      >
        {introRequest.why}
      </motion.p>

      {/* Approve is emphasised; declining is presented as equally normal. */}
      <motion.div {...rise(2)} className="mt-4 flex gap-2">
        <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-pill bg-accent-indigo px-4 py-2 text-[0.8125rem] font-medium text-on-accent">
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          Approve
        </span>
        <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-pill border border-line bg-raised px-4 py-2 text-[0.8125rem] text-muted">
          <X className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          Decline
        </span>
      </motion.div>
    </ArtifactFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Trajectory — three moves out                                        */
/* ------------------------------------------------------------------ */

export function TrajectoryArtifact() {
  return (
    <ArtifactFrame label="Trajectory" badge={<Chip>Three moves out</Chip>}>
      <ol className="relative">
        {trajectory.map((t, i) => (
          <motion.li key={t.when} {...rise(i)} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Connector, drawn between nodes only */}
            {i < trajectory.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[0.4375rem] top-4 h-full w-px bg-line"
              />
            )}
            <span
              aria-hidden
              className={cn(
                "relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full",
                t.state === "current" && "bg-ok",
                t.state === "target" && "bg-accent-indigo",
                t.state === "future" && "border border-line-strong bg-surface",
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
                {t.when}
              </div>
              <div
                className={cn(
                  "mt-1 text-[0.875rem]",
                  t.state === "future" ? "text-muted" : "text-ink",
                )}
              >
                {t.what}
              </div>
            </div>
            {t.state === "target" && (
              <ArrowRight
                className="mt-1.5 h-3.5 w-3.5 shrink-0 text-accent-indigo"
                strokeWidth={2}
                aria-hidden
              />
            )}
          </motion.li>
        ))}
      </ol>
    </ArtifactFrame>
  );
}

export const leaderArtifacts = {
  confidential: ConfidentialArtifact,
  intro: IntroArtifact,
  trajectory: TrajectoryArtifact,
} as const;
