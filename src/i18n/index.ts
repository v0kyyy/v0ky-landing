import { en, type Dictionary } from "./en";
import { ru } from "./ru";
import type { Locale } from "./config";

export { defaultLocale, localeStorageKey, locales } from "./config";
export type { Locale, Localized } from "./config";
export type { Dictionary };

export const dictionaries: Record<Locale, Dictionary> = { en, ru };
