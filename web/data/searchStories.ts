export type SearchStory = {
  id: string;
  title: string;
  description: string;
  metric?: { value: string; label: string };
  visual:
    | {
        type: "image";
        src: string;
        alt: string;
        /**
         * object-position for the crop. The visual panel runs from roughly
         * 1.35:1 on desktop down to ~0.95:1 on mobile, so a 3:2 source loses a
         * third of its width at the narrow end — this is what keeps the people
         * who matter inside the frame rather than trusting dead centre.
         */
        position?: string;
      }
    | { type: "workflow" };
};

export const searchStories: SearchStory[] = [
  {
    id: "white-glove",
    title: "White Glove Support",
    description:
      "White-glove support is delivered by a team of talent acquisition experts, from market mapping through offer acceptance. Clients receive direct senior attention, proactive communication, and a concierge-level experience throughout the search.",
    metric: { value: "100%", label: "Client Satisfaction" },
    visual: {
      type: "image",
      src: "/images/search-stories/white-glove-support.webp",
      alt: "A search partner and a candidate in an unhurried one-to-one conversation, seated in a warm, book-lined lounge",
      /* Two subjects, at ~22% and ~70% across. Both survive the mobile crop
         from centre; the upward bias holds the faces, which sit high in frame. */
      position: "50% 35%",
    },
  },
  {
    id: "leadership-access",
    title: "Exclusive Executive Network",
    description:
      "The best candidates rarely apply online. Long-standing relationships provide access to exceptional executives often unavailable through traditional recruiting.",
    visual: {
      type: "image",
      src: "/images/search-stories/executive-network.webp",
      alt: "A startup leadership team working through a hiring pipeline around a long table, beside a whiteboard in a timber-and-glass office",
      /* The central group spans ~30-72% across and stays whole at every
         breakpoint; only the two figures at the outer edges lose anything. */
      position: "50% 45%",
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
