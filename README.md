# v0ky.dev — портфолио Vladimir Chireev (v0ky)

Одностраничный лендинг-портфолио Fullstack Automation Engineer: GSAP + ScrollTrigger + SplitText, Lenis-смус-скролл, сфера стека в hero и кастомный курсор.

## Стек

- **Next.js 16 (App Router) + TypeScript**
- **GSAP 3.15** (ScrollTrigger, SplitText) — основной анимационный движок
- **Lenis** — физика смус-скролла, синхронизирован с `gsap.ticker`
- **Framer Motion** — точечные UI-микровзаимодействия (аккордеон специализации, мобильное меню, drag-карусель)
- **Tailwind CSS 4** — раскладка и утилиты
- **Lucide React** — иконки

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшен-сборка
npm run start    # запуск продакшен-сборки
```

## Где что редактировать

### Контент — папка `src/data/`

| Файл                 | Что внутри                                              |
| -------------------- | ------------------------------------------------------- |
| `site.ts`            | Имя, город, ссылки на соцсети, email, пункты навигации  |
| `stack.ts`           | Текст «Обо мне», категории стека, KPI-цифры             |
| `experience.ts`      | Места работы для timeline                               |
| `specializations.ts` | 6 ниш специализации + примеры проектов                  |
| `testimonials.ts`    | Отзывы клиентов                                         |
| `kwork.ts`           | Таймлайн заказов и навыков на Kwork                     |

### Цвета

Design tokens объявлены в `src/app/globals.css` в блоке `@theme` (Tailwind 4):
`--color-bg`, `--color-accent` (фирменный красный `#e8332a`), `--color-surface` и т.д.
Меняются в одном месте — применяются везде.

### Шрифты

Подключены через `next/font` в `src/app/layout.tsx`:

- **Unbounded** — крупные display-заголовки
- **Inter Tight** — основной текст
- **JetBrains Mono** — терминальные акценты/лейблы

### Анимации

- Фундамент (Lenis + GSAP ticker) — `src/components/providers/SmoothScrollProvider.tsx`
- Прелоадер — `src/components/ui/Preloader.tsx` (показывается 1 раз за сессию, ключ `sessionStorage`)
- Кастомный курсор — `src/components/ui/Cursor.tsx` (только устройства с мышью)
- Сфера стека — `src/components/sections/IconCloud.tsx`
- Текстовые reveal — `src/components/ui/SplitReveal.tsx`

При `prefers-reduced-motion: reduce` тяжёлые анимации (пиннинг, посимвольные reveal, смус-скролл) автоматически отключаются.
