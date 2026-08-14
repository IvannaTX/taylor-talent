"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Video } from "lucide-react";
import { booking } from "@/lib/candidates";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/reveal";
import { ArtifactFrame } from "@/components/artifacts/chrome";
import founderImg from "@/public/images/founder.png";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Days in a month, and the weekday index (0 = Sunday) its 1st falls on. */
function monthShape(year: number, month: number) {
  const days = new Date(year, month + 1, 0).getDate();
  const startsOn = new Date(year, month, 1).getDay();
  return { days, startsOn };
}

/**
 * The close: a scheduling preview that mirrors Jarod's real Paraform page.
 *
 * That page shows his avatar, a 30-minute Google Meet, and a month-grid calendar.
 * Matching that structure here is the entire point — a visitor picks a day and a
 * time in a surface they recognise, then clicks through and lands on the same
 * mental model instead of a fresh context.
 *
 * The month is computed client-side so the calendar is genuinely current. Server
 * render and first hydration both use `booking.referenceMonth`, which keeps the
 * two markups identical; the effect then swaps in today's month.
 */
export function SchedulerArtifact({ className }: { className?: string }) {
  const [today, setToday] = React.useState<{
    year: number;
    month: number;
    day: number;
  }>(booking.referenceMonth);

  React.useEffect(() => {
    const now = new Date();
    setToday({
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
    });
  }, []);

  const { days, startsOn } = monthShape(today.year, today.month);

  // Weekdays from today onward are bookable; weekends and past dates are not.
  const available = React.useCallback(
    (d: number) => {
      if (d < today.day) return false;
      const wd = new Date(today.year, today.month, d).getDay();
      return wd !== 0 && wd !== 6;
    },
    [today],
  );

  const firstOpen = React.useMemo(() => {
    for (let d = today.day; d <= days; d++) if (available(d)) return d;
    return null;
  }, [today, days, available]);

  const [day, setDay] = React.useState<number | null>(null);
  const [time, setTime] = React.useState<number | null>(null);

  // Follow the computed month when it changes (i.e. once after mount).
  React.useEffect(() => {
    setDay(firstOpen);
    setTime(null);
  }, [firstOpen]);

  const selected = day ?? firstOpen;
  const external = site.bookCall.startsWith("http");

  return (
    <ArtifactFrame
      label="Discovery call"
      className={className}
      badge={
        <span className="inline-flex items-center gap-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
          <Video className="h-3 w-3" strokeWidth={2} aria-hidden />
          {booking.platform}
        </span>
      }
      footer={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
            <Globe className="h-3 w-3" strokeWidth={2} aria-hidden />
            {booking.tz}
          </span>
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
            Scheduling opens in a new tab
          </span>
        </div>
      }
    >
      {/* Host block — mirrors the header of the real booking page */}
      <div className="flex items-center gap-3">
        <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <Image
            src={founderImg}
            alt=""
            sizes="36px"
            placeholder="blur"
            className="h-full w-full object-cover"
            aria-hidden
          />
        </span>
        <div className="min-w-0">
          <div className="truncate text-[0.875rem] font-medium text-ink">
            {booking.host}
          </div>
          <div className="num font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
            {booking.duration}
          </div>
        </div>
      </div>

      {/* Month grid */}
      <div className="mt-5">
        <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
          {MONTHS[today.month]} {today.year}
        </div>

        <div
          className="mt-3 grid grid-cols-7 gap-1 text-center"
          aria-hidden
        >
          {booking.weekdays.map((w) => (
            <span
              key={w}
              className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-faint"
            >
              {w.slice(0, 1)}
            </span>
          ))}
        </div>

        <div
          role="group"
          aria-label={`Available days in ${MONTHS[today.month]}`}
          className="mt-1.5 grid grid-cols-7 gap-1"
        >
          {/* Leading blanks so the 1st lands on the right weekday */}
          {Array.from({ length: startsOn }).map((_, i) => (
            <span key={`pad-${i}`} aria-hidden />
          ))}

          {Array.from({ length: days }).map((_, i) => {
            const d = i + 1;
            const open = available(d);
            const active = d === selected;
            return (
              <button
                key={d}
                type="button"
                disabled={!open}
                aria-pressed={active}
                aria-label={`${MONTHS[today.month]} ${d}`}
                onClick={() => {
                  setDay(d);
                  setTime(null);
                }}
                className={cn(
                  "num grid aspect-square place-items-center rounded-lg border text-[0.75rem] transition-colors duration-300 ease-apple",
                  active
                    ? "border-transparent bg-accent-indigo text-on-accent"
                    : open
                      ? "border-line bg-raised text-muted hover:border-accent-indigo/45 hover:text-ink"
                      : "cursor-default border-transparent text-faint/70",
                )}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Times for the selected day */}
      <div className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {booking.times.map((t, i) => {
          const active = i === time;
          return (
            <motion.button
              key={t}
              type="button"
              onClick={() => setTime(i)}
              aria-pressed={active}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.4, delay: 0.04 * i, ease: EASE }}
              className={cn(
                "num rounded-xl border py-2 text-center text-[0.8125rem] transition-colors duration-300 ease-apple",
                active
                  ? "border-accent-indigo/60 bg-accent-indigo/10 text-ink"
                  : "border-line bg-raised text-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {t}
            </motion.button>
          );
        })}
      </div>

      {/* Continue strip. The idle state is signalled by border and fill, never by
          opacity — dimming it put both labels under the contrast floor. */}
      <a
        href={site.bookCall}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "mt-3 flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-400 ease-apple",
          time === null
            ? "border-line bg-sunken hover:border-line-strong"
            : "border-accent-indigo/45 bg-accent-indigo/[0.07]",
        )}
      >
        <span className="min-w-0 text-[0.8125rem] text-muted">
          {time === null || selected === null ? (
            "Pick a time to continue"
          ) : (
            <>
              <span className="text-ink">
                {MONTHS[today.month].slice(0, 3)} {selected}
              </span>{" "}
              at <span className="text-ink">{booking.times[time]}</span>
            </>
          )}
        </span>
        <span className="shrink-0 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-accent-indigo">
          Continue →
        </span>
      </a>
    </ArtifactFrame>
  );
}
