/**
 * Image inventory and provenance registry.
 *
 * Two jobs:
 *
 *   1. INVENTORY. Every image slot on the site, and which file fills it. The
 *      rule this enforces is that no photograph serves two slots — the site
 *      previously put one boardroom photograph behind two named clients and one
 *      role archetype on the same page, which is the kind of thing that is
 *      invisible in a diff and obvious on the page. scripts/audit-imagery.ts
 *      checks it, so the rule is enforced rather than merely stated.
 *
 *   2. PROVENANCE. Where each file came from. A client-facing recruiting site
 *      should not carry unattributed photographs of people, and nothing in this
 *      repo recorded it before.
 *
 * Unknown is recorded as unknown. The six photographs inherited here carry no
 * EXIF, IPTC or XMP, no licence file accompanied them, and the commits that
 * introduced them say nothing about their source — so the commit is recorded,
 * because that much is verifiable, and the source is not guessed.
 */

export type Provenance =
  | {
      kind: "generated";
      /** What produced it, specifically enough to reproduce. */
      by: string;
      on: string;
      note?: string;
    }
  | {
      kind: "licensed";
      source: string;
      license: string;
      url: string;
      addedOn: string;
    }
  | {
      kind: "unknown";
      /** Short hash of the commit that introduced the file. */
      firstCommit: string;
      note: string;
    };

const UNATTRIBUTED =
  "Origin not recorded. No embedded metadata, no accompanying licence, and the introducing commit does not say. Treat as unlicensed until confirmed; flagged for replacement under the current brief.";

export const provenance: Record<string, Provenance> = {
  /* ---- generated: the client showcase backdrops --------------------- */
  ...Object.fromEntries(
    [
      "dusk-ridge",
      "bloom",
      "sweep",
      "folds",
      "nightfall",
      "valley",
      "drift",
    ].map((id) => [
      `/images/client-backdrops/${id}.webp`,
      {
        kind: "generated",
        by: "scripts/generate-backdrops.ts (procedural; spec in lib/backdrops.ts)",
        on: "2026-08-19",
        note: "Deterministic — the same spec produces the same bytes. Not photographic and depicts no person.",
      } satisfies Provenance,
    ]),
  ),

  /* ---- company marks sourced from their own sites ------------------- */
  "/logos/companies/sierra.svg": {
    kind: "licensed",
    source: "Sierra — inline header mark on sierra.ai",
    license:
      "Trademark of Sierra. Used to identify an existing client relationship (nominative use); not a claim of endorsement. Normalised to its own viewBox for the mask pipeline; artwork unaltered.",
    url: "https://sierra.ai",
    addedOn: "2026-08-19",
  },
  "/logos/companies/swap.svg": {
    kind: "licensed",
    source: "Swap — /Wordmark.svg on www.swap-commerce.com",
    license:
      "Trademark of Swap. Used to identify an existing client relationship (nominative use); not a claim of endorsement. Normalised to its own viewBox for the mask pipeline; artwork unaltered.",
    url: "https://www.swap-commerce.com",
    addedOn: "2026-08-19",
  },

  /* ---- inherited photographs: origin unknown ----------------------- */
  "/images/executive-network/cto.webp": { kind: "unknown", firstCommit: "0fb1882", note: UNATTRIBUTED },
  "/images/executive-network/coo.webp": { kind: "unknown", firstCommit: "0fb1882", note: UNATTRIBUTED },
  "/images/executive-network/cpo.webp": { kind: "unknown", firstCommit: "0fb1882", note: UNATTRIBUTED },
  "/images/executive-network/cfo.webp": { kind: "unknown", firstCommit: "0fb1882", note: UNATTRIBUTED },
  "/images/search-stories/white-glove.webp": { kind: "unknown", firstCommit: "3dfa4e3", note: UNATTRIBUTED },
  "/images/search-stories/leadership-network.webp": { kind: "unknown", firstCommit: "3dfa4e3", note: UNATTRIBUTED },
  "/images/founder.png": {
    kind: "unknown",
    firstCommit: "8b1c255",
    note: "Origin not recorded. Unlike the stock photography this is a portrait of the founder, so the likeness is presumably supplied and authorised — but that is an assumption, not a record. Confirm and replace this entry.",
  },
};

/* ---- the shared art direction -------------------------------------- */

