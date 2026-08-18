export const site = {
  name: "Vladimir Chireev",
  brand: "v0ky",
  domain: "v0ky.dev",
  url: "https://v0ky.dev",
  role: "Fullstack Automation Engineer",
  links: {
    // [TODO: ссылки — заменить на реальные профили]
    github: "https://github.com/v0ky",
    telegram: "https://t.me/v0ky",
    kwork: {
      en: "https://kwork.com/user/v0kyyy",
      ru: "https://kwork.ru/user/v0kyyy",
    },
    // [TODO: email — заменить на реальный]
    email: "mailto:hello@v0ky.dev",
    // [TODO: PDF-резюме — положить файл в /public и обновить путь]
    resume: "/resume.pdf",
  },
    nav: ["about", "experience", "cases", "contact"] as const,
} as const;

export type NavId = (typeof site.nav)[number];
