"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Check, Minus, Plus, X } from "lucide-react";
import {
  calibration,
  candidates,
  marketMap,
  offer,
  scorecard,
} from "@/lib/candidates";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/reveal";
import {
  ArtifactFrame,
  Avatar,
  Chip,
  Meter,
  Signal,
} from "@/components/artifacts/chrome";

const rise = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" } as const,
  transition: { duration: 0.5, delay: 0.05 * i, ease: EASE },
});

/* ------------------------------------------------------------------ */
/* Stage 01 — Calibration brief                                        */
/* ------------------------------------------------------------------ */

export function CalibrationArtifact() {
  const groups = [
    { key: "Must have", items: calibration.musts, Icon: Check, tone: "ok" },
    { key: "Nice to have", items: calibration.nice, Icon: Plus, tone: "neutral" },
    { key: "Disqualifying", items: calibration.not, Icon: X, tone: "warn" },
  ] as const;

  return (
    <ArtifactFrame
      label="Calibration brief"
      badge={<Chip tone="warn">{calibration.verdict}</Chip>}
    >
      {/* The honest flag is the point of this artifact, so it leads. */}
      <motion.div
        {...rise(0)}
        className="flex gap-3 rounded-xl border border-warn/25 bg-warn/[0.07] p-3.5"
      >
        <AlertTriangle
          className="mt-0.5 h-4 w-4 shrink-0 text-warn"
          strokeWidth={2}
          aria-hidden
        />
        <p className="text-[0.8125rem] leading-relaxed text-muted">
          {calibration.flag}
        </p>
      </motion.div>

      <div className="mt-4 space-y-4">
        {groups.map((g, gi) => (
          <motion.div key={g.key} {...rise(gi + 1)}>
            <div className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
              {g.key}
            </div>
            <ul className="mt-2 space-y-1.5">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[0.8125rem] leading-snug text-muted"
                >
                  <span
                    className={cn(
                      "mt-[0.1875rem] grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full",
                      g.tone === "ok" && "bg-ok/15 text-ok",
                      g.tone === "warn" && "bg-warn/15 text-warn",
                      g.tone === "neutral" && "bg-line text-faint",
                    )}
                  >
                    <g.Icon className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </ArtifactFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 02 — Market map                                               */
/* ------------------------------------------------------------------ */

export function MarketMapArtifact() {
  return (
    <ArtifactFrame
      label="Market map · coverage"
      badge={
        <span className="num font-mono text-[0.625rem] text-muted">
          {marketMap.total} in territory
        </span>
      }
      footer={
        <div>
          <div className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
            Why they passed
          </div>
          <ul className="mt-2 space-y-1.5">
            {marketMap.passes.map((p, i) => (
              <motion.li
                key={p.reason}
                {...rise(i)}
                className="flex items-baseline justify-between gap-3 text-[0.75rem]"
              >
                <span className="text-muted">{p.reason}</span>
                <span className="num shrink-0 font-mono text-faint">
                  {p.count}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      }
    >
      {/* Coverage grid — 214 dots would be noise, so segments carry it */}
      <div className="space-y-3.5">
        {marketMap.segments.map((s, i) => (
          <motion.div key={s.label} {...rise(i)}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.8125rem] text-muted">{s.label}</span>
              <span className="num font-mono text-[0.8125rem] text-ink">
                {s.count}
              </span>
            </div>
            <Meter
              className="mt-1.5"
              value={s.count}
              max={marketMap.total}
              tone={s.tone === "muted" ? "muted" : s.tone}
              delay={0.08 * i}
            />
          </motion.div>
        ))}
      </div>

      {/* Dot field: a compact visual of the whole territory */}
      <div
        className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(0.4rem,1fr))] gap-1"
        aria-hidden
      >
        {Array.from({ length: 84 }).map((_, i) => {
          const engaged = i < 38;
          const passed = i >= 38 && i < 71;
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.3, delay: i * 0.006, ease: EASE }}
              className={cn(
                "aspect-square rounded-full",
                engaged && "bg-accent-indigo/80",
                passed && "bg-warn/40",
                !engaged && !passed && "bg-line-strong/60",
              )}
            />
          );
        })}
      </div>
    </ArtifactFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 03 — Shortlist                                                */
/* ------------------------------------------------------------------ */

export function ShortlistArtifact() {
  return (
    <ArtifactFrame
      label="Shortlist · VP Engineering"
      badge={<Chip tone="accent">{candidates.length} candidates</Chip>}
    >
      <div className="space-y-2">
        {candidates.map((c, i) => (
          <motion.article key={c.id} {...rise(i)} className="artifact-row p-3">
            <div className="flex items-start gap-3">
              <Avatar name={c.name} src={c.photo} size={34} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[0.875rem] font-medium text-ink">
                    {c.name}
                  </span>
                  <span className="num font-mono text-[0.625rem] text-accent-indigo">
                    {c.fit}% fit
                  </span>
                </div>
                <div className="mt-0.5 truncate text-[0.75rem] text-faint">
                  {c.title} · {c.company}
                </div>
              </div>
            </div>

            <div className="mt-2.5 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
              {c.signals.map((s) => (
                <Signal key={s.label} label={s.label} pass={s.pass} />
              ))}
            </div>

            {/* The reservation is the differentiator — never hidden. */}
            <div className="mt-2.5 flex items-start gap-2 border-t border-line pt-2">
              <span className="mt-px font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-warn">
                Reservation
              </span>
              <span className="text-[0.75rem] leading-snug text-muted">
                {c.reservation}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </ArtifactFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 04 — Scorecard                                                */
/* ------------------------------------------------------------------ */

export function ScorecardArtifact() {
  return (
    <ArtifactFrame
      label="Interview scorecard"
      badge={<Chip>{scorecard.round}</Chip>}
      footer={
        <p className="text-[0.75rem] leading-relaxed text-muted">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-faint">
            Debrief ·{" "}
          </span>
          {scorecard.note}
        </p>
      }
    >
      <div className="flex items-center gap-3">
        <Avatar name={scorecard.candidate} size={32} />
        <div className="min-w-0">
          <div className="text-[0.8125rem] font-medium text-ink">
            {scorecard.candidate}
          </div>
          <div className="text-[0.6875rem] text-faint">
            {scorecard.submitted}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {scorecard.criteria.map((c, i) => (
          <motion.div
            key={c.label}
            {...rise(i)}
            className="flex items-center gap-3"
          >
            <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-muted">
              {c.label}
            </span>
            {/* Discrete pips, not a bar — a rubric has whole-number scores. */}
            <span className="flex shrink-0 items-center gap-1" aria-hidden>
              {Array.from({ length: c.max }).map((_, j) => (
                <span
                  key={j}
                  className={cn(
                    "h-1.5 w-4 rounded-pill sm:w-5",
                    j < c.score ? "bg-accent-indigo" : "bg-sunken",
                  )}
                />
              ))}
            </span>
            <span className="num w-8 shrink-0 text-right font-mono text-[0.6875rem] text-ink">
              {c.score}/{c.max}
            </span>
          </motion.div>
        ))}
      </div>
    </ArtifactFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 05 — Offer tracker                                            */
/* ------------------------------------------------------------------ */

export function OfferArtifact() {
  const done = offer.items.filter((i) => i.done).length;

  return (
    <ArtifactFrame
      label="Offer & close"
      badge={<Chip tone="ok">{offer.status}</Chip>}
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
            {done} of {offer.items.length} complete
          </span>
          <Meter
            className="max-w-[8rem]"
            value={done}
            max={offer.items.length}
            tone="ok"
          />
        </div>
      }
    >
      <div className="flex items-center gap-3 pb-1">
        <Avatar name={offer.candidate} size={32} />
        <span className="text-[0.8125rem] font-medium text-ink">
          {offer.candidate}
        </span>
      </div>

      <div className="mt-2">
        {offer.items.map((item, i) => (
          <motion.div
            key={item.label}
            {...rise(i)}
            className="flex items-center gap-3 border-b border-line py-2.5 last:border-0"
          >
            <span
              className={cn(
                "grid h-4 w-4 shrink-0 place-items-center rounded-full",
                item.done ? "bg-ok/15 text-ok" : "bg-line text-faint",
              )}
              aria-hidden
            >
              {item.done ? (
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              ) : (
                <Minus className="h-2.5 w-2.5" strokeWidth={3} />
              )}
            </span>
            <span className="min-w-0 flex-1 text-[0.75rem] text-faint">
              {item.label}
            </span>
            <span
              className={cn(
                "num shrink-0 text-right font-mono text-[0.75rem]",
                item.done ? "text-ink" : "text-faint",
              )}
            >
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>
    </ArtifactFrame>
  );
}

/** Registry so a beat can name its artifact in data. */
export const companyArtifacts = {
  calibration: CalibrationArtifact,
  "market-map": MarketMapArtifact,
  shortlist: ShortlistArtifact,
  scorecard: ScorecardArtifact,
  offer: OfferArtifact,
} as const;
