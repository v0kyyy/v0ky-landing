"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/scroll";
import Magnetic from "@/components/ui/Magnetic";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative z-10 border-t border-line bg-bg">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-6 py-14 lg:px-8">
        <div className="min-w-0">
          <p className="font-mono text-sm text-fg">
            v<span className="text-accent">0</span>ky.dev &copy; {new Date().getFullYear()}
          </p>
          <p className="mt-2 text-xs text-muted">
            {t.footer.credit}
          </p>
          <p className="mt-4 font-mono text-[11px] text-dim">
            <span className="text-accent">{"//"}</span> v0ky — building v1 of everything
          </p>
        </div>

        <Magnetic strength={0.45}>
          <button
            onClick={scrollToTop}
            aria-label={t.footer.backToTop}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent transition-colors duration-300 hover:bg-accent hover:text-bg"
          >
            <ArrowUp size={15} />
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
