/**
 * Illustrative data for the interface artifacts.
 *
 * Everything here is fictional, including the company names — invented rather
 * than borrowed, so no artifact implies a real person worked at a real firm.
 *
 * `photo` is the drop-in point for licensed candidate photography: put files in
 * `public/images/candidates/` and set the path here. While it is null the
 * avatar renders a designed monogram, so the artifacts look finished either way.
 * See components/artifacts/chrome.tsx -> Avatar.
 */
export type Candidate = {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  /** e.g. "/images/candidates/aw.jpg" — null renders the monogram fallback. */
  photo: string | null;
  /** 0-100 against the calibrated profile. */
  fit: number;
  stage: "Shortlisted" | "Final round" | "Offer out" | "Screened";
  /** The deliberate friction: what might not work about this person. */
  reservation: string;
  signals: { label: string; pass: boolean }[];
};

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Amara Whitfield",
    title: "VP Engineering",
    company: "Northwind Systems",
    location: "Austin, TX",
    photo: null,
    fit: 94,
    stage: "Final round",
    reservation: "Has never reported to a founder-CEO directly.",
    signals: [
      { label: "Scaled 40 → 120 eng", pass: true },
      { label: "Platform re-architecture", pass: true },
      { label: "Comp inside band", pass: true },
      { label: "On-site 3 days", pass: false },
    ],
  },
  {
    id: "c2",
    name: "Daniel Osei",
    title: "Head of Platform",
    company: "Verity Labs",
    location: "Remote — EST",
    photo: null,
    fit: 88,
    stage: "Shortlisted",
    reservation: "Wants a title bump we have not scoped.",
    signals: [
      { label: "Infra at scale", pass: true },
      { label: "Hired 6 staff+ eng", pass: true },
      { label: "Comp inside band", pass: true },
      { label: "Prior VP title", pass: false },
    ],
  },
  {
    id: "c3",
    name: "Priya Raghunathan",
    title: "Director of Engineering",
    company: "Cadence Health",
    location: "Chicago, IL",
    photo: null,
    fit: 86,
    stage: "Shortlisted",
    reservation: "Regulated-industry background only.",
    signals: [
      { label: "Ran 5 teams", pass: true },
      { label: "Compliance depth", pass: true },
      { label: "Relocating to Austin", pass: true },
      { label: "Startup stage fit", pass: false },
    ],
  },
  {
    id: "c4",
    name: "Marcus Lindqvist",
    title: "VP Engineering",
    company: "Meridian Freight",
    location: "Austin, TX",
    photo: null,
    fit: 81,
    stage: "Screened",
    reservation: "Two short tenures in a row.",
    signals: [
      { label: "0 → 1 experience", pass: true },
      { label: "Local", pass: true },
      { label: "Tenure pattern", pass: false },
      { label: "Comp inside band", pass: false },
    ],
  },
];

/** The live search the hero console is showing. */
export const activeSearch = {
  role: "VP Engineering",
  client: "Series B · Infrastructure",
  location: "Austin, TX · Hybrid",
  band: "$310k–$360k + 0.4–0.7%",
  opened: "Day 18",
  stages: [
    { label: "Mapped", count: 214, done: true },
    { label: "Contacted", count: 96, done: true },
    { label: "Screened", count: 31, done: true },
    { label: "Shortlist", count: 4, done: true },
    { label: "Final", count: 2, done: false },
    { label: "Offer", count: 0, done: false },
  ],
};

/** Coverage rows for the market-map artifact. */
export const marketMap = {
  total: 214,
  segments: [
    { label: "Engaged", count: 96, tone: "ok" as const },
    { label: "Passed — comp", count: 47, tone: "warn" as const },
    { label: "Passed — stage", count: 38, tone: "warn" as const },
    { label: "No reply", count: 33, tone: "muted" as const },
  ],
  passes: [
    { reason: "Comp band 12% under market for this title", count: 47 },
    { reason: "Not open to Series B after Series D", count: 38 },
    { reason: "Hybrid requirement, wanted fully remote", count: 21 },
  ],
};

/** Calibration brief for the first beat. */
export const calibration = {
  role: "VP Engineering",
  verdict: "Hireable with one change",
  flag: "Comp band is 12% under market for this title in Austin. Raise the ceiling or widen to Director-level with a promotion path.",
  musts: [
    "Has scaled an org past 100 engineers",
    "Owned a platform re-architecture end to end",
    "Comfortable reporting to a founder-CEO",
  ],
  nice: ["Infrastructure or developer-tools background", "Austin-based or relocating"],
  not: ["Big-tech only, no startup exposure", "Never hired above senior level"],
};

/** Scorecard for the evaluation beat. */
export const scorecard = {
  candidate: "Amara Whitfield",
  round: "Round 3 of 4 · Panel",
  submitted: "Written debrief filed 4 hrs after the round",
  criteria: [
    { label: "Org design & scaling", score: 4, max: 4 },
    { label: "Technical judgement", score: 4, max: 4 },
    { label: "Hiring & retention", score: 3, max: 4 },
    { label: "Founder partnership", score: 3, max: 4 },
    { label: "Communication", score: 4, max: 4 },
  ],
  note: "Strongest on scaling evidence. The founder-partnership score is the one to probe in round 4 — she has always had a layer above her.",
};

/** Offer tracker for the closing beat. */
export const offer = {
  candidate: "Amara Whitfield",
  status: "Verbal accepted",
  items: [
    { label: "Base", value: "$345,000", done: true },
    { label: "Equity", value: "0.55%, 4yr / 1yr cliff", done: true },
    { label: "References", value: "3 of 3 complete", done: true },
    { label: "Counter-offer", value: "Declined — handled", done: true },
    { label: "Notice period", value: "4 weeks", done: true },
    { label: "Start date", value: "Confirmed", done: false },
  ],
};

/** Leader-side artifacts. */
export const leaderProfile = {
  name: "Your profile",
  visibility: "Visible to: nobody",
  fields: [
    { k: "Current company", v: "Withheld until you approve" },
    { k: "Comp expectation", v: "Withheld until you approve" },
    { k: "Notes from our calls", v: "Private to Jarod" },
  ],
  footnote: "Nothing here is in a client system, an ATS, or a shared pipeline.",
};

export const introRequest = {
  company: "Series B · Developer tools",
  role: "VP Engineering",
  band: "$310k–$360k + 0.4–0.7%",
  why: "Your platform re-architecture at Northwind is the exact problem in front of them.",
  reveals: "Nothing is sent until you choose Approve.",
};

export const trajectory = [
  { when: "Now", what: "Director, 40 engineers", state: "current" as const },
  { when: "Next", what: "VP at Series B — org-building scope", state: "target" as const },
  { when: "After", what: "CTO track, or VP at scale", state: "future" as const },
];

/**
 * Booking details for the scheduler artifact that closes the page.
 *
 * These mirror Jarod's actual Paraform page (host name, 30 minutes, Google Meet,
 * month-grid calendar) so clicking through is a continuation rather than a new
 * context. Keep them in sync if the real booking page changes.
 */
export const booking = {
  host: "Jarod Taylor",
  duration: "30 min",
  platform: "Google Meet",
  tz: "CT — Austin",
  times: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"],
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  /**
   * Used for the server render and first hydration only; the component swaps in
   * the real current month in an effect. A fixed reference keeps server and
   * client markup identical, which is what avoids a hydration mismatch.
   */
  referenceMonth: { year: 2026, month: 7, day: 12 },
};
