export type SearchStory = {
  id: string;
  title: string;
  description: string;
  metric?: { value: string; label: string };
  visual: { type: "image"; src: string; alt: string } | { type: "workflow" };
};

export const searchStories: SearchStory[] = [
  {
    id: "white-glove",
    title: "White Glove Support",
    description:
      "Every executive search is personally led by Jarod Taylor—from market mapping through offer acceptance—with direct senior attention, proactive communication, and a concierge-level experience.",
    metric: { value: "100%", label: "Client Satisfaction" },
    visual: {
      type: "image",
      src: "/images/search-stories/white-glove-support-v2.webp",
      alt: "Search partner and company leader reviewing a brief in a bright private meeting",
    },
  },
  {
    id: "leadership-access",
    title: "Exclusive Executive Network",
    description:
      "The best candidates rarely apply online. Long-standing relationships provide access to exceptional executives often unavailable through traditional recruiting.",
    visual: {
      type: "image",
      src: "/images/search-stories/leadership-access-v2.webp",
      alt: "Two leadership archetypes in a discreet editorial-style conversation",
    },
  },
  {
    id: "faster",
    title: "Exceptional Leaders. Faster.",
    description:
      "A disciplined, transparent search keeps hiring teams informed and reduces time to hire without sacrificing quality.",
    metric: { value: "3×", label: "Faster Hiring" },
    visual: { type: "workflow" },
  },
];
