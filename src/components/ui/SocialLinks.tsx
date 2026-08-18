"use client";

import { Mail, Send } from "lucide-react";
import { GithubIcon, KworkIcon } from "@/components/ui/BrandIcons";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/data/site";
import { useI18n } from "@/components/providers/LocaleProvider";

type SocialLinksProps = {
  iconSize?: number;
  buttonClassName?: string;
};

export default function SocialLinks({
  iconSize = 16,
  buttonClassName = "flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent",
}: SocialLinksProps) {
  const { locale } = useI18n();

  const items = [
    { icon: KworkIcon, href: site.links.kwork[locale], label: "Kwork" },
    { icon: GithubIcon, href: site.links.github, label: "GitHub" },
    { icon: Send, href: site.links.telegram, label: "Telegram" },
    { icon: Mail, href: site.links.email, label: "Email" },
  ];

  return (
    <>
      {items.map(({ icon: Icon, href, label }) => (
        <Magnetic key={label} strength={0.45}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={buttonClassName}
          >
            <Icon size={iconSize} strokeWidth={1.75} />
          </a>
        </Magnetic>
      ))}
    </>
  );
}
