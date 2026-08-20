import {
  Activity,
  FileStack,
  Funnel,
  Headset,
  LayoutDashboard,
  ScanSearch,
  Share2,
  Unplug,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Localized } from "@/i18n";

export type SpecGroup = "business" | "niche";

export type SpecProject = {
  name: Localized;
  description: Localized;
  result: Localized;
  stack: string[];
  demo?: boolean;
  image?: string;
  pattern: "preview-grid-dots" | "preview-diag-lines" | "preview-scanlines" | "preview-rings";
};

export type Specialization = {
  id: string;
  num: string;
  group: SpecGroup;
  icon: LucideIcon;
  title: Localized;
  short: Localized;
  long: Localized;
  projects: SpecProject[];
};

export const specializations: Specialization[] = [
  {
    id: "speed",
    num: "01",
    group: "niche",
    icon: Zap,
    title: {
      en: "Speed bots: watch and act instantly",
      ru: "Скоростные боты: мониторинг и мгновенные действия",
    },
    short: {
      en: "When seconds decide the outcome — a slot, a number, a drop.",
      ru: "Когда решают секунды — слот, номер, дроп.",
    },
    long: {
      en: "Built for situations where the first reaction wins: visa slots, contested inventory, limited drops. Async pipelines, low latency, proxy rotation, and a Telegram ping the moment something happens — so a person never has to sit on F5.",
      ru: "Для ситуаций, где побеждает тот, кто среагировал первым: визовые слоты, дефицитные номера, лимитированные дропы. Асинхронные пайплайны, минимальная задержка, ротация прокси и сигнал в Telegram в тот же момент — чтобы человеку не пришлось сидеть на F5.",
    },
    projects: [
      {
        name: {
          en: "Auto-booking visa-center slots",
          ru: "Автобронирование слотов в визовом центре",
        },
        description: {
          en: "New appointment slots at a Polish visa center vanish in seconds. A bot watches the calendar around the clock and books the slot onto pre-set applicant data the moment it appears.",
          ru: "Новые слоты в визовом центре Польши исчезают за секунды. Бот круглосуточно следит за календарём и бронирует слот на заранее заданные данные заявителя в тот же момент, как он появляется.",
        },
        result: {
          en: "Booked in 2–4s after a slot appeared — manual refresh never won.",
          ru: "Бронь за 2–4 с после появления слота — ручной мониторинг не успевал ни разу.",
        },
        stack: ["Python", "Playwright", "asyncio", "Telegram alerts"],
        image: "/cases/visa-slots.png",
        pattern: "preview-grid-dots",
      },
      {
        name: {
          en: "Instant SMS-number sniping",
          ru: "Моментальный выкуп SMS-номеров",
        },
        description: {
          en: "Rental numbers on a high-competition marketplace disappear as soon as they are listed. Async workers watch the feed and buy matching numbers (price, operator, country) before a human can click.",
          ru: "Номера в аренду на конкурентном рынке разбирают в момент появления. Асинхронные воркеры следят за лентой и выкупают подходящие номера (цена, оператор, страна) раньше, чем человек успевает кликнуть.",
        },
        result: {
          en: "Reaction 50–120ms; catch rate went from ~5% by hand to most matching listings.",
          ru: "Реакция 50–120 мс; доля перехватов выросла с ~5% вручную до большинства подходящих лотов.",
        },
        stack: ["Python", "asyncio", "task queues", "high-load API"],
        image: "/cases/sms-sniper.png",
        pattern: "preview-diag-lines",
      },
      {
        name: {
          en: "Limited drops & ticket checkout",
          ru: "Автопокупка лимитированных товаров и билетов",
        },
        description: {
          en: "A drop of limited merch or event tickets hits several sites at once. The bot watches all of them and submits checkout against preset rules — size, price cap, row — the instant stock appears.",
          ru: "Дроп ограниченного товара или билетов стартует сразу на нескольких площадках. Бот следит за всеми и оформляет заказ по заданным правилам — размер, потолок цены, ряд — в момент появления остатка.",
        },
        result: {
          en: "Demo: multi-venue watch + sub-second checkout pipeline.",
          ru: "Демо: мониторинг нескольких площадок и оформление заказа меньше чем за секунду.",
        },
        stack: ["Python", "Playwright", "requests", "realtime alerts"],
        demo: true,
        image: "/cases/drop-cop.png",
        pattern: "preview-scanlines",
      },
    ],
  },
  {
    id: "parsing",
    num: "02",
    group: "niche",
    icon: ScanSearch,
    title: {
      en: "Parsing, collection & data aggregation",
      ru: "Парсинг, сбор и агрегация данных",
    },
    short: {
      en: "One source of truth instead of a dozen tabs and a spreadsheet.",
      ru: "Единая точка правды вместо десятка вкладок и таблицы.",
    },
    long: {
      en: "When the data that matters lives on sites, in admin panels, and in chats, I pull it into one feed the team actually uses. Classification, deduping, queues, and a place to read it — Telegram, a sheet, or a database — without anyone copying rows by hand.",
      ru: "Когда нужные данные живут на сайтах, в админках и чатах, я собираю их в одну ленту, которой команда реально пользуется. Классификация, дедупликация, очереди и точка чтения — Telegram, таблица или база — без ручного копирования строк.",
    },
    projects: [
      {
        name: {
          en: "Envato stock: parse, classify, prepare",
          ru: "Автопарсинг и классификация медиа со стока Envato",
        },
        description: {
          en: "Content teams were sorting Envato Elements media by hand. A 24/7 pipeline parses new items, classifies them by rules and metadata, then cuts and stitches ready-to-use units with ffmpeg.",
          ru: "Контент-команда вручную разбирала медиа со стока Envato Elements. Круглосуточный пайплайн парсит новые материалы, классифицирует по правилам и метаданным, затем нарезает и склеивает готовые единицы через ffmpeg.",
        },
        result: {
          en: "Hundreds of content units a day without a manual sorting shift.",
          ru: "Сотни единиц контента в сутки без ручной смены на сортировке.",
        },
        stack: ["Python", "Playwright", "ffmpeg", "task queue"],
        image: "/cases/envato-media.png",
        pattern: "preview-rings",
      },
      {
        name: {
          en: "Yandex Eats leads into one chat",
          ru: "Агрегация отработанных лидов с Яндекс Еды",
        },
        description: {
          en: "Worked leads sat in separate tables and were exported by hand. The bot pulls completed leads from Yandex Eats and drops a structured card into a shared staff chat for the next call.",
          ru: "Отработанные лиды жили в разрозненных таблицах и выгружались руками. Бот забирает закрытые лиды из Яндекс Еды и кладёт структурированную карточку в общий чат сотрудников для обзвона.",
        },
        result: {
          en: "Leads in the shared chat within a minute — not at end of day from a sheet.",
          ru: "Лиды в общем чате в течение минуты, а не к вечеру из таблицы.",
        },
        stack: ["Python", "Telegram Bot API", "web / API adapters"],
        image: "/cases/yandex-eats-leads.png",
        pattern: "preview-grid-dots",
      },
      {
        name: {
          en: "Freelance-board radar in Telegram",
          ru: "Сбор проектов с фриланс-бирж в Telegram",
        },
        description: {
          en: "New gigs on freelance boards were easy to miss between tabs. A bot watches listings, filters by niche, budget and keywords, dedupes, and sends only the relevant ones to a single Telegram chat.",
          ru: "Новые заказы на биржах легко пропускались между вкладками. Бот следит за лентой, фильтрует по нише, бюджету и ключевым словам, убирает дубли и присылает только релевантное в один Telegram-чат.",
        },
        result: {
          en: "Relevant jobs in seconds — no more F5 across several boards.",
          ru: "Релевантные заказы за секунды — без F5 по нескольким биржам.",
        },
        stack: ["Python", "aiogram", "board APIs / parsing", "dedup rules"],
        image: "/cases/freelance-radar.png",
        pattern: "preview-diag-lines",
      },
    ],
  },
  {
    id: "smm",
    num: "03",
    group: "niche",
    icon: Share2,
    title: {
      en: "SMM automation & content generation",
      ru: "Автоматизация SMM и генерации контента",
    },
    short: {
      en: "Volume and a steady cadence — without driving dozens of accounts by hand.",
      ru: "Объём и ровный график публикаций — без ручного ведения десятков аккаунтов.",
    },
    long: {
      en: "Full account lifecycle: create, warm up, generate content with AI, publish on a schedule. I treat this as a production system — queues, device/proxy rotation, uniqueness checks — not a pile of scripts an intern has to babysit.",
      ru: "Полный цикл жизни аккаунта: создание, прогрев, генерация контента через AI, публикация по расписанию. Это производственная система — очереди, ротация устройств и прокси, контроль уникальности — а не набор скриптов, которые кто-то должен нянчить.",
    },
    projects: [
      {
        name: {
          en: "Pinterest account combine",
          ru: "Бот-комбайн для Pinterest",
        },
        description: {
          en: "Agencies were burning hours on signup, warmup and posting. One pipeline registers accounts, warms them with natural activity, generates creatives and publishes — without a person on every step.",
          ru: "Агентства тратили часы на регистрацию, прогрев и постинг. Один пайплайн регистрирует аккаунты, прогревает естественной активностью, генерирует креативы и публикует — без человека на каждом шаге.",
        },
        result: {
          en: "A pool of accounts running in parallel; posting no longer blocks the team.",
          ru: "Пул аккаунтов в параллельной работе; постинг перестал блокировать команду.",
        },
        stack: ["Python", "Playwright", "AI generation", "scheduler"],
        image: "/cases/pinterest-combine.png",
        pattern: "preview-scanlines",
      },
      {
        name: {
          en: "Instagram / TikTok multi-account with AI",
          ru: "Мультиаккаунтинг Instagram / TikTok с AI-контентом",
        },
        description: {
          en: "A pool of accounts needs texts, covers and scripts every day. The system generates the content, posts on a schedule, and rotates proxy/device fingerprints to keep the pool stable.",
          ru: "Пулу аккаунтов каждый день нужны тексты, обложки и сценарии. Система генерирует контент, публикует по расписанию и ротирует прокси и отпечатки устройств, чтобы пул жил стабильно.",
        },
        result: {
          en: "Demo: AI content loop + scheduled posting across a managed pool.",
          ru: "Демо: цикл AI-контента и автопостинг по пулу аккаунтов.",
        },
        stack: ["Python", "Playwright", "LLM / image gen", "antidetect"],
        demo: true,
        image: "/cases/social-studio.png",
        pattern: "preview-rings",
      },
      {
        name: {
          en: "Telegram channel autopilot",
          ru: "Автопилот для Telegram-канала",
        },
        description: {
          en: "Editors were rewriting the same news by hand. The bot pulls sources, rewrites in a set voice via an LLM, checks uniqueness, and publishes on a schedule.",
          ru: "Редакторы вручную переписывали одни и те же новости. Бот забирает источники, рерайтит в заданном стиле через LLM, проверяет уникальность и публикует по расписанию.",
        },
        result: {
          en: "Demo: a steady daily cadence without a living editor on every post.",
          ru: "Демо: ровный ежедневный график без живого редактора на каждом посте.",
        },
        stack: ["Python", "aiogram", "RSS / site parsing", "LLM"],
        demo: true,
        image: "/cases/tg-autopilot.png",
        pattern: "preview-grid-dots",
      },
    ],
  },
  {
    id: "trading",
    num: "04",
    group: "niche",
    icon: Activity,
    title: {
      en: "Trading bots & AI decision-making",
      ru: "Трейдинг-боты и AI-принятие решений",
    },
    short: {
      en: "The strategy stays yours — the bot watches the market and takes the shot.",
      ru: "Стратегия остаётся вашей — бот следит за рынком и принимает решение.",
    },
    long: {
      en: "Not a script that fires a market order. A decision layer on top of the algorithm: entry, size, and risk from a set of strategies plus an AI read of the tape. Logging, backtests, and kill-switches are part of the product — this is real money.",
      ru: "Не скрипт, который шлёт market-ордер. Слой решения поверх алгоритма: вход, размер и риск из набора стратегий плюс AI-чтение рынка. Логи, бэктесты и аварийные стопы — часть продукта: на кону реальные деньги.",
    },
    projects: [
      {
        name: {
          en: "Autonomous Bybit bot with an AI core",
          ru: "Автономный торговый бот для Bybit с AI-ядром",
        },
        description: {
          en: "The bot chooses whether to enter, sizes the position, and sets trade parameters from a predefined strategy set and an AI read of market context — with hard risk limits.",
          ru: "Бот сам решает, входить ли в позицию, выбирает размер и параметры сделки из заранее заданного набора стратегий и AI-анализа рынка — с жёсткими лимитами риска.",
        },
        result: {
          en: "Architecture and risk controls first; backtested on multi-year history before live.",
          ru: "Сначала архитектура и риск-контроль; бэктест на многолетней истории до боевого запуска.",
        },
        stack: ["Python", "Bybit API", "LLM / ML", "risk engine"],
        image: "/cases/bybit-ai.png",
        pattern: "preview-diag-lines",
      },
      {
        name: {
          en: "Cross-venue arbitrage bot",
          ru: "Арбитражный бот между площадками",
        },
        description: {
          en: "Watches the spread on an asset across several exchanges and desks in real time, and fires only when the edge still holds after fees.",
          ru: "Следит за спредом актива между несколькими биржами и обменниками в реальном времени и исполняет сделку, только если край остаётся после комиссий.",
        },
        result: {
          en: "Demo: multi-API loop with fee-aware execution and a full trade log.",
          ru: "Демо: контур на нескольких API с учётом комиссий и полным логом сделок.",
        },
        stack: ["Python", "asyncio", "multi-API", "risk controls"],
        demo: true,
        image: "/cases/arb-bot.png",
        pattern: "preview-scanlines",
      },
      {
        name: {
          en: "AI signal screener",
          ru: "AI-скринер сигналов для входа",
        },
        description: {
          en: "Scans the market against technical and AI criteria, then sends entry/exit signals to Telegram — with optional one-tap confirm before execution.",
          ru: "Сканирует рынок по техническим и AI-критериям и присылает сигналы входа/выхода в Telegram — с опциональным подтверждением перед исполнением.",
        },
        result: {
          en: "Demo: signals with context in chat, execution only after you confirm.",
          ru: "Демо: сигналы с контекстом в чат, исполнение только после подтверждения.",
        },
        stack: ["Python", "exchange APIs", "LLM", "aiogram"],
        demo: true,
        image: "/cases/signal-screener.png",
        pattern: "preview-rings",
      },
    ],
  },
  {
    id: "dashboards",
    num: "05",
    group: "niche",
    icon: LayoutDashboard,
    title: {
      en: "Dashboards, reporting & BI automation",
      ru: "Дашборды, отчётность и BI-автоматизация",
    },
    short: {
      en: "A live picture of the numbers — without hiring an analyst to stitch spreadsheets.",
      ru: "Живая картина по цифрам — без найма аналитика и ручного сведения таблиц.",
    },
    long: {
      en: "I turn the data you already have into a screen the owner actually opens: shifts, marketplace economics, a single P&L. Collection on a schedule, formulas you can trust, and an alert when a metric steps out of line.",
      ru: "Превращаю данные, которые у вас уже есть, в экран, который собственник реально открывает: смены, юнит-экономика маркетплейсов, единый P&L. Сбор по расписанию, формулы, которым можно верить, и алерт, если метрика ушла за норму.",
    },
    projects: [
      {
        name: {
          en: "Shifts & tips dashboard on Google Sheets",
          ru: "Автономный дашборд смен и чаевых на Google Таблицах",
        },
        description: {
          en: "Shift hours and tips were typed in by hand every week. A Sheets + Apps Script dashboard ingests the forms and builds monthly reporting on its own — no one re-keying rows.",
          ru: "Часы смен и чаевые каждую неделю вбивали руками. Дашборд на Google Sheets и Apps Script забирает формы и сам собирает помесячную отчётность — без повторного ввода строк.",
        },
        result: {
          en: "The monthly close no longer depends on someone updating a sheet by hand.",
          ru: "Месячное закрытие больше не зависит от того, кто обновит таблицу руками.",
        },
        stack: ["Google Apps Script", "Sheets API", "forms", "charts"],
        image: "/cases/sheets-shifts.png",
        pattern: "preview-grid-dots",
      },
      {
        name: {
          en: "WB / Ozon seller dashboard",
          ru: "Дашборд для продавцов маркетплейсов (WB / Ozon)",
        },
        description: {
          en: "Sales, stock and ads lived in separate cabinets. One board pulls marketplace APIs and computes real unit economics after fees, logistics and ads.",
          ru: "Продажи, остатки и реклама жили в разных кабинетах. Один борд забирает API маркетплейсов и считает реальную юнит-экономику после комиссий, логистики и рекламы.",
        },
        result: {
          en: "Demo: true margin by SKU, not the number the marketplace shows.",
          ru: "Демо: живая маржа по SKU, а не цифра, которую показывает кабинет.",
        },
        stack: ["Python", "WB / Ozon API", "Sheets / BI", "cron"],
        demo: true,
        image: "/cases/mp-seller.png",
        pattern: "preview-diag-lines",
      },
      {
        name: {
          en: "Consolidated finance dashboard",
          ru: "Консолидированный финансовый дашборд",
        },
        description: {
          en: "CRM, ad cabinets and payments never sat on one screen. A collector merges them into a single report and fires Telegram alerts when a KPI leaves the band.",
          ru: "CRM, рекламные кабинеты и платежи никогда не сходились на одном экране. Сборщик сводит их в единый отчёт и шлёт алерт в Telegram, если KPI выходит за коридор.",
        },
        result: {
          en: "Demo: one morning report instead of three exports and a pivot.",
          ru: "Демо: один утренний отчёт вместо трёх выгрузок и сводной.",
        },
        stack: ["Python", "API adapters", "Sheets / BI", "Telegram alerts"],
        demo: true,
        image: "/cases/finance-pnl.png",
        pattern: "preview-scanlines",
      },
    ],
  },
  {
    id: "sales",
    num: "06",
    group: "business",
    icon: Funnel,
    title: {
      en: "Sales & CRM automation",
      ru: "Автоматизация продаж и CRM",
    },
    short: {
      en: "Leads stop falling between messenger, socials, and the CRM.",
      ru: "Заявки перестают проваливаться между мессенджером, соцсетями и CRM.",
    },
    long: {
      en: "Inbound from Telegram, WhatsApp and Instagram should become a deal with an owner — not a message someone might see later. I wire messengers to amoCRM / Bitrix24, score the lead, and escalate deals that sit still. First-response time is the metric that moves.",
      ru: "Входящие из Telegram, WhatsApp и Instagram должны становиться сделкой с ответственным — а не сообщением, которое кто-то может увидеть позже. Связываю мессенджеры с amoCRM / Bitrix24, скорю лид и эскалирую сделки, которые зависли. Двигается метрика времени первого касания.",
    },
    projects: [
      {
        name: {
          en: "Messenger leads synced into CRM",
          ru: "Автосинхронизация заявок из мессенджеров в CRM",
        },
        description: {
          en: "Managers were copy-pasting chats into the CRM and losing the first hour. Telegram, WhatsApp and Instagram Direct open a deal automatically and round-robin it to a free owner.",
          ru: "Менеджеры копировали чаты в CRM и теряли первый час. Telegram, WhatsApp и Instagram Direct сами открывают сделку и раздают её свободному ответственному.",
        },
        result: {
          en: "Time-to-first-touch dropped from hours to minutes; nothing sits in a personal chat.",
          ru: "Время до первого касания — с часов до минут; ничего не зависает в личном чате.",
        },
        stack: ["Python", "messenger APIs", "amoCRM / Bitrix24", "assignment queue"],
        image: "/cases/crm-inbox.png",
        pattern: "preview-rings",
      },
      {
        name: {
          en: "AI scoring of inbound leads",
          ru: "AI-скоринг и приоритизация входящих лидов",
        },
        description: {
          en: "Every inquiry looked equally urgent in the pipeline. An AI layer reads the text, sets lead temperature and priority in the CRM, and drafts the first reply for the manager.",
          ru: "В воронке все обращения выглядели одинаково срочными. AI-слой читает текст, ставит «температуру» и приоритет в CRM и готовит менеджеру черновик первого ответа.",
        },
        result: {
          en: "Hot leads surface first; managers stop starting from a cold FAQ.",
          ru: "Горячие лиды всплывают первыми; менеджеры не начинают день с холодного FAQ.",
        },
        stack: ["Python", "LLM", "CRM API", "webhooks"],
        image: "/cases/lead-scoring.png",
        pattern: "preview-grid-dots",
      },
      {
        name: {
          en: "Stale-deal watchdog with escalation",
          ru: "Контроль «зависших» сделок с автоэскалацией",
        },
        description: {
          en: "Deals died in a stage because nobody poked them. A bot watches CRM idle time, nags the owner, and after a second miss — pings the head of sales.",
          ru: "Сделки умирали в стадии, потому что их никто не трогал. Бот следит за простоем в CRM, напоминает ответственному, а при повторном молчании — пишет руководителю отдела.",
        },
        result: {
          en: "Idle deals get a second life instead of quietly rotting in the funnel.",
          ru: "Зависшие сделки получают второй шанс, а не тихо гниют в воронке.",
        },
        stack: ["Python", "CRM API", "scheduler", "Telegram / email"],
        image: "/cases/stale-watchdog.png",
        pattern: "preview-diag-lines",
      },
    ],
  },
  {
    id: "support",
    num: "07",
    group: "business",
    icon: Headset,
    title: {
      en: "Customer-service automation",
      ru: "Автоматизация клиентского сервиса",
    },
    short: {
      en: "Typical tickets close themselves — the rest land on a human with full context.",
      ru: "Типовые обращения закрываются сами — остальное уходит человеку с полным контекстом.",
    },
    long: {
      en: "A full support desk is expensive; a slow reply costs loyalty. I put an AI layer on Telegram / WhatsApp for order status, FAQ and returns, escalate the messy ones, and pull every channel into one queue so nothing dies between tabs.",
      ru: "Полноценный саппорт дорогой, медленный ответ роняет лояльность. Ставлю AI-слой на Telegram / WhatsApp для статуса заказа, FAQ и возвратов, эскалирую сложное и собираю все каналы в одну очередь — чтобы ничего не умирало между вкладками.",
    },
    projects: [
      {
        name: {
          en: "AI support bot with human escalation",
          ru: "AI-бот поддержки с эскалацией на оператора",
        },
        description: {
          en: "Most inbound is “where is my order” and FAQ. The bot closes typical tickets from a knowledge base and hands emotional or odd cases to a human with the full thread.",
          ru: "Большая часть входящих — «где заказ» и FAQ. Бот закрывает типовые обращения по базе знаний и передаёт эмоциональные или странные кейсы человеку вместе со всей перепиской.",
        },
        result: {
          en: "About 70–80% of threads close without an operator; first reply in seconds.",
          ru: "Около 70–80% обращений закрываются без оператора; первый ответ — за секунды.",
        },
        stack: ["Python", "aiogram / WhatsApp API", "LLM", "knowledge base"],
        image: "/cases/support-bot.png",
        pattern: "preview-scanlines",
      },
      {
        name: {
          en: "Unified inbox: mail, socials, messengers",
          ru: "Единая очередь из почты, соцсетей и мессенджеров",
        },
        description: {
          en: "Support was hunting tickets across Gmail, DMs and chats. Everything lands in one queue, auto-tagged by topic and urgency.",
          ru: "Саппорт ловил обращения между почтой, директ и чатами. Всё стекается в одну очередь с авторазметкой по теме и срочности.",
        },
        result: {
          en: "Fewer lost tickets; the team works one list instead of five tabs.",
          ru: "Меньше потерянных обращений; команда работает по одному списку, а не по пяти вкладкам.",
        },
        stack: ["Python", "mail / social APIs", "AI / rule tagging", "helpdesk"],
        image: "/cases/unified-inbox.png",
        pattern: "preview-rings",
      },
      {
        name: {
          en: "NPS / CSAT auto-survey after close",
          ru: "Автосбор обратной связи и отчёт по NPS / CSAT",
        },
        description: {
          en: "Nobody remembered to ask “how was it?” after a ticket. A short survey goes out on close, scores roll into a report, and a bad rating pages someone immediately.",
          ru: "После закрытия обращения никто не вспоминал спросить «как всё прошло». Короткий опрос уходит сам, оценки складываются в отчёт, а негатив сразу будит ответственного.",
        },
        result: {
          en: "Negative scores get a human in minutes, not in next week’s spreadsheet.",
          ru: "Негатив видит человек за минуты, а не в таблице на следующей неделе.",
        },
        stack: ["Python", "CRM / messengers", "Sheets / BI", "alerts"],
        image: "/cases/nps-report.png",
        pattern: "preview-grid-dots",
      },
    ],
  },
  {
    id: "systems",
    num: "08",
    group: "business",
    icon: Unplug,
    title: {
      en: "Integrations & business-system sync",
      ru: "Интеграции и синхронизация бизнес-систем",
    },
    short: {
      en: "Ledger, warehouse, marketplaces and payments — one loop, no copy-paste.",
      ru: "Учётка, склад, маркетплейсы и платежи — один контур, без копипаста.",
    },
    long: {
      en: "When 1C, the warehouse, marketplaces and the acquirer don’t talk, stock and money drift. I build the bus: events, queues, conflict handling, and a log of mismatches — the senior kind of integration, not a one-off Zapier zap.",
      ru: "Когда 1С, склад, маркетплейсы и эквайринг не разговаривают, плывут остатки и деньги. Собираю шину: события, очереди, разбор конфликтов и лог расхождений — интеграция сеньорского уровня, а не разовый сценарий в конструкторе.",
    },
    projects: [
      {
        name: {
          en: "1C ↔ marketplace stock & prices",
          ru: "Синхронизация остатков и цен: 1С ↔ маркетплейсы",
        },
        description: {
          en: "A sale on one channel oversold stock that was already gone. Stock and prices sync between the ledger (1C / MoySklad) and WB / Ozon / Yandex Market so you never sell a ghost SKU.",
          ru: "Продажа на одном канале уводила в минус товар, которого уже не было. Остатки и цены синхронизируются между учёткой (1С / МойСклад) и WB / Ozon / Я.Маркетом — без продажи «призрачного» SKU.",
        },
        result: {
          en: "Overselling stops; sync in minutes instead of a nightly dump.",
          ru: "Овербукинг прекращается; синхронизация за минуты вместо ночной выгрузки.",
        },
        stack: ["Python", "1C / MoySklad API", "WB / Ozon API", "sync queue"],
        image: "/cases/stock-sync.png",
        pattern: "preview-diag-lines",
      },
      {
        name: {
          en: "CRM ↔ warehouse ↔ payments bus",
          ru: "Единая шина CRM ↔ склад ↔ платежи",
        },
        description: {
          en: "Paid orders still waited for someone to reserve stock. A payment event flips the CRM status and reserves the warehouse — order, money and shipment stay in lockstep.",
          ru: "Оплаченные заказы ждали, пока кто-то зарезервирует склад. Событие оплаты меняет статус в CRM и резервирует остаток — заказ, деньги и отгрузка идут синхронно.",
        },
        result: {
          en: "A handful of manual clicks per order disappear; the happy path is hands-off.",
          ru: "С каждого заказа снимается пачка ручных кликов; счастливый путь идёт без человека.",
        },
        stack: ["Python", "webhooks", "REST APIs", "event log"],
        image: "/cases/event-bus.png",
        pattern: "preview-scanlines",
      },
      {
        name: {
          en: "Bank / acquirer vs orders reconciliation",
          ru: "Автосверка платежей с заказами",
        },
        description: {
          en: "Accounting matched the statement to CRM / 1C by eye. The bot pairs incoming payments with orders, closes the matches, and highlights the rest for a human.",
          ru: "Бухгалтерия сверяла выписку с CRM / 1С глазами. Бот сопоставляет поступления с заказами, закрывает совпадения и подсвечивает расхождения для ручной проверки.",
        },
        result: {
          en: "A full day of reconciling becomes an exceptions list.",
          ru: "Целый день сверки превращается в список исключений.",
        },
        stack: ["Python", "bank / acquirer API", "CRM / 1C API", "matching rules"],
        image: "/cases/recon-desk.png",
        pattern: "preview-rings",
      },
    ],
  },
  {
    id: "docs",
    num: "09",
    group: "business",
    icon: FileStack,
    title: {
      en: "Documents & internal workflows",
      ru: "Документооборот и внутренние процессы",
    },
    short: {
      en: "Contracts, approvals and onboarding — without a chain of “remind me tomorrow”.",
      ru: "Договоры, согласования и онбординг — без цепочки «напомни мне завтра».",
    },
    long: {
      en: "Internal ops die in mail threads and side chats. I generate contracts from CRM, route leave and spend requests in Telegram by role and amount, and run new-hire checklists so HR is not the bottleneck.",
      ru: "Внутренняя операционка умирает в цепочках писем и боковых чатах. Генерирую договоры из CRM, гоняю заявки на отпуск и закупки в Telegram по роли и сумме и веду чек-листы новичков — чтобы HR не был узким местом.",
    },
    projects: [
      {
        name: {
          en: "Contracts, invoices, acts from CRM",
          ru: "Автогенерация договоров, счетов и актов из CRM",
        },
        description: {
          en: "A “won” deal still meant a manager building a Word file. A CRM trigger fills a template, issues the PDF, and sends it for signature or payment.",
          ru: "Сделка в статусе «успешно» всё равно означала, что менеджер собирает Word. Триггер в CRM заполняет шаблон, выпускает PDF и отправляет на подпись или оплату.",
        },
        result: {
          en: "Document turnaround in minutes; fewer broken bank details in the PDF.",
          ru: "Документ за минуты; меньше битых реквизитов в PDF.",
        },
        stack: ["Python", "CRM API", "docx / PDF templates", "e-sign"],
        image: "/cases/doc-factory.png",
        pattern: "preview-grid-dots",
      },
      {
        name: {
          en: "Telegram bot for internal approvals",
          ru: "Бот-согласование внутренних заявок",
        },
        description: {
          en: "Leave, purchases and expenses lived in email. An employee files a request in Telegram; the bot routes it by role and amount, records status, and notifies the chain.",
          ru: "Отпуска, закупки и расходы жили в почте. Сотрудник подаёт заявку в Telegram; бот ведёт её по роли и лимиту суммы, фиксирует статус и уведомляет цепочку.",
        },
        result: {
          en: "Approvals stop disappearing; average cycle time shrinks from days to hours.",
          ru: "Заявки перестают теряться; средний цикл — с дней до часов.",
        },
        stack: ["Python", "aiogram", "status machine", "calendar / sheets"],
        image: "/cases/approve-bot.png",
        pattern: "preview-diag-lines",
      },
      {
        name: {
          en: "New-hire onboarding autopilot",
          ru: "Автоматизация онбординга сотрудников",
        },
        description: {
          en: "A new row in HR used to mean a scavenger hunt for access and docs. Adding a person starts a checklist: accounts, papers, intro meetings, and nags to whoever is late.",
          ru: "Новая строка в HR означала квест за доступами и документами. Добавление человека запускает чек-лист: доступы, бумаги, вводные встречи и напоминания тем, кто тормозит.",
        },
        result: {
          en: "Time-to-productive shrinks; fewer steps wait on a forgotten ping.",
          ru: "Выход «в строй» быстрее; меньше шагов, которые ждут забытого пинга.",
        },
        stack: ["Python", "HR system / sheets", "Telegram / email", "scheduler"],
        image: "/cases/onboard-hr.png",
        pattern: "preview-scanlines",
      },
    ],
  },
];
