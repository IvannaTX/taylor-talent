"use client";

import { ThemeProvider as NextThemes } from "next-themes";

/**
 * next-themes writes the choice to localStorage ("tt-theme") and resolves
 * "system" against prefers-color-scheme. `enableColorScheme` is off because the
 * palette already sets `color-scheme` per theme class in globals.css.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="tt-theme"
      enableColorScheme={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemes>
  );
}
