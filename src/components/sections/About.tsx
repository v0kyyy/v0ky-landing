"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitReveal from "@/components/ui/SplitReveal";
import { stackCategories } from "@/data/stack";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function About() {
  const { locale, t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // stagger-появление категорий стека
      const cards = stackRef.current?.querySelectorAll("[data-stack-card]");
      if (cards?.length) {
        gsap.from(cards, {
          y: 32,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: stackRef.current, start: "top 80%", once: true },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40 lg:px-8">
      <SectionHeading key={locale} index="01" label="whoami --verbose" title={t.about.title} />

      {/* Построчный scrub-reveal: текст проявляется по мере скролла */}
      <div className="max-w-3xl space-y-7">
        {t.about.paragraphs.map((paragraph, i) => (
          <SplitReveal
            key={`${locale}-${i}`}
            as="p"
            mode="lines"
            scrub
            className="text-[clamp(1.1rem,1.9vw,1.5rem)] leading-relaxed text-fg/90"
          >
            {paragraph}
          </SplitReveal>
        ))}
      </div>

      {/* Стек: интерактивная группировка — hover гасит остальные категории.
          Внешний div — цель GSAP-анимации входа (без CSS-transition, иначе
          transition на opacity ломает захват конечных значений from-твина),
          внутренний — hover/dim-эффекты через CSS. */}
      <div ref={stackRef} className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackCategories.map(({ id, icon: Icon, items }) => (
          <div key={id} data-stack-card>
            <div
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className={`h-full rounded-xl border p-6 transition-all duration-400 ${
                hovered === id
                  ? "border-accent/50 bg-surface shadow-[0_0_32px_rgba(232,51,42,0.12)]"
                  : hovered
                    ? "border-line bg-surface-deep opacity-30"
                    : "border-line bg-surface-deep"
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <Icon size={18} strokeWidth={1.75} className="text-accent" />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-fg">
                  {t.about.stack[id]}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line px-2.5 py-1 text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
