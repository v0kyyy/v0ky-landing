"use client";

import { useRef, type ComponentType, type ElementType, type ReactNode, type Ref } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import { useI18n } from "@/components/providers/LocaleProvider";

type SplitRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** chars — посимвольно, words — пословно, lines — построчно */
  mode?: "chars" | "words" | "lines";
  /** true — reveal привязан к скроллу (scrub), false — одноразовая анимация при входе в вьюпорт */
  scrub?: boolean;
  delay?: number;
  /** запустить сразу без ScrollTrigger (для hero после прелоадера) */
  immediate?: boolean;
};

/**
 * Базовый текстовый reveal на GSAP SplitText:
 * посимвольный/пословный подъём с blur→sharp, либо scrub-проявление построчно.
 * При prefers-reduced-motion текст просто остаётся видимым.
 */
export default function SplitReveal({
  children,
  as: Tag = "div",
  className = "",
  mode = "words",
  scrub = false,
  delay = 0,
  immediate = false,
}: SplitRevealProps) {
  const { ready } = useI18n();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!ready || !el || prefersReducedMotion()) return;

      const split = new SplitText(el, {
        type: mode === "chars" ? "chars,words" : mode,
        mask: mode === "lines" ? "lines" : mode === "chars" ? "chars" : "words",
      });
      const targets =
        mode === "chars" ? split.chars : mode === "lines" ? split.lines : split.words;

      if (scrub) {
        gsap.from(targets, {
          opacity: 0.1,
          filter: "blur(5px)",
          stagger: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      } else {
        gsap.fromTo(
          targets,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: mode === "chars" ? 0.025 : 0.05,
            ease: "power3.out",
            delay,
            overwrite: "auto",
            ...(immediate
              ? {}
              : {
                  scrollTrigger: {
                    trigger: el,
                    start: "top 86%",
                    once: true,
                  },
                }),
          }
        );
      }

      return () => {
        split.revert();
      };
    },
    { scope: ref, dependencies: [ready, mode, scrub, delay, immediate, children] }
  );

  // Полиморфный тег: приводим к обобщённому компоненту, чтобы TS принял ref/children
  const Component = Tag as unknown as ComponentType<{
    ref: Ref<HTMLElement>;
    className: string;
    children: ReactNode;
  }>;

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
