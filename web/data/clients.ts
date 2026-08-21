/**
 * Client and experience relationships, keyed by company name.
 *
 * Replaces the earlier testimonials file. Nothing here is attributed to a named
 * individual and nothing states a placement count, a tenure or an outcome,
 * because none of that has been supplied or approved. What each record carries
 * is verifiable: the nature of the relationship, and a one-line description of
 * what the company itself does, taken from the company's own public positioning.
 *
 * A quote may only be added here once it exists in writing, with the speaker's
 * name, title and approval to publish.
 *
 * Consumed by both the brand wall (components/home/TrustedCompanies.tsx) and the
 * client showcase (components/home/CustomerStories.tsx), so the two surfaces can
 * never disagree about who a client is.
 *
 * The showcase carries no photography. Each client is fronted by its own
 * Monterey-inspired composition from lib/backdrops.ts — earlier revisions of
 * this file pointed four clients at the executive-network portraits, which put
 * the same stock stranger behind two different companies and behind a role
 * archetype elsewhere on the same page.
 */

import type { BackdropId } from "@/lib/backdrops";

export type ClientRecord = {
  company: string;
  /** How Taylor Talent is connected to this company. */
  relationship: "Current client" | "In-house experience";
  /** What the company does, in its own terms. Not a claim about our work. */
  sector: string;
  url?: string;
  /**
   * Presence of a backdrop is what puts a company in the client showcase, in
   * the order it appears in data/companies.ts. Never a photograph — see the
   * note at the top of the file.
   */
  backdrop?: BackdropId;
};

const client = (
  company: string,
  sector: string,
  url: string,
  /**
   * Omit where no composition has been generated for this client yet. The record
   * still carries the brand wall; only the showcase reads `backdrop`, and
   * pointing two clients at one composition is what the note above forbids.
   */
  backdrop?: BackdropId,
): ClientRecord => ({
  company,
  relationship: "Current client",
  sector,
  url,
  backdrop,
});

const experience = (company: string, sector: string): ClientRecord => ({
  company,
  relationship: "In-house experience",
  sector,
});

export const clients: Record<string, ClientRecord> = {
  /* ---- Current clients ------------------------------------------- */

  Palantir: client(
    "Palantir",
    "Enterprise software for data integration and decision-making.",
    "https://www.palantir.com",
    "dusk-ridge",
  ),

  Rippling: client(
    "Rippling",
    "Workforce management software across HR, IT and finance.",
    "https://www.rippling.com",
    "bloom",
  ),

  Pallet: client(
    "Pallet",
    "Software for logistics and freight operations.",
    "https://www.pallet.com",
    "sweep",
  ),

  Decagon: client(
    "Decagon",
    "AI agents for customer support.",
    "https://decagon.ai",
    "folds",
  ),

  Scale: client(
    "Scale",
    "Data infrastructure and evaluation for AI development.",
    "https://scale.com",
    "nightfall",
  ),

  Loancrate: client(
    "Loancrate",
    "Cloud loan origination software for mortgage lending.",
    "https://www.loancrate.com",
    "valley",
  ),

  Humaans: client(
    "Humaans",
    "HR information system for growing companies.",
    "https://humaans.io",
    "drift",
  ),

  Highlight: client(
    "Highlight",
    "AI assistant that coordinates knowledge across a team's people and tools.",
    "https://highlightai.com",
  ),

  Basis: client(
    "Basis",
    "AI agent platform for accounting firms.",
    "https://www.getbasis.ai",
  ),

  /* ---- In-house experience ---------------------------------------- */

  Apple: experience("Apple", "Consumer technology and devices."),
  Google: experience("Google", "Search, cloud and consumer technology."),
  Indeed: experience("Indeed", "Global job marketplace and hiring platform."),
  GLG: experience("GLG", "Expert network and primary research."),
  Sierra: experience("Sierra", "Conversational AI agents for customer-facing teams."),
  Checkr: experience("Checkr", "Background screening infrastructure."),
  DISCO: experience("DISCO", "Legal technology for ediscovery and case management."),
  Swap: experience("Swap", "Operations platform for ecommerce brands."),
  Talentful: experience("Talentful", "Embedded talent partner for technology companies."),
};
