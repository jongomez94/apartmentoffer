import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { en } from "./en";
import { es } from "./es";
import type { Content } from "./types";

const content: Record<Locale, Content> = {
  en,
  es,
};

export function getContent(locale: string): Content {
  const safeLocale = isValidLocale(locale) ? locale : defaultLocale;
  return content[safeLocale];
}

export type { Content };
