"use client";

import { useI18n } from "@/components/providers/LocaleProvider";
import type { Locale } from "@/i18n";

const options: { id: Locale; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "ru", label: "RU" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.header.langAria}
      className="grid grid-cols-2 rounded-full border border-line bg-surface-deep p-0.5"
    >
      {options.map(({ id, label }) => {
        const active = locale === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setLocale(id)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
              active ? "bg-accent text-bg" : "text-muted hover:text-fg"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
