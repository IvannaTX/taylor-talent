/**
 * Representative leadership profiles for the network showcase.
 *
 * Deliberately framed as role archetypes, not active candidates — no profile
 * describes a real person, and no photograph on this site is of anyone we have
 * placed or represent.
 *
 * Titles span the recruiting domains rather than sitting entirely at C-suite,
 * because the practice is not executive-only. That claim used to be made in this
 * comment and contradicted by the content: all four profiles were C-suite, all
 * four photographed the same way. The four added below sit at senior-IC,
 * director and function-head level, which is also where the range in age, dress
 * and setting naturally lives.
 *
 * PHOTOGRAPHY. Each profile carries a `brief`, which is the art direction for
 * its slot. It stays here after the asset lands so a replacement can be matched
 * to the same intent rather than re-derived, and so the set can be audited as a
 * set — the failure mode being eight photographs that individually pass and
 * collectively read as one person in one room.
 *
 * `image: null` means the brief is written and the asset is not in the repo yet.
 * The carousel renders only profiles that have one, so this file can carry the
 * full roster ahead of the photography without shipping empty cards. Nothing is
 * ever reused to fill a gap: see data/imagery.ts.
 */
export type ExecutiveProfile = {
  id: string;
  title: string;
  practiceArea: string;
  industry: string;
  location: string;
  previously: string[];
  /** Art direction for this slot. Read data/imagery.ts for the shared axes. */
  brief: string;
  /** null until the asset exists. Never filled by borrowing another slot's. */
  image: { src: string; alt: string } | null;
};

export const executiveProfiles: ExecutiveProfile[] = [
  {
    id: "engineering",
    title: "VP of Engineering",
    practiceArea: "Technical & Engineering",
    industry: "Series C SaaS",
    location: "Austin, TX",
    previously: ["Google", "Snowflake", "Datadog"],
    brief:
      "Composed, mid-40s, dark tailoring, low-key boardroom. Held as the set's formal anchor — but flagged for replacement, since the range it sits in is the one the rest of the set exists to break.",
    image: {
      src: "/images/executive-network/cto.webp",
      alt: "Editorial portrait representing an engineering leader",
    },
  },
  {
    id: "revenue",
    title: "Chief Revenue Officer",
    practiceArea: "Go-to-Market",
    industry: "Enterprise Software",
    location: "New York, NY",
    previously: ["Rippling", "Gong", "Klaviyo"],
    brief:
      "Mid-50s, open-collar shirt under a blazer, warm lobby. The most relaxed of the four originals; keep the posture, lose the blazer on replacement.",
    image: {
      src: "/images/executive-network/coo.webp",
      alt: "Editorial portrait representing a revenue leader",
    },
  },
  {
    id: "product",
    title: "Head of Product",
    practiceArea: "Executive Search",
    industry: "Growth-Stage Marketplace",
    location: "Remote · U.S.",
    previously: ["Microsoft", "Figma", "Atlassian"],
    brief:
      "Early-50s, knit under a blazer, dim library. Flagged for replacement toward a working setting — a product lead reads better mid-work than mid-portrait.",
    image: {
      src: "/images/executive-network/cpo.webp",
      alt: "Editorial portrait representing a product leader",
    },
  },
  {
    id: "operations",
    title: "Senior Director, Operations",
    practiceArea: "Executive Search",
    industry: "PE-Backed Technology",
    location: "San Francisco, CA",
    previously: ["Indeed", "Airbnb", "Block"],
    brief:
      "Mid-50s, charcoal suit, seated at a boardroom table against a city window. The most formal frame in the set; keep exactly one like it, not four.",
    image: {
      src: "/images/executive-network/cfo.webp",
      alt: "Editorial portrait representing an operations leader",
    },
  },

  /* ---- added with the photography brief; assets pending -------------- */

  {
    id: "staff-engineer",
    title: "Staff Software Engineer",
    practiceArea: "Technical & Engineering",
    industry: "Seed-Stage Infrastructure",
    location: "Remote · U.S.",
    previously: ["Stripe", "Vercel", "Supabase"],
    brief:
      "Late 20s. Hoodie or plain tee, no jacket anywhere in frame. Daylight, high-key — the brightest photograph in the set. Candid and mid-thought at a desk with a whiteboard behind, not addressing the camera. Tight-to-mid framing. Deliberately the least corporate frame here: a senior individual contributor, not a manager.",
    image: null,
  },
  {
    id: "warehouse-operations",
    title: "Director of Warehouse Operations",
    practiceArea: "Executive Search",
    industry: "Logistics & Freight",
    location: "Memphis, TN",
    previously: ["Pallet", "Flexport", "XPO"],
    brief:
      "Sixties, and visibly so — the set currently stops at about 55. Hi-vis vest over a flannel shirt, hard hat in hand rather than worn. Environmental wide on a distribution-centre floor, daylight through high windows, racking legible behind. The one frame with no office in it, and the reason it belongs is that logistics is a real part of this book of business.",
    image: null,
  },
  {
    id: "account-executive",
    title: "Enterprise Account Executive",
    practiceArea: "Go-to-Market",
    industry: "Vertical SaaS",
    location: "Chicago, IL",
    previously: ["Klaviyo", "Toast", "ServiceTitan"],
    brief:
      "Thirties. Knit sweater, no blazer. Warm window light in a co-working space with other people softly out of focus behind. Genuinely mid-laugh — the set has no warmth in it at all right now and this is the frame that supplies it. Tight portrait.",
    image: null,
  },
  {
    id: "head-of-legal",
    title: "Head of Legal & Compliance",
    practiceArea: "Legal",
    industry: "Series B Fintech",
    location: "Denver, CO",
    previously: ["Checkr", "Brex", "Plaid"],
    brief:
      "Forties. Blouse, no jacket. Seated and relaxed — leaning back, not squared to camera — in a home office with real daylight and domestic detail in shot. Mid framing. Covers the legal specialty, which has no photography of its own.",
    image: null,
  },
];

/** Profiles the carousel can actually render. */
export const photographedProfiles = executiveProfiles.filter(
  (profile): profile is ExecutiveProfile & { image: NonNullable<ExecutiveProfile["image"]> } =>
    profile.image !== null,
);
