import { site } from "@/lib/site";

/**
 * Terms of Use and Privacy Policy, as structured content.
 *
 * These are original drafts written for this practice — they describe what the
 * site actually does today (no contact form, no analytics product, one theme
 * value in local storage, scheduling handed off to a third party) rather than
 * boilerplate copied from a template. They are production-quality drafts and
 * are still drafts: have counsel licensed in Texas review both documents, and
 * confirm the effective date, the entity name and the liability cap below,
 * before launch.
 *
 * Content lives here rather than in MDX so the pages stay a single rendering
 * path: every section is numbered, linkable, and picked up by the table of
 * contents automatically.
 */

/** A paragraph, or a bulleted list. */
export type LegalBlock = string | { list: readonly string[] };

export type LegalSection = {
  /** Anchor target — also the table-of-contents href. */
  id: string;
  title: string;
  blocks: readonly LegalBlock[];
  /** Appends the contact card. Used once, by the closing section. */
  contact?: boolean;
};

export type LegalDoc = {
  slug: "terms" | "privacy";
  eyebrow: string;
  title: string;
  lede: string;
  /** Written out in full — an ISO date in a legal header reads as a build artifact. */
  effective: string;
  updated: string;
  sections: readonly LegalSection[];
  /** The sibling document, linked from the sticky bar and the page foot. */
  sibling: { label: string; href: string };
};

/** The operating entity behind the practice, as it should appear in prose. */
const ENTITY = `${site.legalEntity}, doing business as ${site.name}`;

const EFFECTIVE = "August 13, 2026";

/* ------------------------------------------------------------------ */
/* Terms of Use                                                        */
/* ------------------------------------------------------------------ */

