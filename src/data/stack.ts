import {
  Code2,
  Bot,
  Server,
  Database,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n";

export type StackCategory = {
  id: keyof Dictionary["about"]["stack"];
  icon: LucideIcon;
  items: string[];
};

export const stackCategories: StackCategory[] = [
  {
    id: "languages",
    icon: Code2,
    items: ["Python", "TypeScript / JavaScript", "SQL", "Bash"],
  },
  {
    id: "automation",
    icon: Bot,
    items: [
      "Playwright",
      "Selenium",
      "aiogram",
      "n8n",
      "Google Apps Script",
      "Celery / cron",
    ],
  },
  {
    id: "backend",
    icon: Server,
    items: ["FastAPI", "Flask", "REST / Webhook API", "Docker", "Redis"],
  },
  {
    id: "data",
    icon: Database,
    items: ["Pandas", "PostgreSQL", "MySQL", "Google Sheets API", "Plotly"],
  },
  {
    id: "dashboards",
    icon: LayoutDashboard,
    items: ["React / Next.js", "Recharts", "Chart.js", "Tailwind CSS"],
  },
];
