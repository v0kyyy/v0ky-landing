"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useI18n } from "@/components/providers/LocaleProvider";
import { site } from "@/data/site";
import { hasFinePointer } from "@/lib/scroll";

export default function KworkMention() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const href = site.links.kwork[locale];
  const src = locale === "ru" ? "/kwork-card-ru.png" : "/kwork-card-en.png";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  const openLightbox = () => setOpen(true);

  const onWordClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!hasFinePointer()) {
      event.preventDefault();
      openLightbox();
    }
  };

  return (
    <>
      {t.help.kworkLeadBefore}
      <span className="group/kwork relative inline-block">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWordClick}
          className="text-fg underline decoration-accent decoration-1 underline-offset-[5px] transition-colors duration-300 hover:text-accent"
        >
          {t.help.kworkName}
        </a>

        <span className="pointer-events-none absolute bottom-full left-1/2 z-[80] hidden w-56 -translate-x-1/2 pb-2 opacity-0 transition-opacity duration-300 group-hover/kwork:pointer-events-auto group-hover/kwork:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:block">
          <button
            type="button"
            onClick={openLightbox}
            className="block w-full overflow-hidden rounded-xl border border-line bg-surface-deep shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition-colors duration-300 hover:border-accent/50"
            aria-label={t.help.kworkCardAlt}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={t.help.kworkCardAlt}
              width={880}
              height={970}
              className="block h-auto w-full"
            />
          </button>
        </span>
      </span>
      {t.help.kworkLeadAfter}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[250] flex items-center justify-center px-4 py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  type="button"
                  aria-label={t.help.kworkLightboxClose}
                  className="absolute inset-0 bg-bg/82 backdrop-blur-md"
                  onClick={() => setOpen(false)}
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={t.help.kworkCardAlt}
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-[1] flex w-full max-w-[min(26rem,100%)] flex-col items-center gap-5"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute -right-1 -top-11 rounded-full border border-line bg-surface-deep p-2 text-muted transition-colors hover:border-accent/40 hover:text-fg"
                    aria-label={t.help.kworkLightboxClose}
                  >
                    <X size={16} strokeWidth={1.75} />
                  </button>

                  <div className="overflow-hidden rounded-2xl border border-line bg-surface-deep shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={t.help.kworkCardAlt}
                      width={880}
                      height={970}
                      className="block h-auto max-h-[min(72vh,34rem)] w-full object-contain"
                    />
                  </div>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-fill inline-flex items-center rounded-full border border-line-strong px-10 py-3 font-mono text-xs font-medium uppercase tracking-[0.22em] text-fg"
                  >
                    {t.help.kworkName}
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
