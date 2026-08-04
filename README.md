# Taylor Talent Partners — Astro + TypeScript

Two page directions built from the HTML design:

- `/` — **Paper Record**: warm editorial, Newsreader serif, light background.
- `/ink-ledger` — **Ink Ledger**: dark, IBM Plex Mono, matches the TTP logo mark.

## Run it

```
npm install
npm run dev
```

## Structure

- `src/data/content.ts` — all copy and stats, typed. Edit this file to change page content without touching markup.
- `src/components/paper/*` — sections for the Paper Record direction.
- `src/components/ink/*` — sections for the Ink Ledger direction.
- `src/layouts/*Layout.astro` — shared `<head>`, fonts, page shell per direction.
- `public/images/` — logo mark and founder headshot.

## To do before shipping

- Replace `data.links.email` and `data.links.bookCall` in `src/data/content.ts` with real addresses/scheduler URL.
- Both pages currently use client-side IntersectionObserver + scroll-fallback reveal (see `src/scripts/reveal.ts`), loaded per-page via an inline `<script>`.
