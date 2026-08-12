"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { Beat } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { EASE, Reveal } from "@/components/motion/reveal";
import { Eyebrow, Metric } from "@/components/ui/kit";

type ArtifactMap = Record<string, React.ComponentType>;

/**
 * A "run" of beats — the page's engine.
 *
 * Desktop: the artifact column is pinned and CROSS-FADES between stages as you
 * scroll the copy beside it. One persistent surface that morphs through the
 * whole story of a search, rather than a series of unrelated cards. That is the
 * scroll choreography doing narrative work instead of decoration.
 *
 * Mobile: no pinning and no swapping. Each beat renders its own artifact
 * directly beneath its copy and the page simply stacks — the same content in the
 * order you would read it aloud.
 */
export function BeatRun({
  label,
  beats,
  artifacts,
  id,
  align = "left",
}: {
  label: string;
  beats: Beat[];
  artifacts: ArtifactMap;
  id?: string;
  /** Which side the pinned artifact sits on at lg+. */
  align?: "left" | "right";
}) {
  const [active, setActive] = React.useState(0);
  const onActive = React.useCallback((i: number) => setActive(i), []);

  const ActiveArtifact = artifacts[beats[active]?.artifact];

  return (
    <section id={id} className="relative scroll-mt-24">
      <div className="shell">
        {/* Run label — a quiet chapter marker */}
        <Reveal blur={false}>
          <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
            <Eyebrow>{label}</Eyebrow>
            <span className="num font-mono text-[0.625rem] tracking-[0.14em] text-faint">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(beats.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div
          className={cn(
            "grid grid-cols-1 gap-x-16 lg:grid-cols-2",
            // The artifact stage is first in the DOM (so it is the sticky
            // element); pushing it to order-2 is what moves it to the right.
            align === "right" && "lg:[&>*:first-child]:order-2",
          )}
        >
          {/* Pinned artifact stage (lg+ only) */}
          <div className="relative hidden min-w-0 lg:block">
            <div className="sticky top-[12vh] flex h-[78vh] items-center">
              <div className="w-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={beats[active]?.id ?? "empty"}
                    initial={{ opacity: 0, y: 16, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.985 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {ActiveArtifact ? <ActiveArtifact /> : null}
                  </motion.div>
                </AnimatePresence>

                {/* Stage rail under the artifact */}
                <div className="mt-6 flex gap-1.5" aria-hidden>
                  {beats.map((b, i) => (
                    <span
                      key={b.id}
                      className="h-0.5 flex-1 overflow-hidden rounded-pill bg-line"
                    >
                      <motion.span
                        className="block h-full rounded-pill bg-accent-indigo"
                        initial={false}
                        animate={{ width: i <= active ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div className="min-w-0">
            {beats.map((beat, i) => (
              <BeatBlock
                key={beat.id}
                beat={beat}
                index={i}
                onActive={onActive}
                Artifact={artifacts[beat.artifact]}
                isLast={i === beats.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BeatBlock({
  beat,
  index,
  onActive,
  Artifact,
  isLast,
}: {
  beat: Beat;
  index: number;
  onActive: (i: number) => void;
  Artifact?: React.ComponentType;
  isLast: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  // A band across the middle of the viewport decides which beat is current.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  React.useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col justify-center py-14 sm:py-16 lg:min-h-[72vh] lg:py-0",
        !isLast && "border-b border-line lg:border-0",
      )}
    >
      <Reveal blur={false}>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent-indigo">
          {beat.eyebrow}
        </span>
      </Reveal>

      <motion.h3
        className="display mt-4 max-w-[26ch] text-display-sm text-ink"
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {beat.title}
      </motion.h3>

      <Reveal delay={0.1}>
        <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted sm:text-base">
          {beat.body}
        </p>
      </Reveal>

      {/* Mobile / tablet: the artifact belongs inline, right here. */}
      {Artifact && (
        <Reveal delay={0.14} className="mt-8 lg:hidden">
          <Artifact />
        </Reveal>
      )}

      <Reveal delay={0.18}>
        <Metric
          value={beat.metric.value}
          label={beat.metric.label}
          className="mt-9"
        />
      </Reveal>
    </div>
  );
}
