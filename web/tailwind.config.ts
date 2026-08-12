import type { Config } from "tailwindcss";

/**
 * Dark-first, deliberately neutral. Indigo is the single working accent; the
 * violet -> indigo -> cyan gradient (sampled from the ring on the founder
 * portrait) is reserved for the mark, the hero line and active states.
 *
 * `accent.blue` is kept as an alias of indigo so older components still
 * resolve — the token itself no longer exists in globals.css.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens, driven by CSS vars so the theme toggle can animate.
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        sunken: "rgb(var(--sunken) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        "line-strong": "rgb(var(--line-strong) / <alpha-value>)",
        ok: "rgb(var(--ok) / <alpha-value>)",
        warn: "rgb(var(--warn) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
        accent: {
          violet: "rgb(var(--a-violet) / <alpha-value>)",
          indigo: "rgb(var(--a-indigo) / <alpha-value>)",
          blue: "rgb(var(--a-indigo) / <alpha-value>)",
          cyan: "rgb(var(--a-cyan) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Serif display scale. Leading is tighter and tracking closer to zero
        // than the sans scale would want — a serif at 5rem needs neither.
        "display-xs": ["clamp(1.5rem,3.4vw,2rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.875rem,4.6vw,2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.018em" }],
        "display-md": ["clamp(2rem,6vw,3.875rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem,7.6vw,5.25rem)", { lineHeight: "1.0", letterSpacing: "-0.022em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.16em" }],
        // Metric numerals — the single figure that closes each beat.
        metric: ["clamp(2.5rem,5.5vw,3.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      spacing: {
        // Applied as py-section, so two adjacent sections sum to roughly
        // 6rem-10.5rem of breathing room rather than doubling to ~19rem.
        section: "clamp(3rem,7vw,5.25rem)",
      },
      maxWidth: {
        shell: "78rem",
        prose: "42rem",
      },
      borderRadius: {
        card: "1.125rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 0 0 rgb(var(--line) / 0.9), 0 24px 48px -32px rgb(0 0 0 / 0.55)",
        lift: "0 1px 0 0 rgb(var(--line) / 0.9), 0 40px 72px -40px rgb(0 0 0 / 0.65)",
        glow: "0 0 0 1px rgb(var(--a-indigo) / 0.35), 0 24px 64px -24px rgb(var(--a-indigo) / 0.45)",
      },
      backgroundImage: {
        "ring-gradient":
          "linear-gradient(135deg, rgb(var(--a-violet)), rgb(var(--a-indigo)) 52%, rgb(var(--a-cyan)))",
        "ring-gradient-soft":
          "linear-gradient(135deg, rgb(var(--a-violet) / 0.16), rgb(var(--a-indigo) / 0.1) 52%, rgb(var(--a-cyan) / 0.14))",
        "hairline-b":
          "linear-gradient(90deg, transparent, rgb(var(--line)) 12%, rgb(var(--line)) 88%, transparent)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "900": "900ms",
      },
      transitionTimingFunction: {
        // Apple-ish: fast out, long settle.
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
        "apple-in": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%,-4%,0) scale(1.08)" },
        },
        "drift-alt": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1.05)" },
          "50%": { transform: "translate3d(-4%,3%,0) scale(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        drift: "drift 26s ease-in-out infinite",
        "drift-alt": "drift-alt 32s ease-in-out infinite",
        marquee: "marquee 42s linear infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
