"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function Experience({ embedded = false }: { embedded?: boolean }) {
  const { locale, t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      const line = lineRef.current;
      const wrap = wrapRef.current;
      if (!line || !wrap) return;

      const dots = wrap.querySelectorAll<HTMLElement>("[data-xp-dot]");

      if (prefersReducedMotion()) {
        gsap.set(line, { strokeDashoffset: 0 });
        dots.forEach((dot) =>
          gsap.set(dot, { backgroundColor: "#e8332a", borderColor: "#e8332a" })
        );
        return;
      }

      // Линия timeline прорисовывается по мере скролла (stroke-dashoffset + scrub)
      gsap.fromTo(
        line,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 72%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      wrap.querySelectorAll<HTMLElement>("[data-xp-item]").forEach((item) => {
        gsap.from(item, {
          x: 48,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 78%", once: true },
        });

        const dot = item.querySelector<HTMLElement>("[data-xp-dot]");
        if (!dot) return;
        // маркер "загорается" красным, когда линия доходит до него
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          onEnter: () =>
            gsap.to(dot, {
              backgroundColor: "#e8332a",
              borderColor: "#e8332a",
              scale: 1.3,
              boxShadow: "0 0 18px rgba(232,51,42,0.55)",
              duration: 0.4,
            }),
          onLeaveBack: () =>
            gsap.to(dot, {
              backgroundColor: "#08080a",
              borderColor: "#6e6b67",
              scale: 1,
              boxShadow: "0 0 0 rgba(232,51,42,0)",
              duration: 0.4,
            }),
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={embedded ? undefined : "experience"}
      className={
        embedded
          ? "relative mx-auto max-w-6xl px-6 pb-8 pt-2 lg:px-8"
          : "relative mx-auto max-w-6xl px-6 py-28 md:py-40 lg:px-8"
      }
    >
      {!embedded && (
        <SectionHeading key={locale} index="03" label="career --log --reverse" title={t.experience.title} />
      )}

      <div ref={wrapRef} className="relative pl-8 md:pl-16">
        {/* Вертикальная линия timeline */}
        <svg
          className="absolute left-2 top-0 h-full w-[2px] md:left-6"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <line
            ref={lineRef}
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="#e8332a"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        </svg>

        {experience.map(({ id, company, role, period, current, bullets, stack }) => (
          <article
            key={id}
            data-xp-item
            className="relative mb-12 rounded-2xl border border-line bg-surface-deep p-7 transition-colors duration-300 last:mb-0 hover:border-accent/40 md:p-9"
          >
            {/* маркер на линии */}
            <span
              data-xp-dot
              className="absolute -left-[29px] top-10 block h-3 w-3 rounded-full border-2 md:-left-[45px]"
              style={{ backgroundColor: "#08080a", borderColor: "#6e6b67" }}
              aria-hidden
            />

            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-fg md:text-xl">{role[locale]}</h3>
                {/* [TODO: можно заменить] — компания вымышленная */}
                <p className="mt-1 font-mono text-sm text-accent">{company}</p>
              </div>
              <span
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-wide ${
                  current
                    ? "border-accent/50 text-accent"
                    : "border-line text-muted"
                }`}
              >
                {period[locale]}
              </span>
            </div>

            <ul className="space-y-3">
              {bullets[locale].map((bullet, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                  <span className="mt-[9px] block h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
