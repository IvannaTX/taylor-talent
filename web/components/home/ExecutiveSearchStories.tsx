"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { searchStories, type SearchStory } from "@/data/searchStories";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function SearchWorkflow() {
  const stages = [
    { label: "Mapped", value: "214", width: "100%" },
    { label: "Contacted", value: "96", width: "72%" },
    { label: "Screened", value: "31", width: "46%" },
    { label: "Shortlist", value: "4", width: "24%" },
  ];

  return (
    <div className="relative flex h-full min-h-[22rem] items-center overflow-hidden bg-[radial-gradient(circle_at_80%_10%,rgb(var(--a-indigo)/0.16),transparent_45%),rgb(var(--sunken))] p-5 sm:p-8">
      <div className="artifact mx-auto w-full max-w-[42rem] overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">Executive search</span>
          <span className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-ok shadow-[0_0_10px_rgb(var(--ok)/0.7)]" /> Live
          </span>
        </div>
        <div className="p-4 sm:p-6">
          <p className="display text-xl text-ink sm:text-2xl">VP Engineering</p>
          <p className="mt-1 text-xs text-faint">Confidential · Series B · Austin, TX</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stages.map((stage) => (
              <div key={stage.label}>
                <span className="num text-lg text-ink">{stage.value}</span>
                <span className="mt-1 block font-mono text-[0.5rem] uppercase tracking-[0.12em] text-faint">{stage.label}</span>
                <span className="mt-2 block h-1 overflow-hidden rounded-full bg-sunken">
                  <motion.span
                    className="block h-full rounded-full bg-accent-indigo"
                    initial={{ width: 0 }}
                    whileInView={{ width: stage.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-7 space-y-2 border-t border-line pt-4">
            {["Final conversation", "Leadership references", "Offer alignment"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-line bg-raised px-3 py-2.5 text-xs text-muted">
                <span>{item}</span>
                <span className={cn("font-mono text-[0.5rem] uppercase tracking-[0.1em]", index === 0 ? "text-ok" : "text-faint")}>
                  {index === 0 ? "Active" : "Ready"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryVisual({ story }: { story: SearchStory }) {
  if (story.visual.type === "workflow") return <SearchWorkflow />;

  return (
    <div className="relative h-full min-h-[22rem] overflow-hidden bg-sunken">
      <Image
        src={story.visual.src}
        alt={story.visual.alt}
        fill
        sizes="(min-width: 1024px) 62vw, 100vw"
        className="object-cover"
        priority={story.id === "white-glove"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sunken/45 via-transparent to-transparent" aria-hidden="true" />
    </div>
  );
}

export function ExecutiveSearchStories() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [manualPaused, setManualPaused] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const story = searchStories[active];
  const paused = manualPaused || hovering;

  React.useEffect(() => {
    if (paused || reduce) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % searchStories.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Why companies choose Taylor Talent"
      className="mt-5 overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-card sm:mt-6"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHovering(false);
      }}
    >
      <div className="grid min-h-[34rem] lg:grid-cols-[0.72fr_1.28fr]">
        <div className="flex min-h-[25rem] flex-col border-b border-line p-6 sm:p-8 lg:min-h-0 lg:border-b-0 lg:border-r lg:p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex flex-1 flex-col"
            >
              <span className="eyebrow">Why Taylor Talent</span>
              <h2 className="display mt-5 text-display-xs text-ink">{story.title}</h2>
              <p className="mt-5 max-w-[35ch] text-sm leading-relaxed text-muted sm:text-base">{story.description}</p>
              {story.metric ? (
                <div className="mt-auto pt-10">
                  <span className="display block text-[3.5rem] leading-none tracking-[-0.04em] text-ink sm:text-[4.5rem]">{story.metric.value}</span>
                  <span className="mt-2 block text-sm text-muted">{story.metric.label}</span>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-3" aria-label="Choose a story">
            <div className="flex items-center gap-2 rounded-pill border border-line bg-raised p-2">
              {searchStories.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => setActive(index)}
                  className={cn("h-2 rounded-full transition-[width,background-color] duration-500 ease-apple", index === active ? "w-10 bg-ink" : "w-2 bg-faint/50 hover:bg-muted")}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setManualPaused((value) => !value)}
              aria-label={manualPaused ? "Play carousel" : "Pause carousel"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-raised text-muted transition-colors hover:text-ink"
            >
              {manualPaused ? <Play className="h-3.5 w-3.5" fill="currentColor" /> : <Pause className="h-3.5 w-3.5" fill="currentColor" />}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="min-h-[22rem]"
          >
            <StoryVisual story={story} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
