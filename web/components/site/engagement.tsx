import { engagementModels } from "@/lib/copy";
import { Section, SectionHead } from "@/components/ui/kit";
import { Reveal } from "@/components/motion/reveal";

/**
 * Engagement models.
 *
 * Retained and contingency, described structurally. No fee percentage,
 * guarantee window or replacement term appears here — those belong in the signed
 * recruiter agreement, and stating them on a marketing page would commit to
 * language that has not been confirmed.
 */
export function EngagementModels() {
  return (
    <Section id="engagement-models">
      <SectionHead
        eyebrow={engagementModels.eyebrow}
        title={engagementModels.title}
        lede={engagementModels.lede}
      />

      <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {engagementModels.models.map((model, index) => (
          <Reveal key={model.id} delay={index * 0.07} className="h-full">
            <article
              id={model.id}
              className="card flex h-full scroll-mt-32 flex-col p-6 sm:p-7"
            >
              <h3 className="display text-[1.375rem] leading-tight text-ink">
                {model.name}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {model.body}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {model.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[0.875rem] text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-px w-3 shrink-0 bg-line-strong"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.14}>
        <p className="mt-6 text-[0.8125rem] leading-relaxed text-faint">
          {engagementModels.note}
        </p>
      </Reveal>
    </Section>
  );
}
