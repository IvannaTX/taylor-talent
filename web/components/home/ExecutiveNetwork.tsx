"use client";

import * as React from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Pause, Play } from "lucide-react";
import { photographedProfiles } from "@/data/executiveNetwork";
import { EASE, Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const STEP_MS = 5600;
const CARD_SPRING = { type: "spring", stiffness: 260, damping: 34, mass: 1 } as const;
const MORPH_SPRING = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 } as const;

export function ExecutiveNetwork() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.28 });
  /* Only profiles with their own photograph. The roster in data/executiveNetwork.ts
     runs ahead of the imagery, and a card is never filled by borrowing another
     slot's picture, so the stage renders what exists. */
  const count = photographedProfiles.length;

  const [active, setActive] = React.useState(0);
  const [manualPaused, setManualPaused] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [stageWidth, setStageWidth] = React.useState(0);
  const progress = useMotionValue(0);
  const paused = manualPaused || hovering || dragging || !inView;

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    setStageWidth(stage.clientWidth);
    const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const compact = stageWidth > 0 && stageWidth < 640;
  const cardWidth = stageWidth
    ? Math.round(Math.min(Math.max(stageWidth * (compact ? 0.7 : 0.3), 232), 374))
    : 0;
  const cardHeight = Math.round(cardWidth * 1.34);
  const spacing = Math.round(cardWidth * (compact ? 0.82 : 0.9));

  const step = React.useCallback(
    (direction: number) => setActive((current) => (current + direction + count) % count),
    [count],
  );

  React.useEffect(() => progress.set(0), [active, progress]);

  React.useEffect(() => {
    if (reduce) {
      progress.set(1);
      return;
    }
    if (paused) return;
    const controls = animate(progress, 1, {
      duration: (1 - progress.get()) * (STEP_MS / 1000),
      ease: "linear",
      onComplete: () => step(1),
    });
    return () => controls.stop();
  }, [active, paused, progress, reduce, step]);

  /* With an even count the antipodal card is not wrapped symmetrically — it can
     sit at +half or -half depending on parity. It is past distance 2 either way,
     so it is fully transparent and off-stage; not worth a branch. */
  const offsetOf = (index: number) => {
    let offset = index - active;
    const half = Math.floor(count / 2);
    if (offset > half) offset -= count;
    if (offset < -half) offset += count;
    return offset;
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Executive network showcase"
      className="mt-16 border-t border-line pt-16 sm:mt-20 sm:pt-20"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHovering(false);
      }}
    >
      <Reveal dir="up" blur={false} className="mx-auto max-w-[46rem] text-center">
        <div className="flex items-center justify-center gap-2.5">
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent-indigo" />
          <span className="eyebrow">Confidential Executive Network</span>
        </div>
        <h2 className="display mt-5 text-display-sm text-ink">
          Relationships with leaders who rarely enter the market.
        </h2>
        <p className="mx-auto mt-4 max-w-[50ch] text-sm leading-relaxed text-muted sm:text-base">
          A representative view of the senior leadership Taylor Talent knows, understands, and can reach discreetly.
        </p>
      </Reveal>

      <div
        ref={stageRef}
        className="relative mt-10 w-full overflow-hidden sm:mt-12"
        style={{ height: cardWidth ? cardHeight : 420 }}
      >
        <motion.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag={cardWidth ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_event, info) => {
            setDragging(false);
            const threshold = Math.min(72, cardWidth * 0.22);
            if (info.offset.x < -threshold || info.velocity.x < -420) step(1);
            else if (info.offset.x > threshold || info.velocity.x > 420) step(-1);
          }}
        >
          {photographedProfiles.map((profile, index) => {
            const offset = offsetOf(index);
            const distance = Math.abs(offset);
            const featured = distance === 0;

            return (
              <motion.button
                key={profile.id}
                type="button"
                aria-label={`Show ${profile.title}`}
                aria-current={featured ? "true" : undefined}
                onClick={() => !featured && setActive(index)}
                initial={false}
                animate={{
                  x: offset * spacing,
                  scale: featured ? 1 : distance === 1 ? 0.86 : 0.74,
                  opacity: cardWidth ? (distance > 2 ? 0 : 1) : 0,
                }}
                transition={{
                  x: CARD_SPRING,
                  scale: CARD_SPRING,
                  opacity: { duration: 0.4, ease: EASE },
                }}
                style={{
                  width: cardWidth || undefined,
                  height: cardHeight || undefined,
                  marginLeft: cardWidth ? -cardWidth / 2 : 0,
                  marginTop: cardHeight ? -cardHeight / 2 : 0,
                  zIndex: 10 - distance,
                  willChange: "transform",
                }}
                className={cn(
                  "absolute left-1/2 top-1/2 overflow-hidden rounded-[1.25rem] border bg-sunken text-left",
                  featured ? "border-line-strong shadow-lift" : "border-line shadow-card",
                )}
                draggable={false}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ x: offset * -14, scale: featured ? 1.015 : 1.08 }}
                  transition={CARD_SPRING}
                >
                  <Image
                    src={profile.image.src}
                    alt={profile.image.alt}
                    fill
                    sizes="(min-width: 1024px) 24rem, 70vw"
                    className="object-cover"
                    /* Five cards are within the visible band; loading only the
                       centre one meant the neighbours popped in on first drag. */
                    priority={index <= 2}
                  />
                </motion.div>

                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-bg"
                  animate={{ opacity: featured ? 0 : distance === 1 ? 0.56 : 0.72 }}
                  transition={CARD_SPRING}
                />

                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6"
                  animate={{ opacity: featured ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                  <div className="relative">
                    <p className="display text-[1.65rem] leading-tight text-white sm:text-[1.9rem]">{profile.title}</p>
                    <p className="mt-2 text-xs text-white/75">{profile.practiceArea} · {profile.industry}</p>
                    <p className="mt-1 text-xs text-white/60">{profile.location}</p>
                    <div className="mt-5 border-t border-white/20 pt-3">
                      <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-white/50">Previously</span>
                      <p className="mt-1.5 text-xs text-white/80">{profile.previously.join("  ·  ")}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-bg to-transparent sm:w-28" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-bg to-transparent sm:w-28" />
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="flex items-center gap-2 rounded-pill border border-line bg-raised p-2">
          {photographedProfiles.map((profile, index) => {
            const current = index === active;
            return (
              <motion.button
                key={profile.id}
                type="button"
                layout
                aria-label={`Show ${profile.title}`}
                aria-current={current ? "true" : undefined}
                onClick={() => setActive(index)}
                transition={MORPH_SPRING}
                className={cn("relative h-2 shrink-0 rounded-full", current ? "w-10" : "w-2 bg-faint/50 hover:bg-muted")}
              >
                {current ? (
                  <motion.span layoutId="executive-network-progress" className="absolute inset-0 overflow-hidden rounded-full bg-ink/20">
                    <motion.span className="block h-full w-full rounded-full bg-ink" style={{ scaleX: progress, originX: 0 }} />
                  </motion.span>
                ) : null}
              </motion.button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setManualPaused((value) => !value)}
          aria-label={manualPaused ? "Play carousel" : "Pause carousel"}
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-raised text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={manualPaused ? "play" : "pause"} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="grid place-items-center">
              {manualPaused ? <Play className="h-3.5 w-3.5" fill="currentColor" /> : <Pause className="h-3.5 w-3.5" fill="currentColor" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </section>
  );
}
