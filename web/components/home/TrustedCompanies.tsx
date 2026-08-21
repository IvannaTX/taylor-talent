"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { companies, companyRows, type Company } from "@/data/companies";
import { clients, type ClientRecord } from "@/data/clients";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Brand wall.
 *
 * The tiles are deliberately almost invisible: no border, a whisper of fill, and
 * a short row. Everything the eye is meant to catch is the mark itself, so the
 * chrome gets out of the way and the logos carry equal optical weight (see the
 * `optical` table in data/companies.ts).
 */

/** Base logo height in px. Each mark scales from here by its optical factor. */
const LOGO_H = 20;

const NOTCH_SPRING = { type: "spring", stiffness: 420, damping: 32, mass: 0.7 } as const;

/** Every tile in the wall has an entry; the guard is defensive, not a state. */
const recordFor = (company: Company): ClientRecord | undefined =>
  clients[company.name];

function CompanyLogo({ company }: { company: Company }) {
  if (company.wordmark) {
    return (
      <span
        aria-hidden="true"
        className="block font-sans text-[0.9375rem] font-semibold tracking-[0.14em] text-current"
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
        // Height sets perceived weight while the independent width cap keeps
        // long wordmarks from overpowering compact marks.
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
 * Compact card, anchored to the tile it belongs to.
 *
 * Carries only what is verifiable: how Taylor Talent is connected to the company
 * and what that company does. No quote and no named individual appears here
 * unless and until one is supplied in writing and approved for publication.
 */
function RelationshipCard({
  record,
  placement,
}: {
  record: ClientRecord;
  placement: "above" | "below";
}) {
  const above = placement === "above";

  return (
    <motion.aside
      role="status"
      initial={{ opacity: 0, y: above ? 6 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: above ? 4 : -4 }}
      /* Spring on the lift, tween on the fade — a spring on opacity settles too
         slowly and reads as a card that will not commit. */
      transition={{ y: NOTCH_SPRING, opacity: { duration: 0.18 } }}
      className={cn(
        "pointer-events-none absolute left-1/2 z-30 w-60 -translate-x-1/2",
        above ? "bottom-full mb-2.5" : "top-full mt-2.5",
      )}
    >
      <div className="relative rounded-xl border border-line/70 bg-raised/95 p-3.5 shadow-lift backdrop-blur-xl">
        {/* Notch: what turns a floating card into an extension of the tile. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-line/70 bg-raised",
            above ? "-bottom-1 border-b border-r" : "-top-1 border-l border-t",
          )}
        />

        <p className="flex items-center gap-1.5 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-faint">
          <span
            aria-hidden="true"
            className="h-1 w-1 shrink-0 rounded-full bg-accent-indigo"
          />
          {record.relationship}
        </p>

        <p className="mt-2 text-[0.875rem] font-medium leading-none text-ink">
          {record.company}
        </p>

        <p className="mt-2 text-[0.75rem] leading-[1.5] text-muted">
          {record.sector}
        </p>

        {record.url ? (
          <p className="mt-3 flex items-center gap-1 border-t border-line/70 pt-2.5 text-[0.625rem] text-faint">
            {record.url.replace(/^https?:\/\/(www\.)?/, "")}
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </p>
        ) : null}
      </div>
    </motion.aside>
  );
}

function LogoTile({
  company,
  interactive = false,
  dimmed = false,
  active = false,
  placement = "above",
  onEnter,
  onLeave,
}: {
  company: Company;
  interactive?: boolean;
  dimmed?: boolean;
  active?: boolean;
  placement?: "above" | "below";
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  const record = recordFor(company);
  const face = (
    <span
      className={cn(
        "flex w-full items-center justify-center text-muted lg:min-w-0",
        "transition-opacity duration-300 ease-apple",
        active ? "text-ink opacity-100" : dimmed ? "opacity-25" : "opacity-70",
      )}
    >
      <CompanyLogo company={company} />
    </span>
  );

  return (
    <div
      className={cn(
        "relative grid h-[3.25rem] min-w-32 place-items-center rounded-lg px-3 md:min-w-0 lg:px-1.5",
        "transition-[background-color,opacity] duration-300 ease-apple",
        active ? "bg-raised/80" : "bg-surface/45",
      )}
      onMouseEnter={interactive ? onEnter : undefined}
      onMouseLeave={interactive ? onLeave : undefined}
    >
      {/* A real button so the card is reachable by keyboard, not just by hover. */}
      {interactive && record ? (
        <button
          type="button"
          aria-expanded={active}
          aria-label={`${company.name}: ${record.relationship}`}
          onFocus={onEnter}
          onBlur={onLeave}
          onClick={onEnter}
          className="flex w-full items-center justify-center rounded lg:min-w-0"
        >
          {face}
        </button>
      ) : (
        face
      )}

      <AnimatePresence>
        {active && record ? (
          <RelationshipCard record={record} placement={placement} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function DesktopRows() {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <div className="hidden space-y-4 md:block">
      {companyRows.map((row, rowIndex) => {
        const rowCompanies = companies.filter(
          (company) => company.category === row.category,
        );

        return (
          <div key={row.category}>
            {row.category === "current-client" ? (
              <h2
                id="trusted-companies-title"
                className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-faint"
              >
                Current Clients
              </h2>
            ) : (
              <div className="pt-1">
                <h2 className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-faint">
                  In-House Experience
                </h2>
              </div>
            )}

            <div className="mt-2 grid grid-cols-4 gap-2 lg:grid-cols-9 lg:gap-1.5">
              {rowCompanies.map((company) => (
                <LogoTile
                  key={company.name}
                  company={company}
                  interactive
                  active={active === company.name}
                  dimmed={active !== null && active !== company.name}
                  // The top row has no room above it inside the section.
                  placement={rowIndex === 0 ? "below" : "above"}
                  onEnter={() => setActive(company.name)}
                  onLeave={() => setActive(null)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileRows() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-4 md:hidden">
      {companyRows.map((row, rowIndex) => {
        const rowCompanies = companies.filter(
          (company) => company.category === row.category,
        );

        return (
          <div key={row.category}>
            {row.category === "current-client" ? (
              <h2
                id="trusted-companies-title-mobile"
                className="px-5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-faint sm:px-8"
              >
                Current Clients
              </h2>
            ) : (
              <div className="px-5 pt-1 sm:px-8">
                <h2 className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-faint">
                  In-House Experience
                </h2>
              </div>
            )}

            <div
              className="mask-fade-x mt-2 overflow-hidden"
              aria-label={`${row.label}: ${rowCompanies
                .map((company) => company.name)
                .join(", ")}`}
            >
              <motion.div
                aria-hidden="true"
                className="flex w-max"
                animate={
                  reduce
                    ? undefined
                    : { x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }
                }
                transition={{
                  duration: 24 + rowIndex * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[0, 1].map((setIndex) => (
                  <div key={setIndex} className="flex gap-2 pr-2">
                    {rowCompanies.map((company) => (
                      <LogoTile
                        key={`${company.name}-${setIndex}`}
                        company={company}
                      />
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TrustedCompanies() {
  return (
    <section
      aria-label="Company experience"
      /* No overflow clipping: the hover card has to be able to sit outside the
         section. The mobile marquee clips itself. */
      className="relative my-2 rounded-[1.5rem] border border-line/30 bg-surface/20 py-5 sm:py-6"
    >
      <div className="px-5 sm:px-8">
        <Reveal dir="none" blur={false}>
          <DesktopRows />
        </Reveal>
      </div>

      <MobileRows />
    </section>
  );
}
