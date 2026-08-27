import type { Localized } from "@/i18n";

/**
 * Kwork по годам.
 * Итоги: 126 заказов, 72 отзыва.
 * newProjects / newReviews — нарастающее распределение (не равные доли).
 * Крупные навыки — до 2024, узкие инструменты — 2025–2026.
 */

export type KworkYear = {
  year: number;
  newProjects: number;
  newReviews: number;
  newSkills: Localized<string[]>;
};

export const kworkExperience: { years: KworkYear[] } = {
  years: [
    {
      year: 2022,
      newProjects: 8,
      newReviews: 5,
      newSkills: {
        en: ["Browser automation (BAS)", "Python", "JavaScript"],
        ru: ["Автоматизация браузера (BAS)", "Python", "JavaScript"],
      },
    },
    {
      year: 2023,
      newProjects: 16,
      newReviews: 9,
      newSkills: {
        en: ["Playwright", "Telegram bots"],
        ru: ["Playwright", "Telegram-боты"],
      },
    },
    {
      year: 2024,
      newProjects: 28,
      newReviews: 14,
      newSkills: {
        en: ["Smart dashboards", "Google Apps Script", "FastAPI"],
        ru: ["Умные дашборды", "Google Apps Script", "FastAPI"],
      },
    },
    {
      year: 2025,
      newProjects: 34,
      newReviews: 20,
      newSkills: {
        en: ["n8n", "Docker", "Tailwind CSS"],
        ru: ["n8n", "Docker", "Tailwind CSS"],
      },
    },
    {
      year: 2026,
      newProjects: 40,
      newReviews: 24,
      newSkills: {
        en: ["PostgreSQL", "Pandas", "Redis"],
        ru: ["PostgreSQL", "Pandas", "Redis"],
      },
    },
  ],
};

export const kworkFinal = {
  projects: 126,
  reviews: 72,
  skills: 15,
} as const;

export const kworkStats = {
  since: { en: "On Kwork since July 21, 2018", ru: "На Kwork с 21 июля 2018" },
  startOrders: 11,
  startReviews: 6,
  orders: 126,
  reviews: 72,
  success: 100,
  onTime: 100,
  repeat: 48,
} as const;
