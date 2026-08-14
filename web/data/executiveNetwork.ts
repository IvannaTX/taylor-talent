/**
 * Representative leadership profiles for the confidential network showcase.
 * These are deliberately framed as executive archetypes, not active candidates.
 */
export type ExecutiveProfile = {
  id: string;
  title: string;
  practiceArea: string;
  industry: string;
  location: string;
  previously: string[];
  image: { src: string; alt: string };
};

export const executiveProfiles: ExecutiveProfile[] = [
  {
    id: "technology",
    title: "Chief Technology Officer",
    practiceArea: "Technology Leadership",
    industry: "Series C SaaS",
    location: "Austin, TX",
    previously: ["Google", "Snowflake", "Datadog"],
    image: {
      src: "/images/executive-network/cto.webp",
      alt: "Editorial portrait representing a senior technology executive",
    },
  },
  {
    id: "product",
    title: "Chief Product Officer",
    practiceArea: "Product & Strategy",
    industry: "Enterprise Software",
    location: "New York, NY",
    previously: ["Microsoft", "Figma", "Atlassian"],
    image: {
      src: "/images/executive-network/cpo.webp",
      alt: "Editorial portrait representing a senior product executive",
    },
  },
  {
    id: "finance",
    title: "Chief Financial Officer",
    practiceArea: "Finance Leadership",
    industry: "PE-Backed Technology",
    location: "San Francisco, CA",
    previously: ["Apple", "Stripe", "ServiceNow"],
    image: {
      src: "/images/executive-network/cfo.webp",
      alt: "Editorial portrait representing a senior finance executive",
    },
  },
  {
    id: "operations",
    title: "Chief Operating Officer",
    practiceArea: "Operations & Scale",
    industry: "Growth-Stage Marketplace",
    location: "Remote · U.S.",
    previously: ["Indeed", "Airbnb", "Block"],
    image: {
      src: "/images/executive-network/coo.webp",
      alt: "Editorial portrait representing a senior operations executive",
    },
  },
];
