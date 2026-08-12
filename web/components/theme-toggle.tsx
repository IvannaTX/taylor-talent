"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

/**
 * Three-state segmented control. The active pill is a shared layout element, so
 * it slides between segments instead of cross-fading.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => setMounted(true), []);

  // Paint the colour tokens across a short window so the theme change reads as
  // a crossfade rather than a hard cut.
  const select = (value: string) => {
    if (!reduce) {
      const root = document.documentElement;
      root.classList.add("theme-anim");
      window.setTimeout(() => root.classList.remove("theme-anim"), 520);
    }
    setTheme(value);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        "relative inline-flex items-center gap-0.5 rounded-pill border border-line bg-surface/70 p-1 backdrop-blur-md",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        // Before hydration `theme` is undefined; render unselected to keep the
        // server and client markup identical.
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => select(value)}
            className={cn(
              "relative grid h-7 w-8 place-items-center rounded-pill transition-colors duration-300 ease-apple",
              active ? "text-ink" : "text-faint hover:text-muted",
            )}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-pill bg-raised ring-grad"
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 34 }
                }
              />
            )}
            <Icon className="relative h-[0.9rem] w-[0.9rem]" strokeWidth={1.9} />
          </button>
        );
      })}
    </div>
  );
}
