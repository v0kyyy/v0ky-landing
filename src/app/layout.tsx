import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/providers/AppShell";
import { site } from "@/data/site";

// Display-шрифт с характером для крупных заголовков (поддерживает кириллицу)
const display = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
});

const sans = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "cyrillic"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} (${site.brand}) — Fullstack Automation Engineer`,
  description:
    "Fullstack automation engineer: Telegram and Discord bots, Playwright scraping, CRM and payment integrations, RPA, and custom dashboards. I turn repetitive business work into systems that run themselves.",
  keywords: [
    "business process automation",
    "telegram bot development",
    "web scraping",
    "playwright",
    "CRM integrations",
    "RPA",
    "python developer",
    "v0ky",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.domain,
    title: `${site.name} (${site.brand}) — Fullstack Automation Engineer`,
    description:
      "Bots, scraping, integrations, and dashboards that do the work instead of people. Portfolio of a fullstack automation engineer.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} (${site.brand}) — Fullstack Automation Engineer`,
    description: "I turn repetitive business work into systems that run themselves.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