export const terms: LegalDoc = {
  slug: "terms",
  eyebrow: "Legal",
  title: "Terms of Use",
  lede: "What this site is, what it is not, and the limits of what we promise here. Plain terms for a practice that sells judgment rather than software.",
  effective: EFFECTIVE,
  updated: EFFECTIVE,
  sibling: { label: "Privacy Policy", href: "/privacy" },
  sections: [
    {
      id: "agreement",
      title: "Agreement to these terms",
      blocks: [
        `This website is operated by ${ENTITY} (“${site.name},” “we,” “us,” or “our”). By accessing or using ${site.url.replace("https://", "")} and any of its pages, you agree to these Terms of Use.`,
        "If you do not agree with any part of them, please do not use the site. Continuing to use it after we post a revised version means you accept that revision.",
        "These terms govern the website only. Retained executive search, embedded recruiting, and every other service we provide are governed by a separate written agreement signed by both parties. Where a signed agreement and these terms conflict, the signed agreement controls for that engagement.",
      ],
    },
    {
      id: "what-this-site-is",
      title: "What this site is",
      blocks: [
        "This site describes our search practice, the way we run an engagement, and how senior leaders can start a confidential conversation with us. It is informational.",
        "Nothing on it is an offer of employment, an offer to represent you as a candidate, a binding solicitation to enter into a search engagement, or a commitment to fill a role. An engagement begins only when a written agreement is executed.",
      ],
    },
    {
      id: "permitted-use",
      title: "Permitted use",
      blocks: [
        "You may browse the site, read and print its pages for your own reference, and link to it. You may not:",
        {
          list: [
            "Use the site for any unlawful purpose, or in a way that infringes anyone else’s rights.",
            "Scrape, crawl, harvest, or otherwise systematically extract content, contact details, or information about people from the site, whether manually or by automated means.",
            "Use the site’s content to train, fine-tune, or evaluate a machine-learning model without our prior written permission.",
            "Attempt to gain unauthorized access to the site, its servers, or any connected system, or interfere with its normal operation.",
            "Reproduce, republish, or redistribute substantial portions of the site’s content, or present it as your own.",
            "Introduce malicious code, or use anything you find here to send unsolicited commercial messages.",
          ],
        },
        "We may suspend or block access at any time if we believe the site is being used in any of these ways.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      blocks: [
        `The site and everything in it — page copy, layout, design system, graphics, logos, the ${site.name} name and mark, photographs, interface artifacts, and the underlying code — is owned by ${site.legalEntity} or licensed to us, and is protected by United States and international copyright, trademark, and other intellectual property laws.`,
        "We grant you a limited, revocable, non-exclusive, non-transferable license to view and use the site for personal or internal business purposes. No other rights are granted, expressly or by implication.",
        "You may quote a short excerpt with attribution and a link back to the source page. Any other use — reproduction, adaptation, distribution, public display, or the creation of derivative works — requires our written permission.",
        "Third-party marks that appear on the site, including the names and logos of companies we have worked with, remain the property of their respective owners and are used for identification only. Their appearance is not an endorsement of us by them.",
      ],
    },
    {
      id: "what-you-send-us",
      title: "Information you send us",
      blocks: [
        "If you email us, book a call, or send us a résumé, biography, or other material, you confirm that you have the right to share it and that it is accurate to the best of your knowledge.",
        "We treat information from senior leaders as confidential and do not present anyone to a client without that person’s explicit approval. How we handle personal information is set out in our Privacy Policy.",
        "Please do not send us information belonging to someone else, trade secrets, or material covered by a confidentiality obligation you owe to a third party.",
        "Unsolicited business proposals, and unsolicited candidate submissions from other search firms or agencies, are not accepted. Sending them creates no obligation on our part of any kind, including any obligation to pay a fee, and no confidential or agency relationship.",
      ],
    },
    {
      id: "no-employment-guarantee",
      title: "No employment guarantee",
      blocks: [
        "Using this site, sending us your background, speaking with us, or being considered for a search does not create an employment relationship, an agency relationship, or a promise of any kind — between you and us, or between you and any client of ours.",
        "We do not guarantee that we will present you to a client, that a client will interview you, that you will receive an offer, or that any role described to you will stay open, funded, or scoped as described. Hiring decisions belong to the hiring company alone.",
        "We are not the employer for the roles we search. Compensation, benefits, and every condition of employment are set by the hiring company and are a matter between that company and the person it hires.",
      ],
    },
    {
      id: "no-search-guarantee",
      title: "No recruiting or search-outcome guarantee",
      blocks: [
        "Executive search depends on market conditions, timing, compensation, internal alignment, and the decisions of individual people. We commit to process, judgment, and effort. We do not commit to an outcome.",
        "Nothing on this site guarantees that a search will result in a placement, that a placed executive will succeed or stay for any period, or that any timeline, response rate, or figure shown here will be repeated in your search.",
        "Examples, metrics, and timelines on this site are illustrative of how we work. They describe past or representative engagements and are not a prediction of your results. Any guarantee, replacement provision, or service level that applies to your engagement appears in your signed agreement — not here.",
      ],
    },
    {
      id: "no-advice",
      title: "No professional advice",
      blocks: [
        "The content here is general information about executive search and hiring. It is not legal, tax, employment-law, financial, or compensation advice, and it is not a substitute for advice from a qualified professional who knows your situation.",
      ],
    },
    {
      id: "third-party-links",
      title: "Third-party links and services",
      blocks: [
        "This site links to destinations we do not control — most notably the third-party provider that hosts the booking page for discovery calls, and our profile on LinkedIn.",
        "We are not responsible for the content, availability, security, accuracy, or practices of those services. A link is not an endorsement. When you follow one you leave this site, and that service’s terms and privacy policy govern what happens there.",
        "Please read the terms and privacy notice of any third-party service before giving it your information.",
      ],
    },
    {
      id: "availability",
      title: "Availability and changes to the site",
      blocks: [
        "This site is a working description of a live practice. Its content — including examples, roles, and figures — may be updated, corrected, or removed at any time without notice.",
        "We do not warrant that the site will be available without interruption or free of errors. Access may be suspended for maintenance or discontinued entirely at our discretion.",
      ],
    },
    {
      id: "warranties",
      title: "Disclaimer of warranties",
      blocks: [
        "The site is provided “as is” and “as available.” To the fullest extent permitted by law, we disclaim all warranties of any kind, express or implied, including implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement, and any warranty arising from a course of dealing or usage of trade.",
        "We do not warrant that the site will meet your requirements, that its content is accurate, complete, or current, or that the site or the servers that deliver it are free of viruses or other harmful components.",
        "Some jurisdictions do not allow the exclusion of certain warranties, so parts of this section may not apply to you.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of liability",
      blocks: [
        `To the fullest extent permitted by law, ${site.legalEntity}, ${site.name}, and their owners, officers, employees, contractors, and agents will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any lost profits, lost revenue, lost business opportunity, lost data, or loss of goodwill, arising out of or relating to your use of — or inability to use — this site. That applies whether the claim is based in contract, tort, negligence, strict liability, or any other theory, and even if we were advised that such damages were possible.`,
        "Our total aggregate liability for all claims relating to this site will not exceed one hundred United States dollars (US $100).",
        "This section applies to the website. Liability arising from a signed engagement is governed by that agreement instead.",
        "Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages, so parts of this section may not apply to you.",
      ],
    },
    {
      id: "indemnification",
      title: "Indemnification",
      blocks: [
        `You agree to indemnify and hold harmless ${site.legalEntity}, ${site.name}, and their owners, officers, employees, contractors, and agents from any claim, demand, loss, liability, or expense — including reasonable attorneys’ fees — arising out of your use of the site, your breach of these terms, or your violation of the rights of any third party.`,
      ],
    },
    {
      id: "governing-law",
      title: "Governing law and venue",
      blocks: [
        "These Terms of Use, and any dispute arising out of or relating to them or to this site, are governed by the laws of the State of Texas, without regard to its conflict-of-laws principles.",
        "The exclusive venue for any such dispute is the state or federal courts located in Travis County, Texas, and you consent to the personal jurisdiction of those courts.",
        "If any provision of these terms is held unenforceable, it will be limited or severed to the minimum extent necessary and the rest will remain in full force. Our failure to enforce a provision is not a waiver of it.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [
        "We revise these terms as the practice, the site, or the law changes. When we do, we update the effective date at the top of this page. Material changes are reflected here rather than sent individually.",
        "The version posted on this page at the time you use the site is the version that applies to you.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      contact: true,
      blocks: [
        "Questions about these terms reach Jarod Taylor directly. There is no shared inbox and no ticket queue.",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Privacy Policy                                                      */
/* ------------------------------------------------------------------ */

export const privacy: LegalDoc = {
  slug: "privacy",
  eyebrow: "Legal",
  title: "Privacy Policy",
  lede: "What we collect when you visit this site or start a conversation with us, why we collect it, how long we keep it, and what you can ask us to do with it.",
  effective: EFFECTIVE,
  updated: EFFECTIVE,
  sibling: { label: "Terms of Use", href: "/terms" },
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        `${ENTITY} operates this website. This policy explains how we handle personal information collected through the site and through the conversations that follow from it.`,
        "Two facts shape everything below. First, this is a small senior practice — what you send reaches Jarod Taylor rather than a sales team. Second, discretion is the product: a senior leader exploring a move cannot have that exploration leak. So we do not share a person’s information with a client without that person’s explicit approval, and we do not sell personal information to anyone.",
        "This policy covers the website and our search practice. It does not cover the independent practices of the third-party services we link to.",
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      blocks: [
        "We collect what a search conversation actually requires, and little else. In practice it falls into four groups:",
        {
          list: [
            "Information you give us directly — your name, email address, phone number, employer, role, background, compensation expectations, references, and whatever else you choose to include when you write to us or speak with us.",
            "Information generated by a search — the notes, assessments, interview feedback, and scheduling details created while an engagement is running.",
            "Technical information — the IP address, browser and device type, referring page, and pages viewed that any web server records when a page is requested.",
            "A preference stored on your device — currently one value recording whether you chose the light or dark version of this site.",
          ],
        },
        "We do not ask for, and do not want, government identification numbers, financial account details, health information, or any other sensitive category of personal information through this website. Please do not send them.",
      ],
    },
    {
      id: "contact-forms",
      title: "Contact forms and correspondence",
      blocks: [
        "This site does not host a contact form. It publishes a direct email address, and email sent to it arrives in Jarod Taylor’s mailbox.",
        "If we add a form later, it will collect the fields shown on the form itself, that information will be used to answer your inquiry, and this policy will be updated before the form goes live.",
        "When you write to us we keep the message and what is in it, so we can respond, hold the context of the conversation, and pick it up later if the timing is not right today. You can ask us to delete it at any point.",
      ],
    },
    {
      id: "scheduling",
      title: "Scheduling requests",
      blocks: [
        "Discovery calls are booked through a third-party scheduling provider, on a page that provider hosts. When you book, you give that provider the information its form requests — typically your name, email address, and the time you selected — and it passes the booking details to us.",
        "We receive the confirmation, any notes you include, and the calendar invitation. The provider processes the booking under its own privacy policy and may set its own cookies on the page it hosts. We do not control that page.",
        "Calls take place on a standard video meeting platform. We do not record a discovery call without telling you beforehand and getting your agreement.",
      ],
    },
    {
      id: "candidate-information",
      title: "Candidate and client information",
      blocks: [
        "Information about senior leaders is confidential by default:",
        {
          list: [
            "Nothing goes to a client without your explicit, case-by-case approval. Approving one introduction does not approve the next.",
            "We do not post your profile to a job board, add you to a public database, or circulate your background to companies you have not agreed to.",
            "We do not sell, rent, or trade personal information, and we do not share it with advertisers or data brokers.",
            "If you are not moving now, we can keep a light record of what you would consider — or delete everything. Your choice, and you can change it later.",
          ],
        },
        "Information a client gives us about a role, its compensation, or its internal context is treated as that client’s confidential information and is used only to run the search.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technologies",
      blocks: [
        "This site does not use advertising cookies, tracking pixels, or cross-site trackers, and it does not show a consent banner because it does not need one.",
        "It stores a single preference in your browser’s local storage: the theme you selected. That value stays on your device, is readable only by this site, and is never sent to us. Clearing your browser storage removes it and the site returns to its default appearance.",
        "Third-party pages we link to — the scheduling provider and LinkedIn — set their own cookies once you are on them, governed by their policies rather than this one.",
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      blocks: [
        "We do not currently run a third-party analytics or advertising product on this site.",
        "Our hosting provider keeps standard server logs — requests, timestamps, IP addresses, and error information — which are used to keep the site running and secure. They are not used to build a profile of you.",
        "If we later add privacy-respecting, aggregate analytics, it will be to understand which pages get read and where visitors arrive from, not to identify individuals. We will update this policy and its effective date before turning it on.",
      ],
    },
    {
      id: "third-party-services",
      title: "Third-party services",
      blocks: [
        "A handful of providers process information on our behalf, in these categories:",
        {
          list: [
            "Website hosting and content delivery — serving the pages you are reading.",
            "Scheduling — hosting the booking page for discovery calls.",
            "Email, calendar, and video meetings — receiving your messages and running the conversations.",
            "Document and file storage — holding search materials while an engagement is live.",
          ],
        },
        "We choose providers we consider reputable and give each one only what it needs to do its job. Each processes information under its own terms and privacy policy. None of them is authorized to use your information for their own marketing.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      blocks: [
        "We use what we collect to:",
        {
          list: [
            "Answer your message and continue the conversation.",
            "Run and complete a search engagement — calibration, market mapping, outreach, assessment, references, and offer negotiation.",
            "Introduce you to a specific opportunity, with your approval, each time.",
            "Keep enough context that a conversation resumed months later does not start over.",
            "Operate, secure, and improve this website.",
            "Meet our legal, tax, and recordkeeping obligations.",
          ],
        },
        "We do not use your information for automated decision-making. A person reads what you send and decides what to do with it.",
      ],
    },
    {
      id: "sharing",
      title: "When we share information",
      blocks: [
        "We share personal information in four situations and no others:",
        {
          list: [
            "With a client, when you have approved that specific introduction.",
            "With the service providers above, to the limited extent each needs it.",
            "When the law requires it — in response to a valid legal request, or to establish, exercise, or defend a legal claim.",
            "In connection with a sale or reorganization of the practice, in which case the recipient would be bound by this policy or one at least as protective, and the change would be noted here.",
          ],
        },
        "We do not sell personal information and have never done so. We do not share personal information for cross-context behavioral advertising.",
      ],
    },
    {
      id: "data-retention",
      title: "Data retention",
      blocks: [
        "We keep information only as long as it serves the purpose it was collected for, or as long as the law requires:",
        {
          list: [
            "Active search materials — for the length of the engagement and a reasonable period afterward, so references, guarantees, and follow-up questions can be answered.",
            "Candidate conversations — for as long as the relationship is live. Where a conversation goes quiet, we review it periodically and delete what no longer serves a purpose.",
            "Correspondence — retained with our business records.",
            "Contracts, invoices, and tax records — for the period required by law, typically seven years.",
            "Server logs — for the short window our hosting provider retains them.",
          ],
        },
        "When information is no longer needed we delete it, or strip the details that identify you.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights and choices",
      blocks: [
        "Wherever you live, you can ask us to:",
        {
          list: [
            "Tell you what information we hold about you.",
            "Give you a copy of it.",
            "Correct anything wrong or out of date.",
            "Delete it.",
            "Stop contacting you — permanently, or until you say otherwise.",
            "Limit how we use it, or object to a particular use.",
          ],
        },
        "Email us and we will respond within thirty days. We will not treat you differently for asking. Deleting your information does not remove you from consideration for a role you are actively pursuing, though it may mean we no longer hold what the search requires.",
        "Residents of Texas, California, and other states with comprehensive privacy laws, and individuals in the United Kingdom and the European Economic Area, may have additional statutory rights — including the right to appeal a refused request and the right to complain to a supervisory authority. We honor these requests for everyone rather than checking where you live first.",
        "We may need to verify your identity before acting on a request, and we may have to decline where the law requires us to keep a record.",
      ],
    },
    {
      id: "security",
      title: "Security",
      blocks: [
        "The site is served over an encrypted connection. Search materials are held in access-controlled accounts protected by multi-factor authentication, and access is limited to the people working on the engagement.",
        "No system is perfectly secure, and no one can promise that a transmission over the internet is immune to interception. If a breach affects your personal information, we will notify you and any required authority as the law requires.",
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        "This site is intended for business use by adults. It is not directed to children, and we do not knowingly collect information from anyone under sixteen. If you believe a child has sent us information, email us and we will delete it.",
      ],
    },
    {
      id: "international",
      title: "Visitors outside the United States",
      blocks: [
        `We operate from ${site.location}, and the information we hold is processed and stored in the United States. Privacy laws here may differ from those where you live. By sending us information, you understand that it will be handled in the United States under this policy.`,
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        "We update this policy when our practices, our providers, or the law change. The effective date at the top of the page always reflects the current version.",
        "If a change materially affects how we handle information you have already given us, we will say so here — and where we have a live conversation with you, we will tell you directly.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      contact: true,
      blocks: [
        "Privacy questions, and requests about your own information, reach Jarod Taylor directly.",
      ],
    },
  ],
};
