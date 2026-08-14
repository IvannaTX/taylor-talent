import { aboutPhilosophy } from "@/lib/copy";
import { Section, SectionHead } from "@/components/ui/kit";
import { Reveal } from "@/components/motion/reveal";

export function Philosophy() {
  return (
    <Section>
      <SectionHead
        eyebrow={aboutPhilosophy.eyebrow}
        title={aboutPhilosophy.title}
        lede={aboutPhilosophy.lede}
      />
      <div className="mt-10 border-t border-line">
        {aboutPhilosophy.principles.map((principle, index) => (
          <Reveal key={principle.title} delay={index * 0.06}>
            <article className="grid gap-3 border-b border-line py-6 sm:grid-cols-[0.7fr_1.3fr] sm:gap-10">
              <h2 className="display text-xl text-ink">{principle.title}</h2>
              <p className="max-w-prose text-sm leading-relaxed text-muted sm:text-base">{principle.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
