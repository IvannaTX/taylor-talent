import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge classifies unknown `text-*` values as colours, which made our
 * custom font sizes (`text-display-lg`, `text-eyebrow`) collide with `text-ink`
 * and silently lose. Registering them as font sizes keeps both.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display-sm", "display-md", "display-lg", "eyebrow"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
