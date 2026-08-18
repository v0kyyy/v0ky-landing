"use client";

import { useRef, useState, type FormEvent } from "react";
import { Download } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import Magnetic from "@/components/ui/Magnetic";
import SocialLinks from "@/components/ui/SocialLinks";
import { site } from "@/data/site";
import { useI18n } from "@/components/providers/LocaleProvider";

function Field({
  id,
  label,
  textarea = false,
  type = "text",
}: {
  id: string;
  label: string;
  textarea?: boolean;
  type?: string;
}) {
  const shared =
    "peer w-full bg-transparent pb-3 pt-6 text-fg outline-none placeholder-transparent";
  return (
    <div className="field-underline relative border-b border-line">
      {textarea ? (
        <textarea id={id} name={id} rows={4} required placeholder=" " className={`${shared} resize-none`} />
      ) : (
        <input id={id} name={id} type={type} required placeholder=" " className={shared} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-5 font-mono text-sm text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const { locale, t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const revealedRef = useRef(false);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const heading = headingRef.current;
      const words = heading?.querySelectorAll("[data-word]");
      if (!heading || !words?.length) return;

      // После первой прокрутки не прячем слова заново — иначе смена языка
      // оставляет translateY и overflow:hidden обрезает всё, кроме последнего слова.
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // [TODO: подключить обработчик формы (Formspree/Resend)] — сейчас имитация успешной отправки
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative mx-auto max-w-6xl px-6 py-28 md:py-40 lg:px-8"
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-sm text-accent">05</span>
        <span className="h-px w-12 bg-accent/40" aria-hidden />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          $ contact --now
        </span>
      </div>

      {/* Пословный reveal + hover-подсветка слов */}
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

      <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-2">
        {/* ---- Прямые контакты ---- */}
        <div>
          <p className="max-w-md leading-relaxed text-muted">
            {t.contact.intro}
          </p>

          <div className="mt-10 space-y-5">
            <a
              href={site.links.email}
              className="group block font-mono text-lg text-fg transition-colors duration-300 hover:text-accent md:text-xl"
            >
              hello@v0ky.dev
              <span className="mt-1 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </a>
            <a
              href={site.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group block font-mono text-lg text-fg transition-colors duration-300 hover:text-accent md:text-xl"
            >
              t.me/v0ky
              <span className="mt-1 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
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
            <div className="flex items-center gap-3">
              <SocialLinks iconSize={16} />
            </div>
          </div>
        </div>

        {/* ---- Форма ---- */}
        <form onSubmit={handleSubmit} className="space-y-8" noValidate={false}>
          <Field id="name" label={t.contact.name} />
          <Field id="email" label={t.contact.email} type="email" />
          <Field id="message" label={t.contact.message} textarea />

          <div className="flex flex-wrap items-center gap-6">
            <Magnetic strength={0.3}>
              <button
                type="submit"
                className="btn-fill rounded-full border border-line-strong px-8 py-3.5 font-mono text-sm uppercase tracking-wider text-fg"
              >
                {t.contact.send}
              </button>
            </Magnetic>
            {sent && (
              <p role="status" aria-live="polite" className="font-mono text-sm text-online">
                {t.contact.sent}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
