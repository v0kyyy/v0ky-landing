"use client";

import { useRef } from "react";
import { ArrowUpRight, Download, Mail, Send } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import Magnetic from "@/components/ui/Magnetic";
import { GithubIcon, KworkIcon } from "@/components/ui/BrandIcons";
import ContactChat from "@/components/sections/ContactChat";
import { site } from "@/data/site";
import { useI18n } from "@/components/providers/LocaleProvider";

function displayHost(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function Contact() {
  const { locale, t, ready } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const revealedRef = useRef(false);

  const email = site.links.email.replace(/^mailto:/, "");
  const kworkHref = site.links.kwork[locale];
  const contacts = [
    {
      icon: Send,
      label: "Telegram",
      value: "@v0kyyy",
      href: site.links.telegram,
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: site.links.email,
      external: false,
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: displayHost(site.links.github),
      href: site.links.github,
      external: true,
    },
    {
      icon: KworkIcon,
      label: "Kwork",
      value: displayHost(kworkHref),
      href: kworkHref,
      external: true,
    },
  ];

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;
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
    { scope: sectionRef, dependencies: [locale, ready] }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative mx-auto max-w-6xl overflow-x-clip px-6 py-28 md:py-40 lg:px-8"
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

      <div className="mt-12 grid items-start gap-12 md:mt-16 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-16 lg:gap-20">
        <div>
          <p className="sr-only">{t.contact.chatAria}</p>
          <ContactChat />
        </div>

        <div>
          <p className="max-w-xl text-base leading-relaxed text-muted">{t.contact.intro}</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
            {t.contact.replyHint}
          </p>

          <ul className="mt-8 space-y-3">
            {contacts.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-3.5 transition-colors duration-300 hover:border-accent/40 hover:bg-surface-deep"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                      {label}
                    </span>
                    <span className="mt-0.5 block truncate text-[15px] text-fg">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="ml-auto shrink-0 text-dim transition-colors duration-300 group-hover:text-accent"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>

          <Magnetic strength={0.3}>
            <a
              href={site.links.resume[locale]}
              download={locale === "ru" ? "Vladimir-Kireev-CV.pdf" : "Vladimir-Chireev-CV.pdf"}
              className="btn-fill mt-6 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-wider text-fg"
            >
              <Download size={14} />
              {t.contact.downloadCv}
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
