"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { jarod } from "@/lib/content";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/motion/reveal";
import founderImg from "@/public/images/founder.png";

export function MeetJarod() {

  return (
    <Section id="jarod">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Portrait — the ring in the artwork is the identity, so it is framed
            rather than cropped. Order flips to first on mobile. */}
        {/* overflow-clip contains the halo's blur on narrow screens; the
            portrait is inset by the halo's width so nothing visible is cut. */}
        <div className="order-1 overflow-clip lg:order-none lg:overflow-visible">
          <Parallax distance={34}>
            <div className="relative mx-auto w-[calc(100%-3rem)] max-w-[20rem] lg:w-full lg:max-w-[24rem]">
              {/* Gradient halo behind the portrait */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full bg-ring-gradient opacity-20 blur-3xl"
              />
              <motion.div
                initial={{ scale: 1.06, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <Image
                  src={founderImg}
                  alt={`${jarod.name}, ${jarod.role} of ${site.name}`}
                  sizes="(min-width: 1024px) 34vw, 88vw"
                  placeholder="blur"
                  priority={false}
                  className="w-full rounded-full"
                />
              </motion.div>

              {/* Location chip, anchored to the portrait */}
              <Reveal delay={0.35} dir="up">
                <div className="mx-auto -mt-4 flex w-fit items-center gap-2 rounded-pill border border-line bg-surface/85 px-4 py-2 backdrop-blur-md ring-grad">
                  <MapPin
                    aria-hidden
                    className="h-3.5 w-3.5 text-accent-cyan"
                    strokeWidth={2}
                  />
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                    {jarod.location}
                  </span>
                </div>
              </Reveal>
            </div>
          </Parallax>
        </div>

        <div>
          <Reveal blur={false}>
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="h-1 w-1 rounded-full bg-ring-gradient" />
              <span className="eyebrow">{jarod.eyebrow}</span>
            </div>
          </Reveal>

          <TextReveal
            as="h2"
            text={jarod.name}
            delay={0.06}
            className="mt-4 text-display-sm font-semibold text-ink"
          />

          <Reveal delay={0.14}>
            <p className="mt-2 font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-accent-blue">
              {jarod.role}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-ink sm:text-lg">
              {jarod.lead}
            </p>
          </Reveal>

          {jarod.body.map((para, i) => (
            <Reveal key={i} delay={0.26 + i * 0.06}>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                {para}
              </p>
            </Reveal>
          ))}

          {/* Track record split into two labelled sets */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              { heading: "In-house", items: jarod.inHouse },
              { heading: "Agency-side", items: jarod.agency },
            ].map((group) => (
              <div key={group.heading}>
                <h3 className="eyebrow">{group.heading}</h3>
                <Stagger className="mt-3.5 flex flex-wrap gap-2" stagger={0.05}>
                  {group.items.map((name) => (
                    <StaggerItem key={name}>
                      <span className="inline-flex rounded-pill border border-line bg-surface px-3.5 py-1.5 text-[0.8125rem] text-muted">
                        {name}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="eyebrow">Functions searched</h3>
            <Stagger className="mt-3.5 flex flex-wrap gap-2" stagger={0.04}>
              {jarod.functions.map((f) => (
                <StaggerItem key={f}>
                  <span className="inline-flex rounded-pill border border-line bg-surface px-3.5 py-1.5 text-[0.8125rem] text-muted transition-colors duration-400 hover:border-accent-blue/45 hover:text-ink">
                    {f}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.14} className="mt-10">
            <Button href={site.linkedin} variant="secondary">
              Jarod on LinkedIn
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
