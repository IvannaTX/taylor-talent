"use client";

import { provenance } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * Provenance strip.
 *
 * Deliberately NOT framed as "trusted by" — these are the companies Jarod has
 * recruited inside or on behalf of, not clients endorsing the firm. The label
 * says exactly that, and the two groups stay visually separated so the claim
 * cannot be misread.
 *
 * Set as text rather than logos: we do not have licences for these marks, and
 * borrowed logos would be the one dishonest thing on the page.
 */
export function Provenance({ className }: { className?: string }) {
  const groups = [
    { key: "In-house", names: provenance.inHouse },
    { key: "Agency-side", names: provenance.agency },
  ];

  return (
    <div className={cn("", className)}>
      <p className="eyebrow">{provenance.label}</p>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10">
        {groups.map((g) => (
          <div key={g.key} className="min-w-0">
            <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
              {g.key}
            </span>
            <div className="mt-2.5 flex flex-wrap items-baseline gap-x-5 gap-y-2 sm:gap-x-6">
              {g.names.map((n) => (
                <span
                  key={n}
                  className="display text-[1.0625rem] text-muted transition-colors duration-500 hover:text-ink sm:text-[1.25rem]"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
