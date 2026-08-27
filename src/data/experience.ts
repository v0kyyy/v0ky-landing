import type { Localized } from "@/i18n";

export type Experience = {
  id: string;
  company: string;
  url?: string;
  role: string;
  period: Localized;
  current?: boolean;
  bullets: Localized<string[]>;
  stack: string[];
};

export const experience: Experience[] = [
  {
    id: "helpstat",
    company: "HelpStat",
    url: "https://helpstat.su",
    role: "Full-stack Engineer",
    period: {
      en: "2024 — Present",
      ru: "2024 — настоящее время",
    },
    current: true,
    bullets: {
      en: [
        "Building HelpStat — a marketplace-analytics SaaS for Ozon, Wildberries and other platforms. Full cycle: data collection, product UI, billing.",
        "Designed automated parsing of storefronts and seller cabinets so catalogue, rank and sales data refresh themselves and reach the user without manual exports.",
        "Shipped the customer-facing layer: dashboards, SKU reports and growth tools — sellers see demand, visibility and unit economics in one place instead of a dozen cabinets.",
        "Delivered payment integration and the surrounding backend: subscriptions, access, billing — the service is sold as a product, not run as an internal spreadsheet.",
      ],
      ru: [
        "Разрабатываю HelpStat — SaaS-платформу аналитики маркетплейсов (Ozon, Wildberries и другие). Полный цикл: сбор данных, продукт, биллинг.",
        "Настроил автоматизированный парсинг витрин и кабинетов МП: каталог, позиции и продажи обновляются сами и доходят до пользователя без ручных выгрузок.",
        "Собрал пользовательский контур: дашборды, отчёты по SKU и инструменты роста — продавец видит спрос, видимость и юнит-экономику в одном месте вместо десятка кабинетов.",
        "Закрыл платёжную интеграцию и сопутствующий backend: подписка, доступ, биллинг — сервис продаётся как продукт, а не живёт таблицей внутри команды.",
      ],
    },
    stack: ["Python", "Playwright", "FastAPI", "Next.js", "PostgreSQL", "Payments"],
  },
  {
    id: "synex",
    company: "Synex",
    url: "https://synex.ltd",
    role: "Automation Engineer, operator testing",
    period: {
      en: "2024 — 2026",
      ru: "2024 — 2026",
    },
    bullets: {
      en: [
        "At a telecom company that tests mobile operators, I turned large-scale SMS-number verification from a manual shift into a fleet of autonomous scripts.",
        "Mapped weak points in operator processes and replaced one-off checks with pipelines that keep running when a person is not at the keyboard.",
        "Built test runs that stay alive against real site protection — CAPTCHA, anti-fraud, rate limits — so a bulk pass does not die on the first challenge.",
        "Scaled one scenario into a farm: different operators, changing rules, unattended execution with logs and recovery instead of a pile of fragile scripts.",
      ],
      ru: [
        "В компании связи, которая тестирует мобильных операторов, перевёл массовую проверку SMS-номеров с ручной смены на флот автономных скриптов.",
        "Находил слабые места в процессах операторов и заменял разовые проверки пайплайнами, которые живут без человека за клавиатурой.",
        "Собирал прогоны, которые не останавливаются на реальной защите площадок — CAPTCHA, антифрод, лимиты — чтобы массовый проход не умирал на первом челлендже.",
        "Масштабировал один сценарий в ферму: разные операторы, смена правил, автономный запуск с логами и восстановлением вместо пачки хрупких скриптов.",
      ],
    },
    stack: ["Python", "Playwright", "asyncio", "Task queues", "Proxy rotation"],
  },
  {
    id: "travel",
    company: "Travel company",
    role: "Automation Engineer",
    period: {
      en: "2021 — 2023",
      ru: "2021 — 2023",
    },
    bullets: {
      en: [
        "Audited the team's manual work: found where people burned hours on content, posting and reports — and closed those bottlenecks with automation instead of more headcount.",
        "Built a content generation and publishing pipeline: assets are produced and shipped on a schedule, without someone posting into every time slot by hand.",
        "Set up a controlled account warm-up flow so social channels reach a working state without burn-out or click-work.",
        "Wrote collection scripts and live dashboards: channel decisions were made on live numbers, not a weekly spreadsheet dump.",
      ],
      ru: [
        "Аудировал ручную работу команды: находил, где люди теряли часы на контент, постинг и отчёты — и закрывал эти узкие места автоматизацией, а не расширением штата.",
        "Собрал конвейер генерации и публикации контента: материалы готовятся и выходят по расписанию, без ручного постинга в каждое окно.",
        "Выстроил контролируемый прогрев аккаунтов — соцсети выходят на рабочий режим без выгорания и ручного кликанья.",
        "Написал скрипты сбора аналитики и умные дашборды: решения по каналам принимались по живым цифрам, а не по выгрузке раз в неделю.",
      ],
    },
    stack: ["Python", "Playwright", "Google Apps Script", "Dashboards", "Schedulers"],
  },
];
