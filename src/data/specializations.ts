import type { Localized } from "@/i18n";

export type SpecProject = {
  name: Localized;
  description: Localized;
  stack: string[];
  /** класс CSS-паттерна для абстрактного превью в чёрно-красной гамме */
  pattern: "preview-grid-dots" | "preview-diag-lines" | "preview-scanlines" | "preview-rings";
};

export type Specialization = {
  id: string;
  num: string;
  title: Localized;
  short: Localized;
  long: Localized;
  projects: SpecProject[];
};

export const specializations: Specialization[] = [
  {
    id: "bots",
    num: "01",
    title: {
      en: "Telegram / Discord bots",
      ru: "Telegram / Discord-боты",
    },
    short: {
      en: "Bots that sell, book, and reply — while you sleep.",
      ru: "Боты, которые продают, записывают и отвечают — пока вы спите.",
    },
    long: {
      en: "I design bots as full products: conversation flows, payments, CRM and spreadsheet integrations, admin panels, and analytics. They hold up under thousands of users a day instead of falling over after the first broadcast. aiogram for Telegram, discord.py / discord.js for Discord — plus queues, webhooks, and monitoring out of the box.",
      ru: "Проектирую ботов как полноценные продукты: сценарии диалогов, приём платежей, интеграции с CRM и таблицами, админ-панели и аналитика. Выдерживают нагрузку в тысячи пользователей в день, а не разваливаются после первой рассылки. aiogram для Telegram, discord.py / discord.js для Discord — плюс очереди, вебхуки и мониторинг из коробки.",
    },
    projects: [
      {
        name: {
          en: "Booking bot for a clinic network",
          ru: "Бот записи для сети клиник",
        },
        description: {
          en: "Appointments with 30+ specialists, live calendar from the clinic system, reminders and rescheduling right in chat. No-shows dropped 35%, front desk got rid of 60% of inbound calls.",
          ru: "Запись к 30+ специалистам с живым расписанием из МИС, напоминаниями и переносом слотов прямо в чате. Доля неявок снизилась на 35%, администраторы освободились от 60% входящих звонков.",
        },
        stack: ["Python", "aiogram", "PostgreSQL", "Redis"],
        pattern: "preview-grid-dots",
      },
      {
        name: {
          en: "Community Discord bot, 40,000 members",
          ru: "Discord-бот комьюнити на 40 000 участников",
        },
        description: {
          en: "Auto-moderation, role assignment via an onboarding quiz, anti-cheat for giveaways, and an activity digest for the team. Manual moderation went from 5 hours a day to the occasional review.",
          ru: "Автомодерация, выдача ролей по онбординг-квизу, античит для розыгрышей и дайджест активности для команды. Ручная модерация сократилась с 5 часов в день до точечных разборов.",
        },
        stack: ["Python", "discord.py", "Docker", "MongoDB"],
        pattern: "preview-diag-lines",
      },
      {
        name: {
          en: "Sales quiz bot with payments",
          ru: "Продающий квиз-бот с оплатой",
        },
        description: {
          en: "Six-question lead qualification, segmentation, checkout inside the bot, and a deal pushed to CRM with full context. Subscriber-to-paid conversion went from 1.9% to 4.7%.",
          ru: "Квалификация лидов по 6 вопросам, сегментация, оплата прямо в боте и передача сделки в CRM с полным контекстом. Конверсия из подписчика в оплату выросла с 1.9% до 4.7%.",
        },
        stack: ["Python", "aiogram", "ЮKassa API", "amoCRM API"],
        pattern: "preview-rings",
      },
    ],
  },
  {
    id: "scraping",
    num: "02",
    title: {
      en: "Web scraping & data extraction",
      ru: "Веб-скрапинг и парсинг данных",
    },
    short: {
      en: "Reliable data pipelines from sites that don't have an API.",
      ru: "Стабильные пайплайны данных с сайтов, у которых нет API.",
    },
    long: {
      en: "Playwright is the main tool: I work around anti-bot defenses, dynamic JS, proxy rotation, and fingerprints. This isn't a one-off script — it's a pipeline: queues, retries, validation, alerts when the markup changes. Data lands where people actually use it — a database, a spreadsheet, or a dashboard.",
      ru: "Playwright — основной инструмент: обхожу антибот-защиты, работаю с динамическим JS-контентом, ротацией прокси и фингерпринтов. Строю не «скрипт на раз», а конвейер: очереди, ретраи, валидация данных, алерты при изменении вёрстки. Данные приезжают туда, где ими пользуются — в базу, таблицы или дашборд.",
    },
    projects: [
      {
        name: {
          en: "Price monitoring across 12 marketplaces",
          ru: "Мониторинг цен с 12 маркетплейсов",
        },
        description: {
          en: "Competitor prices and stock via Playwright with rotating proxies, export to Google Sheets, and Telegram alerts when a price moves more than 5%. A weekly analysis that used to take 6 hours now runs on its own.",
          ru: "Сбор цен и остатков конкурентов через Playwright с ротацией прокси, выгрузка в Google Sheets и Telegram-алерты при отклонении цены больше 5%. Еженедельный анализ сократился с 6 часов ручного труда до автономного процесса.",
        },
        stack: ["Python", "Playwright", "Google Sheets API", "Telegram Bot API"],
        pattern: "preview-scanlines",
      },
      {
        name: {
          en: "Niche tender aggregator",
          ru: "Агрегатор тендеров по нише",
        },
        description: {
          en: "Daily crawl of 8 platforms, deduping and scoring tenders by keywords and budget, delivered to the sales team's Telegram channel by 9 a.m. They stopped missing relevant bids.",
          ru: "Ежедневный обход 8 площадок, дедупликация и скоринг тендеров по ключевым словам и бюджету, доставка в Telegram-канал отдела продаж к 9 утра. Команда перестала пропускать релевантные закупки.",
        },
        stack: ["Python", "Playwright", "PostgreSQL", "Celery"],
        pattern: "preview-grid-dots",
      },
      {
        name: {
          en: "Review scraping for brand analytics",
          ru: "Парсинг отзывов для бренд-аналитики",
        },
        description: {
          en: "50,000+ reviews a month from marketplaces and maps, sentiment tagging, a trend board by product. The product team caught a defective batch in 3 days instead of waiting for a quarterly report.",
          ru: "Сбор 50 000+ отзывов в месяц с маркетплейсов и карт, разметка тональности, витрина трендов по товарам. Продакт-команда получила сигнал о браке партии за 3 дня вместо квартального отчёта.",
        },
        stack: ["Python", "Playwright", "Pandas", "Plotly"],
        pattern: "preview-diag-lines",
      },
    ],
  },
  {
    id: "integrations",
    num: "03",
    title: {
      en: "Service integrations",
      ru: "Интеграции между сервисами",
    },
    short: {
      en: "CRM, payments, spreadsheets, and messengers — one connected loop.",
      ru: "CRM, платёжки, таблицы и мессенджеры — в один связный контур.",
    },
    long: {
      en: "Disconnected tools mean copy-paste and errors at the seams. I wire CRM, payment providers, Google Workspace, and messengers through REST/webhooks and n8n: events flow on their own, statuses stay in sync, and nobody has to “move it to the spreadsheet.” Every integration ships with logs, retries, and an alert when something breaks.",
      ru: "Разрозненные сервисы — это ручной перенос данных и ошибки на стыках. Я связываю CRM, платёжные системы, Google Workspace и мессенджеры через REST/Webhook API и n8n: события текут сами, статусы синхронизированы, и никто не забывает «перенести в табличку». Каждая интеграция — с логами, ретраями и алертом, если что-то пошло не так.",
    },
    projects: [
      {
        name: {
          en: "Payments loop for an online school",
          ru: "Контур оплат для онлайн-школы",
        },
        description: {
          en: "Payment provider, CRM, and Telegram in one flow: a charge unlocks the course, opens a deal, and starts the welcome sequence in 20 seconds. Manual access grants disappeared; payments lost “in the cracks” went from 3% to zero.",
          ru: "Связка платёжной системы, CRM и Telegram: оплата открывает доступ к курсу, создаёт сделку и запускает welcome-цепочку за 20 секунд. Ручная выдача доступов исчезла, потери оплат «в стыках» — с 3% до нуля.",
        },
        stack: ["Python", "FastAPI", "Stripe API", "amoCRM API"],
        pattern: "preview-rings",
      },
      {
        name: {
          en: "Inventory sync across three sales channels",
          ru: "Синхронизация склада и трёх каналов продаж",
        },
        description: {
          en: "A single stock service between a 1C-style ledger, an online store, and two marketplaces: updates in 90 seconds instead of an overnight dump. Overselling stopped completely.",
          ru: "Единый сервис остатков между 1С-подобной учёткой, интернет-магазином и двумя маркетплейсами: обновление за 90 секунд вместо ночной выгрузки. Овербукинг товаров прекратился полностью.",
        },
        stack: ["Python", "REST API", "Webhooks", "Redis"],
        pattern: "preview-grid-dots",
      },
      {
        name: {
          en: "n8n hub for an agency",
          ru: "n8n-хаб для агентства",
        },
        description: {
          en: "40+ n8n scenarios: leads from forms and ads into CRM, invoices to accounting, client reports on a schedule. A team of 12 saves 80+ hours a month, combined.",
          ru: "40+ сценариев на n8n: лиды из форм и рекламы в CRM, счета в бухгалтерию, отчёты клиентам по расписанию. Команда из 12 человек экономит суммарно 80+ часов в месяц.",
        },
        stack: ["n8n", "Google Workspace", "Telegram Bot API", "PostgreSQL"],
        pattern: "preview-scanlines",
      },
    ],
  },
  {
    id: "rpa",
    num: "04",
    title: {
      en: "RPA & business process automation",
      ru: "RPA и автоматизация бизнес-процессов",
    },
    short: {
      en: "Scripts instead of someone copying data between windows.",
      ru: "Скрипты вместо сотрудника, копирующего данные между окнами.",
    },
    long: {
      en: "I take over the processes where a person is acting as a living API: filling forms, generating documents, moving data between systems, recurring reports. Python + Playwright/Selenium RPA jobs run on a schedule, don't get sick, and don't mistype at 3 a.m. They usually pay for themselves in the first two or three months.",
      ru: "Забираю у бизнеса процессы, где человек выполняет роль «живого API»: заполнение форм, формирование документов, разнос данных по системам, регулярные отчёты. RPA-скрипты на Python + Playwright/Selenium работают по расписанию, не болеют и не ошибаются в третьем часу ночи. Окупаются обычно за первые 2–3 месяца.",
    },
    projects: [
      {
        name: {
          en: "Logistics document workflow",
          ru: "Автоматизация документооборота логистики",
        },
        description: {
          en: "A robot builds invoices, acts, and waybills from incoming orders, files them, and sends them to counterparties. 400+ documents a week with no one in the loop; bank-detail errors disappeared.",
          ru: "Робот формирует счета, акты и транспортные накладные из заявок, раскладывает по папкам и отправляет контрагентам. 400+ документов в неделю без участия человека, ошибки в реквизитах исчезли.",
        },
        stack: ["Python", "Playwright", "Google Drive API", "Jinja2"],
        pattern: "preview-diag-lines",
      },
      {
        name: {
          en: "Overnight reconciliation for finance",
          ru: "Ночная сверка для финансового отдела",
        },
        description: {
          en: "A script matches bank, acquirer, and CRM transactions, flags mismatches, and drops a ready report in Slack by 8 a.m. Accounting went from a full day of reconciling to 30 minutes of exceptions.",
          ru: "Скрипт сверяет транзакции банка, эквайринга и CRM, размечает расхождения и к 8 утра кладёт готовый отчёт в Slack. Бухгалтерия сократила сверку с целого дня до 30 минут проверки исключений.",
        },
        stack: ["Python", "Pandas", "Bank API", "cron"],
        pattern: "preview-rings",
      },
      {
        name: {
          en: "Inbound order processing from email",
          ru: "Обработка входящих заявок с почты",
        },
        description: {
          en: "Parses PDF and Excel attachments, extracts line items, creates orders in the ledger, and replies with a confirmation. Response time fell from 3 hours to 4 minutes.",
          ru: "Парсинг вложений из писем (PDF, Excel), извлечение позиций, создание заказов в учётной системе и ответ клиенту с подтверждением. Время реакции на заявку упало с 3 часов до 4 минут.",
        },
        stack: ["Python", "IMAP", "Celery", "PostgreSQL"],
        pattern: "preview-grid-dots",
      },
    ],
  },
  {
    id: "dashboards",
    num: "05",
    title: {
      en: "Real-time dashboards & analytics",
      ru: "Дашборды и аналитика в реальном времени",
    },
    short: {
      en: "Live business metrics instead of a weekly Excel dump.",
      ru: "Живые метрики бизнеса вместо еженедельной выгрузки в Excel.",
    },
    long: {
      en: "I build custom dashboards on top of the company's real data: sales, operations, marketing, finance. Front-end in React/Next.js with Recharts or Plotly; data from databases, APIs, and spreadsheets through a dedicated aggregation layer. Not another BI tool nobody opens — a working screen the team lives in every day.",
      ru: "Собираю кастомные дашборды поверх реальных данных компании: продажи, операционка, маркетинг, финансы. Фронтенд на React/Next.js с Recharts или Plotly, данные — из баз, API и таблиц через собственный слой агрегации. Не «ещё один BI, который никто не открывает», а рабочий экран, по которому команда живёт каждый день.",
    },
    projects: [
      {
        name: {
          en: "Ops screen for a delivery network",
          ru: "Операционный экран сети доставки",
        },
        description: {
          en: "Live order map, courier load, SLA by zone, and alerts when things dip — refresh every 30 seconds. Average dispatcher response to an incident dropped by a factor of three.",
          ru: "Живая карта заказов, нагрузка на курьеров, SLA по зонам и алерты при просадке — обновление каждые 30 секунд. Среднее время реакции диспетчеров на инцидент сократилось втрое.",
        },
        stack: ["Next.js", "Recharts", "FastAPI", "PostgreSQL"],
        pattern: "preview-scanlines",
      },
      {
        name: {
          en: "P&L dashboard for founders",
          ru: "P&L-дашборд для founders",
        },
        description: {
          en: "Auto-collects revenue, spend, and unit economics from the bank, CRM, and ad accounts into one screen with trends. Owners see margin by line of business day by day, not at the end of the quarter.",
          ru: "Автосбор выручки, расходов и юнит-экономики из банка, CRM и рекламных кабинетов в единый экран с трендами. Собственники видят маржинальность по направлениям день в день, а не в конце квартала.",
        },
        stack: ["Python", "Pandas", "Next.js", "Chart.js"],
        pattern: "preview-rings",
      },
      {
        name: {
          en: "Agency marketing board",
          ru: "Маркетинг-борд агентства",
        },
        description: {
          en: "A single view across 20+ client projects: spend, leads, CPL, and campaign status with alerts on anomalies. Reporting calls shrank from an hour to 15 minutes — everything is already on screen.",
          ru: "Сквозная витрина по 20+ клиентским проектам: расходы, лиды, CPL и статусы кампаний с алертами при аномалиях. Отчётные созвоны сократились с часа до 15 минут — всё уже на экране.",
        },
        stack: ["TypeScript", "Next.js", "Plotly", "Google Ads API"],
        pattern: "preview-diag-lines",
      },
    ],
  },
  {
    id: "workspace",
    num: "06",
    title: {
      en: "Google Workspace automation",
      ru: "Google Workspace автоматизация",
    },
    short: {
      en: "Apps Script that turns Sheets and Docs into a mini-ERP.",
      ru: "Apps Script превращает Таблицы и Документы в мини-ERP.",
    },
    long: {
      en: "Google Workspace is an underrated automation platform. With Apps Script I connect Sheets, Docs, Forms, Calendar, and Gmail: document generation, approvals, reports, and notifications — no extra SaaS, no monthly fee. Ideal for teams already living in Google; you feel it in the first week.",
      ru: "Google Workspace — недооценённая платформа автоматизации. На Apps Script я строю связки Таблиц, Документов, Форм, Календаря и Gmail: автогенерация документов, согласования, отчёты и уведомления без сторонних сервисов и абонентской платы. Идеально для команд, которые уже живут в Google — эффект заметен в первую же неделю.",
    },
    projects: [
      {
        name: {
          en: "Commercial proposal generator",
          ru: "Генератор коммерческих предложений",
        },
        description: {
          en: "A manager fills a row in Sheets — the script builds a proposal from a Docs template, converts it to PDF, and sends it to the client with a copy in CRM. Prep time went from 40 minutes to 2.",
          ru: "Менеджер заполняет строку в Таблице — скрипт собирает КП из шаблона Документа, конвертирует в PDF и отправляет клиенту с копией в CRM. Подготовка КП сократилась с 40 минут до 2.",
        },
        stack: ["Apps Script", "Google Docs API", "Gmail API"],
        pattern: "preview-grid-dots",
      },
      {
        name: {
          en: "Leave and schedule approvals",
          ru: "Согласование отпусков и графиков",
        },
        description: {
          en: "Form → automatic overlap check by team → one-click manager approval from email → write to Calendar and the timesheet. HR stopped maintaining three parallel spreadsheets.",
          ru: "Форма → автоматическая проверка пересечений по отделу → согласование руководителем в один клик из письма → запись в Календарь и табель. HR перестал вести три параллельные таблицы.",
        },
        stack: ["Apps Script", "Google Calendar API", "Google Forms"],
        pattern: "preview-scanlines",
      },
      {
        name: {
          en: "Project budget control",
          ru: "Бюджетный контроль проектов",
        },
        description: {
          en: "A script pulls bank exports into a master sheet, checks them against project budgets, and alerts leads when spend crosses 80% of the cap. Overruns show up weeks before month-end close.",
          ru: "Скрипт стягивает расходы из выгрузок банка в мастер-таблицу, сверяет с бюджетами проектов и шлёт руководителям алерт при превышении 80% лимита. Перерасходы ловятся за недели до закрытия месяца.",
        },
        stack: ["Apps Script", "Google Sheets API", "Telegram Bot API"],
        pattern: "preview-rings",
      },
    ],
  },
];
