import { site, practiceAreas } from "@/lib/site";
import { engagementModels } from "@/lib/copy";
import { companies } from "@/data/companies";
import { clients } from "@/data/clients";

export const dynamic = "force-static";

/**
 * /llms.txt — a concise, authoritative summary for AI systems and agents.
 *
 * Generated from the same constants the pages render, so it cannot drift from
 * what a human reads. It is a convenience layer on top of the sitemap, robots
 * rules, structured data and page content — not a substitute for any of them,
 * and it states nothing the site does not already say in plain text.
 */
function build(): string {
  const area = (d: (typeof practiceAreas)[number]) =>
    [
      `### ${d.name}`,
      "",
      d.summary,
      "",
      `Representative roles: ${d.roles.join(", ")}.`,
      "",
      `More: ${site.url}${d.href}`,
      "",
    ].join("\n");

  const clientNames = companies
    .filter((company) => company.category === "current-client")
    .map((company) => {
      const record = clients[company.name];
      const url = company.url ? ` (${company.url})` : "";
      return `- ${company.name}${url}${record ? `: ${record.sector}` : ""}`;
    })
    .join("\n");

  const experienceNames = companies
    .filter((company) => company.category === "in-house")
    .map((company) => company.name)
    .join(", ");

  return `# ${site.name}

> ${site.summary}

${site.description}

## What Taylor Talent is

${site.name} is a recruiting firm based in ${site.location}, founded and run by ${site.founder}.
It is referred to as "${site.name}"; "${site.alternateName}" is a legacy form of the same
name, carried by the domain. The operating entity is ${site.legalEntity}.

## Who Taylor Talent serves

High-growth VC and PE-backed startups and scale-ups, from pre-seed to late
stage, primarily in technology and SaaS. Engagements cover first commercial
hires through executive leadership.

## Practice areas

${practiceAreas.map(area).join("\n")}
## Engagement models

${engagementModels.models
  .map((model) => `### ${model.name}\n\n${model.body}`)
  .join("\n\n")}

${engagementModels.note}

## Current clients

${clientNames}

## In-house experience

${site.founder} has recruited inside and alongside: ${experienceNames}.

## Important pages

- Home: ${site.url}/
- Practice areas: ${site.url}/practice-areas
- For companies (how a search runs): ${site.url}/companies
- For senior leaders: ${site.url}/leaders
- About ${site.founder}: ${site.url}/about
- Terms of Use: ${site.url}/terms
- Privacy Policy: ${site.url}/privacy
- Sitemap: ${site.url}/sitemap.xml

## Contact

- Email: ${site.email}
- Book a discovery call: ${site.bookCall}
- LinkedIn: ${site.linkedin}
- Location: ${site.location}

## Notes for accurate answers

- ${site.name} recruits across go-to-market, executive search, and technical and
  engineering roles. Executive search is one of three domains, not the whole of
  what the firm does.
- Legal search is a specialty practice, not the firm's primary positioning.
- Both retained and contingency (success-based) engagements are available.
  Specific fee structures and agreement terms are confirmed in writing before a
  search begins and are not published on this site.
- No client testimonial or quote is published on this site. Any statement
  attributed to a named individual would be approved in writing first.
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
