"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToSection, scrollToTop } from "@/lib/scroll";
import { site } from "@/data/site";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function Header() {
  const { t } = useI18n();
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const triggers = site.nav
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
        });
      })
      .filter(Boolean);

    return () => {
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <header className="fixed left-1/2 top-[max(0.75rem,env(safe-area-inset-top))] z-[150] w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 rounded-2xl border border-line bg-bg/80 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-lg md:top-4 md:w-[calc(100%-2rem)]">
        <div className="mx-auto flex h-14 w-full items-center justify-between px-4 md:h-12 md:px-5">
          <button
            onClick={scrollToTop}
            aria-label={t.header.topAria}
            className="relative z-10 font-mono text-base font-semibold tracking-tight text-fg"
          >
            v<span className="text-accent">0</span>ky
          </button>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 md:flex"
            aria-label={t.header.navAria}
          >
            {site.nav.map((id) => (
              <button
                key={id}
                onClick={() => go(id)}
                data-active={active === id}
                className="nav-link font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-fg"
              >
                {t.nav[id]}
              </button>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg md:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[140] flex flex-col bg-[#08080a] md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              className="flex h-full flex-col justify-between px-6 pb-8 pt-24"
            >
              <nav aria-label={t.header.mobileNavAria} className="flex flex-col gap-6">
                {site.nav.map((id, i) => {
                  const label = t.nav[id];
                  return (
                    <button key={id} onClick={() => go(id)} className="text-left">
                      <span className="mr-4 font-mono text-xs text-accent">0{i + 1}</span>
                      <span className="inline-flex overflow-hidden">
                        {label.split("").map((ch, j) => (
                          <motion.span
                            key={j}
                            initial={{ y: "115%" }}
                            animate={{ y: 0 }}
                            transition={{
                              delay: 0.12 + i * 0.05 + j * 0.02,
                              duration: 0.45,
                              ease: [0.65, 0, 0.35, 1],
                            }}
                            className={`inline-block font-display text-3xl font-semibold ${
                              active === id ? "text-accent" : "text-fg"
                            }`}
                          >
                            {ch === " " ? "\u00A0" : ch}
                          </motion.span>
                        ))}
                      </span>
                    </button>
                  );
                })}
              </nav>
              <p className="font-mono text-xs text-dim">
                <span className="text-accent">{"//"}</span> v0ky.dev — version 0 → production
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
