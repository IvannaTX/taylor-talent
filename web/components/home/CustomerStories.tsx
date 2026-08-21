"use client";

import * as React from "react";
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
import { clients, type ClientRecord } from "@/data/clients";
import { ClientBackdrop } from "@/components/site/client-backdrop";
import { clientBackdrops } from "@/lib/backdrops";
import { EASE, Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Client showcase.
 *
 * Reads the same client records as the brand wall above it — nothing here is
 * restated. A company joins this row by gaining a `backdrop` in
 * data/clients.ts, and it appears in the order it sits in data/companies.ts, so
 * the two sections can never disagree about who a client is.
 *
 * Nothing in this section is photographic. Each client is fronted by its own
 * Monterey-inspired composition (components/site/client-backdrop.tsx), which is
 * the identity of the section rather than a different stock person standing in
 * for each company.
 *
 * Presents the relationship and what each company does. It carries no quote and
 * no named individual: nothing is attributed to a person who has not approved
 * it in writing.
 *
 * Rendered on the homepage and on /companies above "How a search runs". Both
 * read the same client records, so the two pages cannot drift apart.
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

/** Where the CTA lands until per-client detail pages exist. */
const FALLBACK_HREF = "/companies#search";

const COPY_SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.95,
} as const;

type Story = { company: Company; story: ClientRecord };

const stories: Story[] = companies
  .map((company) => ({ company, story: clients[company.name] }))
  .filter((entry): entry is Story => Boolean(entry.story?.backdrop));

/** Light-on-backdrop variant of the masked company mark. */
function StoryLogo({ company }: { company: Company }) {
  if (company.wordmark) {
    return (
      <span
        aria-hidden="true"
        className="block whitespace-nowrap font-sans text-[0.8125rem] font-semibold tracking-[0.12em] text-current"
      >
        {company.name}
      </span>
    );
  }

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

/**
 * @param className Outer spacing. Defaults to the homepage rhythm, where this
 *   section follows the brand wall. Replaced wholesale rather than merged, so a
 *   second placement sets its own spacing without having to out-specify this one.
 */
export function CustomerStories({
  className = "mt-14 sm:mt-16",
}: {
  className?: string;
} = {}) {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const [active, setActive] = React.useState(0);
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
  const backdrop = clientBackdrops[story.backdrop!];

  return (
    /* The whole surface reveals on scroll, like the search-stories card below
       it — this section used to reveal only its heading block, so the card
       arrived fully painted while every other section settled in.

       blur={false} is deliberate and not just taste: the backdrop inside
       composites in `screen`, and animating a filter on an ancestor is the kind
       of thing that promotes layers and disturbs a blend mid-flight. Fading and
       translating leaves the blend alone. */
    <Reveal dir="up" blur={false} className={className}>
      <section
          ref={sectionRef}
          aria-roledescription="carousel"
          aria-label="Clients"
          className="relative overflow-hidden rounded-[1.5rem] border border-line bg-sunken shadow-card"
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
              <ClientBackdrop backdrop={backdrop} priority={active === 0} />
            </motion.div>
          </AnimatePresence>

          {/* Legibility, in two passes: a vertical lift for the copy block and a
              left-hand wash so the type never sits on a bright patch.

              Retuned when the photographs came out. These were set for a bright
              subject that could land anywhere in frame; the compositions cap their
              accents at 0.22 over near-black and carry their own vignette, so the
              scrims only need to deepen the two zones the copy actually occupies.
              Held at the point where the dimmest type on the section — the
              white/55 eyebrow over the brightest bloom — still clears 4.5:1. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/22 to-black/34" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/48 via-black/4 to-transparent" />
        </div>

        {/* ---- content -------------------------------------------------- */}
        <div className="relative flex min-h-[31rem] flex-col px-5 py-10 sm:min-h-[35rem] sm:px-8 sm:py-12 lg:min-h-[38rem]">
          <div className="mx-auto max-w-[42rem] text-center">
            <div className="flex items-center justify-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 rounded-full bg-accent-indigo"
              />
              <span className="font-mono text-eyebrow uppercase text-white/55">
                Clients
              </span>
            </div>
            <h2 className="display mt-5 text-display-sm text-white">
              The startups and scale-ups we recruit for
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-sm leading-relaxed text-white/65 sm:text-base">
              Go-to-market, technical, executive and legal hiring for
              high-growth VC and PE-backed startups and scale-ups.
            </p>
          </div>

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
                      aria-label={`Show ${entry.company.name}`}
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
                            : "text-white opacity-45 group-hover:opacity-75",
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
                  y: COPY_SPRING,
                  opacity: { duration: 0.38, ease: EASE },
                }}
                className="max-w-[34rem]"
              >
                <p className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white/55">
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 rounded-full bg-accent-indigo"
                  />
                  {story.relationship}
                </p>

                <h3 className="display mt-4 text-[1.75rem] leading-[1.15] text-white sm:text-[2.125rem] lg:text-[2.5rem]">
                  {story.company}
                </h3>

                <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/70 sm:text-base">
                  {story.sector}
                </p>

                <Link
                  href={FALLBACK_HREF}
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
    </Reveal>
  );
}
