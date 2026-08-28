export const site = {
  name: "Vladimir Chireev",
  brand: "v0ky",
  domain: "v0ky.dev",
  url: "https://v0ky.dev",
  role: "Fullstack Automation Engineer",
  links: {
    github: "https://github.com/v0kyyy",
    telegram: "https://t.me/v0kyyy",
    kwork: {
      en: "https://kwork.com/user/v0kyyy",
      ru: "https://kwork.ru/user/v0kyyy",
    },
    // [TODO: email — заменить на реальный]
    email: "mailto:hello@v0ky.dev",
    resume: {
      en: "/resume-en.pdf",
      ru: "/resume-ru.pdf",
    },
  },
    nav: ["about", "experience", "cases", "contact"] as const,
} as const;

export type NavId = (typeof site.nav)[number];
