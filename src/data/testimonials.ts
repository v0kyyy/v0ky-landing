import type { Localized } from "@/i18n";

export type Testimonial = {
  id: string;
  name: Localized;
  role: Localized;
  text: Localized;
  initials: Localized;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: { en: "Marina Kovaleva", ru: "Марина Ковалёва" },
    role: {
      en: "Operations Director, Craft & Co coffee chain",
      ru: "Операционный директор, сеть кофеен «Крафт & Ко»",
    },
    initials: { en: "MK", ru: "МК" },
    text: {
      en: "Vladimir automated revenue reconciliation across 14 locations. Our accountant used to spend two full days a week on it; now the report is ready by 7 a.m. In six months, not a single shortage slipped through. And he explained everything in plain language.",
      ru: "Владимир автоматизировал сверку выручки по 14 точкам: раньше бухгалтер тратил на это два полных дня в неделю, теперь отчёт собирается сам к 7 утра. За полгода — ни одной пропущенной недостачи. Отдельное спасибо за то, что объяснял всё человеческим языком.",
    },
  },
  {
    id: "t2",
    name: { en: "Denis Arutyunov", ru: "Денис Арутюнов" },
    role: {
      en: "Founder, Homeline e-commerce",
      ru: "Основатель, e-commerce «Хоумлайн»",
    },
    initials: { en: "DA", ru: "ДА" },
    text: {
      en: "We asked for competitor price monitoring across 12 marketplaces. It's been running for two years without a single outage: Telegram alerts, history in spreadsheets. Repricing the catalog went from a week to a day — you can see it in the margin.",
      ru: "Заказывали мониторинг цен конкурентов по 12 маркетплейсам. Работает уже второй год без единого падения: алерты в Telegram, история в таблицах. Переоценка ассортимента ускорилась с недели до одного дня — это напрямую видно в марже.",
    },
  },
  {
    id: "t3",
    name: { en: "Anna Litvinova", ru: "Анна Литвинова" },
    role: {
      en: "Product Lead, Paylight fintech",
      ru: "Product Lead, финтех-стартап Paylight",
    },
    initials: { en: "AL", ru: "АЛ" },
    text: {
      en: "We needed an ops dashboard yesterday. In three weeks Vladimir shipped a screen the team still uses every day: live metrics, alerts, no magic — everything is transparent and documented. Rare to find a contractor who thinks about support, not just handover.",
      ru: "Нужен был операционный дашборд «ещё вчера». Владимир за три недели собрал экран, которым команда пользуется каждый день: живые метрики, алерты, никакой магии — всё прозрачно и документировано. Редкий случай, когда подрядчик думает о поддержке, а не только о сдаче.",
    },
  },
  {
    id: "t4",
    name: { en: "Igor Savelyev", ru: "Игорь Савельев" },
    role: {
      en: "Managing Partner, Brandbox agency",
      ru: "Управляющий партнёр, агентство Brandbox",
    },
    initials: { en: "IS", ru: "ИС" },
    text: {
      en: "Three bots and an n8n hub for internal ops. Leads from every channel land in the CRM with full context, client reports go out on a schedule. We ran the numbers: the team saves 80+ hours a month. Timeline and budget landed exactly as agreed.",
      ru: "Три бота и n8n-хаб для внутренних процессов. Лиды из всех каналов сами падают в CRM с полным контекстом, отчёты клиентам уходят по расписанию. Посчитали: экономим больше 80 часов работы команды в месяц. Сроки и смета — ровно как договаривались.",
    },
  },
  {
    id: "t5",
    name: { en: "Olga Demchenko", ru: "Ольга Демченко" },
    role: {
      en: "CFO, TransArc logistics",
      ru: "Финансовый директор, логистика TransArc",
    },
    initials: { en: "OD", ru: "ОД" },
    text: {
      en: "Document workflow automation: 400+ invoices and waybills a week now generate themselves. Typos in bank details disappeared, and two people finally moved from copy-paste to actual analysis. It paid for itself in two months.",
      ru: "Автоматизация документооборота: 400+ счетов и накладных в неделю теперь формируются без людей. Ошибки в реквизитах исчезли как класс, а два сотрудника занялись наконец аналитикой вместо копипаста. Окупилось за два месяца.",
    },
  },
];
