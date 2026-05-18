import { dictionaries } from "./dictionaries";
import { locales, type Locale } from "./types";

const localeSet = new Set<string>(locales);

export function getBuildLocale(): Locale {
  const locale = process.env.BUILD_LOCALE ?? "en";

  if (localeSet.has(locale)) {
    return locale as Locale;
  }

  throw new Error(
    `Invalid BUILD_LOCALE "${locale}". Expected one of: ${locales.join(", ")}.`
  );
}

export function getDictionary() {
  return dictionaries[getBuildLocale()];
}

export type { Dictionary, Locale } from "./types";
