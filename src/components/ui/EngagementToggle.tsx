"use client";

import { useI18n } from "@/components/providers/LocaleProvider";

export type EngagementMode = "project" | "hire";

type EngagementToggleProps = {
  value: EngagementMode;
  onChange: (mode: EngagementMode) => void;
  className?: string;
};

export default function EngagementToggle({
  value,
  onChange,
  className = "",
}: EngagementToggleProps) {
  const { t } = useI18n();
  const options: { id: EngagementMode; label: string }[] = [
    { id: "project", label: t.help.project },
    { id: "hire", label: t.help.hire },
  ];

  return (
    <div
      role="group"
      aria-label={t.help.aria}
      className={`inline-grid grid-cols-2 rounded-full border border-line bg-surface-deep p-1 ${className}`}
    >
      {options.map(({ id, label }) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={active}
            className={`whitespace-nowrap rounded-full px-2.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 sm:px-5 sm:text-[11px] sm:tracking-[0.16em] md:px-7 ${
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
