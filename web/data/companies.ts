export type CompanyCategory = "current-client" | "in-house" | "agency-side";

export type Company = {
  name: string;
  logo: string;
  category: CompanyCategory;
  testimonial: string;
  partnerName: string;
  partnerTitle: string;
  caseStudyUrl: string;
};

/**
 * Company relationships and experience.
 *
 * Testimonial fields intentionally remain empty until approved client copy and
 * attribution are available. TrustedCompanies only renders a partner card for
 * complete, attributed comments, so an endorsement can never be fabricated by
 * the interface.
 */
export const companies: Company[] = [
  { name: "Palantir", logo: "Palantir", category: "current-client", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "Rippling", logo: "RIPPLING", category: "current-client", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "Pallet", logo: "Pallet", category: "current-client", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "Decagon", logo: "DECAGON", category: "current-client", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "Scale", logo: "scale", category: "current-client", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "Apple", logo: "Apple", category: "in-house", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "Google", logo: "Google", category: "in-house", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "Indeed", logo: "indeed", category: "in-house", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "GLG", logo: "GLG", category: "agency-side", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "Checkr", logo: "checkr", category: "agency-side", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "DISCO", logo: "DISCO", category: "agency-side", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
  { name: "Talentful", logo: "talentful", category: "agency-side", testimonial: "", partnerName: "", partnerTitle: "", caseStudyUrl: "" },
];

export const companyRows = [
  { label: "Current Clients", category: "current-client" as const },
  { label: "In-House", category: "in-house" as const },
  { label: "Agency-Side", category: "agency-side" as const },
];
