"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { companies, type Company } from "@/data/companies";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { EASE, Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Customer Stories.
 *
 * Reads the same testimonial records as the brand wall above it — nothing here
 * is restated. A company joins this row by gaining a `background` in
 * data/testimonials.ts, and it appears in the order it sits in
 * data/companies.ts, so the two sections can never disagree about who a client
 * is or what they said.
 *
 * The logo row doubles as the transport: the hairline over each mark fills
 * across the dwell, which is why the clock is a motion value rather than a
 * timer — the fill and the advance are the same measurement, written as scaleX
 * on the compositor.
 */

/** How long a story holds. Also the hairline fill duration. */
const DWELL_MS = 7000;

/** Base logo height in px, scaled per mark by its optical factor. */
const LOGO_H = 20;

/** Where the CTA lands until per-story case studies exist. */
const FALLBACK_HREF = "/companies#search";

const QUOTE_SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.95,
} as const;

type Story = { company: Company; story: Testimonial };

const stories: Story[] = companies
  .map((company) => ({ company, story: testimonials[company.name] }))
  .filter((entry): entry is Story => Boolean(entry.story?.background));

/**
 * Open on the flagged relationship rather than whoever happens to sit first in
 * the logo order — the featured story is the one worth landing on.
 */
const FIRST = Math.max(
  0,
  stories.findIndex((entry) => entry.story.featured),
);

/** Light-on-photograph variant of the masked company mark. */
function StoryLogo({ company }: { company: Company }) {
  return (
    <span
      aria-hidden="true"
      className="block max-w-full bg-current"
      style={{
        height: Math.round(LOGO_H * (company.optical ?? 1) * 10) / 10,
        width: company.opticalWidth ?? 104,
        WebkitMaskImage: `url(${company.logo})`,
        maskImage: `url(${company.logo})`,
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export function CustomerStories() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const [active, setActive] = React.useState(FIRST);
  const [hovering, setHovering] = React.useState(false);
  const count = stories.length;
  const paused = hovering || !inView;
  const progress = useMotionValue(0);

  // Declared first so it runs first: a new story always starts from empty.
  React.useEffect(() => {
    progress.set(0);
  }, [active, progress]);

  React.useEffect(() => {
    if (reduce) {
      // No autoplay, and the hairline reads as complete rather than empty.
      progress.set(1);
      return;
    }
    if (paused) return;

    // Resume from where the pause left it rather than restarting the dwell.
    const controls = animate(progress, 1, {
      duration: (1 - progress.get()) * (DWELL_MS / 1000),
      ease: "linear",
      onComplete: () => setActive((current) => (current + 1) % count),
    });

    return () => controls.stop();
  }, [active, paused, progress, reduce, count]);

  if (count === 0) return null;

  const current = stories[active];
  const { story } = current;
  const background = story.background!;

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Customer stories"
      className="relative mt-14 overflow-hidden rounded-[1.5rem] border border-line bg-sunken shadow-card sm:mt-16"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setHovering(false);
      }}
    >
      {/* ---- backdrop: crossfade plus a slow push in ------------------ */}
      <div aria-hidden="true" className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.company.name}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            /* The push outlasts the fade, so the incoming frame is still
               settling once it has fully arrived. */
            transition={{
              opacity: { duration: 1.1, ease: EASE },
              scale: { duration: 9, ease: "linear" },
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={background.src}
              alt=""
              fill
              priority={active === FIRST}
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="object-cover"
              style={{ objectPosition: background.position ?? "center" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Legibility, in two passes: a vertical lift for the quote block and a
            left-hand wash so the type never sits on a bright patch. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/55 to-black/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/10 to-transparent" />
      </div>

      {/* ---- content -------------------------------------------------- */}
      <div className="relative flex min-h-[31rem] flex-col px-5 py-10 sm:min-h-[35rem] sm:px-8 sm:py-12 lg:min-h-[38rem]">
        <Reveal dir="up" blur={false} className="mx-auto max-w-[42rem] text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-1 w-1 shrink-0 rounded-full bg-accent-indigo"
            />
            <span className="font-mono text-eyebrow uppercase text-white/55">
              Customer Stories
            </span>
          </div>
          <h2 className="display mt-5 text-display-sm text-white">
            Trusted by exceptional leadership teams
          </h2>
        </Reveal>

        {/* Logo row — the navigation. Scrolls on small screens, grid above. */}
        <div className="-mx-5 mt-9 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          <ul
            className="flex min-w-max snap-x snap-mandatory gap-3 sm:grid sm:min-w-0 sm:snap-none sm:gap-4"
            style={{
              gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
            }}
          >
            {stories.map((entry, index) => {
              const isActive = index === active;
              return (
                <li
                  key={entry.company.name}
                  className="w-[8.5rem] shrink-0 snap-start sm:w-auto"
                >
                  <button
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Show the ${entry.company.name} story`}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className="group block w-full text-left"
                  >
                    <span className="relative block h-px w-full overflow-hidden bg-white/20">
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 origin-left bg-white"
                          style={{
                            scaleX: progress,
                            willChange: "transform",
                          }}
                        />
                      )}
                    </span>

                    <span
                      className={cn(
                        "mt-4 flex h-8 items-center justify-center transition-opacity duration-500 ease-apple",
                        isActive
                          ? "text-white opacity-100"
                          : "text-white opacity-40 group-hover:opacity-75",
                      )}
                    >
                      <StoryLogo company={entry.company} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quote — the one element that carries the story */}
        <div className="mt-auto pt-14 sm:pt-16">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={story.company}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              /* Spring on the transform, tween on opacity — a spring applied to
                 opacity settles slowly and reads as a fade that will not commit. */
              transition={{
                y: QUOTE_SPRING,
                opacity: { duration: 0.38, ease: EASE },
              }}
              className="max-w-[34rem]"
            >
              <blockquote className="display text-[1.5rem] leading-[1.22] text-white sm:text-[1.875rem] lg:text-[2.25rem]">
                “{story.quote}”
              </blockquote>

              <figcaption className="mt-6">
                <span className="block text-sm text-white">
                  {story.partnerName}
                </span>
                <span className="mt-1 block text-[0.8125rem] text-white/60">
                  {story.partnerTitle} · {story.company}
                </span>
              </figcaption>

              <Link
                href={story.storyHref ?? FALLBACK_HREF}
                className="group mt-7 inline-flex items-center gap-2 text-[0.875rem] text-white/85 transition-colors duration-300 hover:text-white"
              >
                View search partnership
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5 motion-reduce:transition-none"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
