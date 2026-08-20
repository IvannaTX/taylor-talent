/**
 * Representative leadership profiles for the Leadership Search showcase.
 *
 * These are role archetypes, not active candidates. The people in the imagery
 * are stock or generated models and are not represented by Taylor Talent.
 * Every profile owns one unique 3:4 image; data/imagery.ts records its source
 * and the imagery audit prevents a photograph from being reused in another
 * slot.
 */
export type ExecutiveProfile = {
  id: string;
  title: string;
  practiceArea: string;
  industry: string;
  location: string;
  previously: string[];
  /** Persistent art direction for this slot and any future replacement. */
  brief: string;
  image: { src: string; alt: string };
};

export const executiveProfiles: ExecutiveProfile[] = [
  {
    id: "chief-technology-officer",
    title: "Chief Technology Officer",
    practiceArea: "Technical Recruiting",
    industry: "Series C SaaS",
    location: "Austin, TX",
    previously: ["Google", "Snowflake", "Datadog"],
    brief:
      "Late-40s technology executive in rolled shirt sleeves and clear-frame glasses, photographed in high-key daylight beside a glass architecture wall. Bright, composed, and deliberately free of formal tailoring.",
    image: {
      src: "/images/executive-network/chief-technology-officer-v2.webp",
      alt: "Technology leadership",
    },
  },
  {
    id: "chief-product-officer",
    title: "Chief Product Officer",
    practiceArea: "Product & Design",
    industry: "Enterprise AI",
    location: "San Francisco, CA",
    previously: ["Microsoft", "Figma", "Atlassian"],
    brief:
      "Early-50s product executive in a textured knit polo, working with a physical prototype in a daylight product studio. Environmental and mid-task rather than posed.",
    image: {
      src: "/images/executive-network/clay-shoe-guy.png",
      alt: "Product leadership",
    },
  },
  {
    id: "vp-engineering",
    title: "VP of Engineering",
    practiceArea: "Technical Recruiting",
    industry: "Cloud Infrastructure",
    location: "Seattle, WA",
    previously: ["Cloudflare", "HashiCorp", "Confluent"],
    brief:
      "Late-30s engineering leader in an indigo overshirt and glasses, captured mid-explanation at a technical whiteboard in a bright collaborative workspace.",
    image: {
      src: "/images/executive-network/mug-guy.png",
      alt: "Engineering leadership",
    },
  },
  {
    id: "vp-customer-success",
    title: "VP of Customer Success",
    practiceArea: "Go-to-Market",
    industry: "Vertical SaaS",
    location: "Denver, CO",
    previously: ["Rippling", "Gong", "Klaviyo"],
    brief:
      "Early-40s customer leader in a dress without a blazer, seated in a lived-in home office with soft morning daylight. Relaxed, warm, and conversational.",
    image: {
      src: "/images/executive-network/blue-dress.png",
      alt: "Customer success leadership",
    },
  },
  {
    id: "vp-gtm",
    title: "VP, Go-to-Market",
    practiceArea: "Go-to-Market",
    industry: "Growth-Stage Software",
    location: "New York, NY",
    previously: ["Salesforce", "Toast", "ServiceTitan"],
    brief:
      "Early-30s go-to-market leader in rust-colored knitwear, captured mid-laugh in a warm coworking space. Tight, candid framing supplies energy and personality.",
    image: {
      src: "/images/executive-network/vp-gtm-v2.webp",
      alt: "Go-to-market leadership",
    },
  },
  {
    id: "head-of-product",
    title: "Head of Product",
    practiceArea: "Product & Design",
    industry: "Growth-Stage Marketplace",
    location: "Remote · U.S.",
    previously: ["Adobe", "Notion", "Airbnb"],
    brief:
      "Mid-50s product leader in knitwear and a single tailored layer, standing in a library-like workspace. Retained as one of the set's two formal anchors.",
    image: {
      src: "/images/executive-network/cpo.webp",
      alt: "Product leadership",
    },
  },
  {
    id: "senior-director-operations",
    title: "Senior Director, Operations",
    practiceArea: "Operations & Logistics",
    industry: "PE-Backed Technology",
    location: "Chicago, IL",
    previously: ["Indeed", "Airbnb", "Block"],
    brief:
      "Mid-50s operations leader seated beside a city window in formal tailoring. The set's composed boardroom anchor and its only seated formal portrait.",
    image: {
      src: "/images/executive-network/sr-dir.png",
      alt: "Operations leadership",
    },
  },
  {
    id: "talent-acquisition",
    title: "Director of Talent Acquisition",
    practiceArea: "Talent & People",
    industry: "Technolgy",
    location: "Charlotte, NC",
    previously: ["Pallet", "Wise", "Red Ventures"],
    brief:
      "Talent acquisition leader",
    image: {
      src: "/images/executive-network/warehouse-woman.png",
      alt: "VP leadership",
    },
  },
  {
    id: "staff-engineer",
    title: "Staff Software Engineer",
    practiceArea: "Technical Recruiting",
    industry: "Seed-Stage Infrastructure",
    location: "Remote · U.S.",
    previously: ["Stripe", "Vercel", "Supabase"],
    brief:
      "Late-20s senior individual contributor in a hoodie, focused at a workstation in a bright office. Tight, candid framing and the least corporate styling in the set.",
    image: {
      src: "/images/executive-network/staff-software-engineer-pexels.webp",
      alt: "Senior technical contributor archetype focused at a workstation in a bright office",
    },
  },
  {
    id: "technical-lead",
    title: "Principal Technical Lead",
    practiceArea: "Technical Recruiting",
    industry: "Data Platform",
    location: "Boston, MA",
    previously: ["AWS", "Databricks", "MongoDB"],
    brief:
      "Early-30s technical lead in a patterned headscarf, speaking beside a whiteboard and laptop in a bright working session. A natural headwear and side-profile frame.",
    image: {
      src: "/images/executive-network/technical-lead-pexels.webp",
      alt: "Technical leadership archetype speaking beside a whiteboard during a working session",
    },
  },
];
