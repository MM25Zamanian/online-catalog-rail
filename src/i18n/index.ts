import { dictionaries } from "./dictionaries";
import { defaultLocale, locales, type Locale } from "./types";

const localeSet = new Set<string>(locales);

export function isLocale(value: string): value is Locale {
  return localeSet.has(value);
}

export function resolveLocale(value: string | undefined): Locale {
  if (value && isLocale(value)) {
    return value;
  }

  return defaultLocale;
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type { Dictionary, Locale } from "./types";
