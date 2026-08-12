# Taylor Talent Partners

Preview site: [taylor-talent.vercel.app](https://taylor-talent.vercel.app/) —
currently deploying the Astro app at the repo root. Point Vercel's root directory
at `web/` to deploy the Next.js site.

Two apps live in this repo:

| Path   | Stack                                                | Purpose                        |
| ------ | ---------------------------------------------------- | ------------------------------ |
| `web/` | Next.js 15 (App Router), Tailwind, Framer Motion, TS | **Current site** — active      |
| `src/` | Astro + TypeScript                                   | Earlier directions, preserved  |

---

## `web/` — the site

Dark-first, serif-led, built so the whole page reads as the marketing surface for
Jarod's Paraform booking flow.

```
cd web
npm install
npm run dev      # http://localhost:3100
npm run build
npm run typecheck
```

> `next dev` and `next build` must not run at the same time in this directory —
> they share `.next`, and the dev server will clobber the production vendor
> chunks. That surfaces later as a 500 with `Cannot find module
> './vendor-chunks/…'`. Stop one before starting the other, or `rm -rf .next`.

### Homepage architecture

The spine is two **beat runs**, one per audience. Inside a run, the artifact
column is pinned on desktop and cross-fades between stages as you scroll the copy
beside it — one persistent surface that morphs through the whole story of a
search, rather than a series of unrelated cards. On mobile nothing pins: each beat
renders its own artifact directly beneath its copy and the page simply stacks.

```
Hero ─ serif claim + live search console + provenance
  │
For companies ─ 5 beats, artifact pinned RIGHT
  01 Calibration  → calibration brief      → "Week 1"
  02 Market map   → coverage + pass reasons → "100%"
  03 Shortlist    → candidate cards         → "3–5"
  04 Evaluation   → interview scorecard     → "24 hrs"
  05 Offer/close  → offer tracker           → "One"
  │
References ─ placeholder quotes
  │
For leaders ─ 3 beats, artifact pinned LEFT
  Confidential → redacted record  → "Zero"
  Approval     → intro request    → "You"
  Trajectory   → three moves      → "3 moves"
  │
Practice areas ─ dense index (functions / levels / sectors)
Who you work with ─ facts table + portrait
Book a Discovery Call ─ scheduler preview beside the CTA
```

Every beat is `claim + artifact + exactly one metric`. That one-metric constraint
is what stops the page becoming a wall of claims.

The closing **scheduler artifact** is the point of the whole design. It mirrors
Jarod's actual Paraform page — his avatar, "30 min", Google Meet, and a month-grid
calendar — so picking a day and time here and clicking through is a continuation
rather than a new context. The month is real: it is computed client-side after
mount, with weekends and past dates unavailable. Server render and first hydration
both use `booking.referenceMonth` in `lib/candidates.ts`, which keeps the two
markups identical and avoids a hydration mismatch.

If the real booking page changes (duration, platform, host), update `booking` in
`lib/candidates.ts` to match.

### Where things live

- `lib/site.ts` — links + SEO. **`site.bookCall` drives every CTA on the site**,
  including the scheduler artifact. It is set to
  `https://www.paraform.com/cal/jarod`; because it is an http(s) URL, `Button`
  and the scheduler open it in a new tab with `rel="noopener noreferrer"`
  automatically.
- `lib/copy.ts` — all copy, including the beat definitions and their metrics.
- `lib/candidates.ts` — the illustrative data behind the artifacts.
- `components/artifacts/` — the interface pieces (`chrome`, `console`, `company`,
  `leader`, `scheduler`). Original UI built in code, not screenshots, so it
  themes and animates.
- `components/beats/run.tsx` — the pinned-and-morphing run.
- `components/site/` — hero, proof, practice, jarod, finale, footer, provenance.
- `components/ui/kit.tsx` — `Section`, `SectionHead`, `DisplayHead`, `Metric`.
- `components/archive/` + `/archive/v1` — the previous homepage, noindex, not
  imported by anything live.

### Candidate photography

`lib/candidates.ts` has a `photo` field per candidate, currently `null`. While it
is null the avatar renders a designed monogram; set it to a path under
`public/images/candidates/` to use a photograph instead. One line per candidate —
see `components/artifacts/chrome.tsx` → `Avatar`.

The monogram hue is hashed from the name but **constrained to 205–285°** (blue
through violet). That keeps avatars inside the brand family, and it is a contrast
requirement: across the full hue wheel the yellows land at 2.74:1 against white
initials, while inside this band the worst case is 4.94:1.

### Visual identity

Dark-first, cool neutrals, and indigo as the single working accent. The
violet → indigo → cyan gradient (sampled from the ring on the founder portrait) is
reserved for the mark, the hero's second line, and active states — never large
fills. Status hues (`ok`, `warn`) exist because the artifacts need them: a
scorecard without a pass colour is just grey boxes.

Headlines are set in **Newsreader** (serif), body in Inter, and eyebrows, indices
and figures in JetBrains Mono. The serif is what separates an editorial voice from
a generic SaaS one.

### Four invariants worth knowing

**1. Motion components must not branch their rendered output on
`useReducedMotion()`.** It resolves differently on the server than on the first
client render, so using it to pick `initial` / `animate` / `style`
hydration-mismatches for every visitor with reduce-motion enabled. Reduced motion
is handled once, globally, by `<MotionConfig reducedMotion="user">` in
`components/motion/config.tsx`. Where a scroll-linked value genuinely has to vary,
flatten the *output range* so the value at progress 0 — what the server renders —
is identical either way (see `Parallax`, `Hero`).

**2. Custom font sizes must be registered with tailwind-merge.** `cn()` in
`lib/utils.ts` extends the `font-size` group with `text-display-*` and
`text-eyebrow`. Without that, tailwind-merge reads them as text *colours* and
`cn("text-display-lg", "text-ink")` silently drops the size.

**3. A `grid` needs an explicit base column count.** `grid gap-4 lg:grid-cols-3`
has no columns below `lg`, so it falls back to an implicit `auto` track whose
**min-content floor** lets dense children push the document wider than the
viewport. Always write `grid-cols-1` alongside the breakpoint variant. This was
the cause of a real 25px horizontal overflow at 320px.

**4. Rotate SVG shapes in CSS or in the attribute, never both.** An SVG
`transform="rotate(a cx cy)"` attribute plus a CSS `transform-origin` applies the
centre twice and displaces the shape. See `components/wordmark.tsx`.

### Verified

- No horizontal overflow at 320 / 390 / 834 / 1440px, in both themes.
- No hydration or console errors, including under `prefers-reduced-motion: reduce`.
- The pinned artifact stays inside its stage for all five company beats (never
  clipped by the header, never overflowing the viewport), and each run pins on its
  intended side with the artifact in sync with the active beat.
- Text contrast meets WCAG AA in both themes. Two cases sit on gradients, so an
  automated `background-color` check cannot see them; both were verified
  numerically — CTA text ≥5.45:1 against the worst gradient stop, avatar monograms
  ≥4.94:1 across every hue the hash can produce. Anything on a solid
  `bg-accent-indigo` fill must use `text-on-accent`, not `text-white`: the
  dark-theme indigo is bright enough that white on it is only 3.3:1.
- All five booking CTAs (nav, hero, finale, footer, scheduler strip) resolve to
  the Paraform URL and carry `target="_blank" rel="noopener noreferrer"`.
- All routes prerender static; ~105 kB shared JS.

### To do before shipping

- Replace the three placeholder references in `lib/copy.ts` → `proof.quotes`.
  They render with a visible "Placeholder" chip and a dashed company plate until
  then.
- Optionally add candidate photography (see above).
- Confirm `site.url` matches the production domain — OG tags and the sitemap use it.

---

## `src/` — earlier Astro directions

Kept for reference; still runnable from the repo root.

```
npm install
npm run dev
```

- `/` — Ink (dark monospace direction)
- `/aurora` — Aurora (indigo/purple gradient direction)
- `/companies`, `/leaders` — Aurora audience pages
- `/paper-record` — warm editorial direction
- `/ink-ledger` — same as `/`

Structure: `src/data/*.ts` for copy, `src/components/<direction>/*` per section,
`src/layouts/*.astro` for head/fonts/background, `src/scripts/theme.ts` for the
theme toggle (`localStorage` key `ttp-theme-pref`), `src/scripts/reveal.ts` for
scroll reveal.
