"use client";

import { useRef } from "react";
import { Download } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import Magnetic from "@/components/ui/Magnetic";
import SocialLinks from "@/components/ui/SocialLinks";
import TestimonialMarquee from "@/components/ui/marquee-01";
import { site } from "@/data/site";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function Contact() {
  const { locale, t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const revealedRef = useRef(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const heading = headingRef.current;
      const words = heading?.querySelectorAll("[data-word]");
      if (!heading || !words?.length) return;

      if (revealedRef.current) {
        gsap.set(words, { clearProps: "transform" });
        return;
      }

      gsap.from(words, {
        yPercent: 118,
        duration: 0.85,
        stagger: 0.055,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 82%",
          once: true,
          onEnter: () => {
            revealedRef.current = true;
          },
        },
      });
    },
    { scope: sectionRef, dependencies: [locale] }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative mx-auto max-w-6xl px-6 py-28 md:py-40 lg:px-8"
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-sm text-accent">04</span>
        <span className="h-px w-12 bg-accent/40" aria-hidden />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          $ contact --now
        </span>
      </div>

      <h2
        key={locale}
        ref={headingRef}
        className="max-w-4xl font-display text-[clamp(2rem,5.5vw,4.1rem)] font-bold leading-[1.06] text-fg"
      >
        {t.contact.heading.split(" ").map((word, i) => (
          <span key={`${locale}-${i}`} className="mr-[0.28em] inline-block overflow-hidden align-top">
            <span data-word className="hover-word inline-block">
              {word}
            </span>
          </span>
        ))}
      </h2>

      <p className="mt-10 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-dim md:mt-14">
        {t.testimonials.fromKwork}
      </p>
      <div className="mt-3">
        <TestimonialMarquee />
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 md:mt-12">
        <div className="flex items-center gap-3">
          <SocialLinks iconSize={16} />
        </div>
        <Magnetic strength={0.3}>
          <a
            href={site.links.resume}
            download
            className="btn-fill flex items-center gap-2.5 rounded-full border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-wider text-fg"
          >
            <Download size={14} />
            {t.contact.downloadCv}
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
