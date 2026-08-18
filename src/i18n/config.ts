export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeStorageKey = "v0ky-locale";

export type Localized<T = string> = Record<Locale, T>;
