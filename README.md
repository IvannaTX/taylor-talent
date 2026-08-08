# Taylor Talent Partners — Astro + TypeScript

Preview site: [taylor-talent.vercel.app](https://taylor-talent.vercel.app/)

Three design directions live in this repo, all Astro + TypeScript:

- `/` — **Aurora** (current landing page): dark-first, indigo/purple/blue gradient, Home / For Companies / For Leaders. This is what's live at the root route.
- `/companies`, `/leaders` — Aurora's dedicated audience pages.
- `/paper-record` — earlier warm-editorial direction (was previously `/`).
- `/ink-ledger` — earlier dark monospace direction.

## Run it
```
npm install
npm run dev
```

## Aurora structure

- `src/data/aurora.ts` — all Aurora copy/stats/data, typed.
- `src/components/aurora/*` — one component per section.
- `src/layouts/AuroraLayout.astro` — head, fonts, background orbs, theme + reveal script mounts.
- `src/scripts/theme.ts` — dark/light/system toggle, persists to `localStorage` (`ttp-theme-pref`).
- `src/scripts/reveal.ts` — shared scroll-reveal (also used by paper-record/ink-ledger).

### Removing the Search Process section
`src/components/aurora/SearchProcess.astro` is fully standalone. To remove it, delete its import and `<SearchProcess />` usage from `src/pages/index.astro` and/or `src/pages/companies.astro`. Nothing else depends on it.

## To do before shipping
- Replace `auroraLinks.bookCall` / `.email` in `src/data/aurora.ts` with a real scheduler URL.
- Confirm `/paper-record` and `/ink-ledger` should stay live, or unlink/remove them if not.