/**
 * The axes the photography is briefed against, and the reason each one is on the
 * list. Every axis here failed on the inherited set: six photographs, one look —
 * dark tailoring, ages 40 to 55, dim glass-and-dark-wood interiors, low-key
 * light, all composed and squared to camera. Cultural range was the only axis
 * that varied, and varying one axis is what makes the other seven conspicuous.
 *
 * A photograph satisfying the brief is not the test. The set satisfying it is.
 */
export const artDirectionAxes = [
  ["age", "Must include under-30 and over-60. The inherited set spans roughly 40 to 55 and nothing else."],
  ["clothing", "At most half the set in tailoring. Knitwear, shirt sleeves, hi-vis and workwear, a blouse without a jacket, a hoodie."],
  ["environment", "Not all offices. A distribution-centre floor, a co-working space, a home office. Daylight in most of them."],
  ["body type", "Vary build and height. The inherited set is one silhouette."],
  ["hairstyle", "Vary length, texture and colour, including grey worn as grey."],
  ["framing", "Mix tight portrait, mid and environmental wide. The inherited set is six near-identical mid-shots."],
  ["lighting", "At least two high-key daylight frames against the inherited low-key moodiness."],
  ["personality", "Some frames candid and mid-action — mid-laugh, mid-thought — rather than composed for camera."],
  ["seniority", "Below C-suite as well as at it: a senior IC, a director, a function head."],
] as const;

/* ---- inventory ------------------------------------------------------ */

export type ImageSlot = {
  /** Stable id. Survives the asset being replaced. */
  id: string;
  /** Where it renders. */
  surface: string;
  /** What it depicts. */
  role: string;
  /** Public path, or null when the brief exists and the asset does not. */
  asset: string | null;
  /**
   * Photographs of people. These are what the no-reuse rule governs — the
   * generated backdrops are unique too, but reusing one would be a design
   * choice rather than a stock stranger doing double duty.
   */
  photographic: boolean;
};

const backdrop = (id: string, company: string): ImageSlot => ({
  id: `client-backdrop-${id}`,
  surface: "CustomerStories — client showcase",
  role: `Backdrop for ${company}`,
  asset: `/images/client-backdrops/${id}.webp`,
  photographic: false,
});

const portrait = (id: string, role: string, asset: string | null): ImageSlot => ({
  id: `exec-network-${id}`,
  surface: "ExecutiveNetwork — leadership carousel",
  role,
  asset,
  photographic: true,
});

export const imageSlots: ImageSlot[] = [
  /* Client showcase — generated, one composition per client, no photography. */
  backdrop("dusk-ridge", "Palantir"),
  backdrop("bloom", "Rippling"),
  backdrop("sweep", "Pallet"),
  backdrop("folds", "Decagon"),
  backdrop("nightfall", "Scale"),
  backdrop("valley", "Sierra"),
  backdrop("drift", "Swap Commerce"),

  /* Executive network — four inherited, four briefed and pending. */
  portrait("engineering", "VP of Engineering", "/images/executive-network/cto.webp"),
  portrait("revenue", "Chief Revenue Officer", "/images/executive-network/coo.webp"),
  portrait("product", "Head of Product", "/images/executive-network/cpo.webp"),
  portrait("operations", "Senior Director, Operations", "/images/executive-network/cfo.webp"),
  portrait("staff-engineer", "Staff Software Engineer", null),
  portrait("warehouse-operations", "Director of Warehouse Operations", null),
  portrait("account-executive", "Enterprise Account Executive", null),
  portrait("head-of-legal", "Head of Legal & Compliance", null),

  /* Search stories. Sole users of these two files now that the client showcase
     no longer borrows them. */
  {
    id: "search-story-white-glove",
    surface: "ExecutiveSearchStories",
    role: "White glove support",
    asset: "/images/search-stories/white-glove.webp",
    photographic: true,
  },
  {
    id: "search-story-leadership-access",
    surface: "ExecutiveSearchStories",
    role: "Exclusive executive network",
    asset: "/images/search-stories/leadership-network.webp",
    photographic: true,
  },

  {
    id: "founder-portrait",
    surface: "Jarod — founder section",
    role: "Founder portrait",
    asset: "/images/founder.png",
    photographic: true,
  },
];
