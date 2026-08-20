"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import { Fingerprint } from "lucide-react";
import SectionHeading, { SectionWatermark } from "@/components/ui/SectionHeading";
import ChaosToOrder from "@/components/ui/ChaosToOrder";
import { stackCategories } from "@/data/stack";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function About() {
  const { locale, t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const paragraphs = textRef.current?.querySelectorAll("p");
      if (paragraphs?.length) {
        gsap.from(paragraphs, {
          y: 14,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 82%", once: true },
        });
      }

      const flow = sectionRef.current?.querySelector("[data-chaos-flow]");
      if (flow) {
        gsap.from(flow, {
          y: 18,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: flow, start: "top 88%", once: true },
        });
      }

      const groups = stackRef.current?.querySelectorAll("[data-stack-group]");
      if (!groups?.length) return;
      gsap.from(groups, {
        y: 16,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: stackRef.current, start: "top 82%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [locale] }
  );

  return (
    <section ref={sectionRef} id="about" className="relative mx-auto max-w-6xl px-6 py-20 md:py-28 lg:px-8">
      <SectionWatermark icon={Fingerprint} />
      <SectionHeading
        key={locale}
        index="01"
        label="whoami --verbose"
        title={t.about.title}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <div
            ref={textRef}
            lang={locale}
            className="space-y-4 text-justify hyphens-auto text-[15px] leading-relaxed text-fg/85 md:text-base"
          >
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ChaosToOrder />
        </div>

        <div ref={stackRef} className="relative z-10 space-y-5">
          {stackCategories.map(({ id, icon: Icon, items }) => (
            <div key={id} data-stack-group>
              <div className="mb-2 flex items-center gap-2">
                <Icon size={14} strokeWidth={1.75} className="text-accent" />
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {t.about.stack[id]}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface-deep px-2 py-0.5 text-[11px] text-fg/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
