import type { Localized } from "@/i18n";

export type Experience = {
  id: string;
  company: string; // [TODO: можно заменить] — все компании вымышленные
  role: Localized;
  period: Localized;
  current?: boolean;
  bullets: Localized<string[]>;
  stack: string[];
};

export const experience: Experience[] = [
  {
    id: "nordstack",
    company: "NordStack Systems",
    role: {
      en: "Senior Automation Engineer",
      ru: "Senior Automation Engineer",
    },
    period: {
      en: "2023 — Present",
      ru: "2023 — настоящее время",
    },
    current: true,
    bullets: {
      en: [
        "Lead the automation practice: 25+ projects a year — from RPA scripts to payment integrations shipped end-to-end, with SLAs and monitoring.",
        "Built a Playwright scraping pipeline with queues, proxy rotation, and self-healing: 2M+ pages a month at 99.9% reliability.",
        "Automated client onboarding (docs, access, notifications): from two days of a manager's time to 15 minutes with no one in the loop.",
        "Mentor two junior developers; introduced code-review standards and mandatory smoke tests for every automation.",
      ],
      ru: [
        "Веду направление автоматизации: 25+ проектов в год — от RPA-скриптов до платёжных интеграций под ключ, с SLA и мониторингом.",
        "Построил конвейер веб-скрапинга на Playwright с очередями, ротацией прокси и self-healing: 2M+ страниц в месяц при стабильности 99.9%.",
        "Автоматизировал онбординг клиентов (документы, доступы, уведомления): с 2 дней ручной работы менеджера до 15 минут полностью без участия человека.",
        "Менторю двух младших разработчиков, внедрил стандарты код-ревью и обязательные smoke-тесты для каждой автоматизации.",
      ],
    },
    stack: ["Python", "Playwright", "FastAPI", "n8n", "aiogram", "Docker"],
  },
  {
    id: "orbita",
    company: "Orbita Labs",
    role: {
      en: "Full-stack Developer, internal tools",
      ru: "Full-stack разработчик, внутренние инструменты",
    },
    period: {
      en: "2021 — 2023",
      ru: "2021 — 2023",
    },
    bullets: {
      en: [
        "Designed an internal integrations platform (FastAPI + Celery) connecting CRM, billing, and support: 30+ flows, 200,000+ events a day.",
        "Replaced manual payment reconciliation with an automated pipeline — month-end close went from 3 days to 4 hours.",
        "Built a real-time ops dashboard (Next.js + Recharts) for 40 people — decisions on live data instead of weekly exports.",
        "Set up monitoring and auto-restart for critical jobs: integration downtime dropped 92%.",
      ],
      ru: [
        "Спроектировал внутреннюю платформу интеграций (FastAPI + Celery), связавшую CRM, биллинг и поддержку: 30+ сценариев, 200 000+ событий в сутки.",
        "Перевёл ручную сверку платежей на автоматический пайплайн — закрытие месяца сократилось с 3 дней до 4 часов.",
        "Собрал реал-тайм дашборд операционных метрик (Next.js + Recharts) для 40 сотрудников — решения на живых данных вместо еженедельных выгрузок.",
        "Настроил мониторинг и автоперезапуск критичных задач: даунтайм интеграций снизился на 92%.",
      ],
    },
    stack: ["Python", "FastAPI", "Celery", "TypeScript", "Next.js", "PostgreSQL"],
  },
  {
    id: "pixelforge",
    company: "Pixelforge Digital",
    role: {
      en: "Automation Developer",
      ru: "Automation Developer",
    },
    period: {
      en: "2019 — 2021",
      ru: "2019 — 2021",
    },
    bullets: {
      en: [
        "Shipped 14 Telegram bots for the agency's clients: intake, quizzes, CRM integrations — average lead handling time fell from 4 hours to 6 minutes.",
        "Automated ad-campaign reporting: five ad accounts into Google Sheets with alerts — 25 hours of team busywork gone each month.",
        "Rolled out price and stock monitoring for 3 e-commerce clients (Playwright + proxy rotation) at 99.4% data accuracy.",
      ],
      ru: [
        "Разработал 14 Telegram-ботов для клиентов агентства: приём заявок, квизы, интеграции с CRM — среднее время обработки лида упало с 4 часов до 6 минут.",
        "Автоматизировал отчётность по рекламным кампаниям: сбор из 5 кабинетов в Google Sheets с алертами — минус 25 часов ручной работы команды в месяц.",
        "Внедрил мониторинг цен и наличия для 3 e-commerce клиентов (Playwright + ротация прокси) с точностью данных 99.4%.",
      ],
    },
    stack: ["Python", "aiogram", "Playwright", "Google Sheets API", "MySQL"],
  },
];
