import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { gardenStudioEn } from "./en";
import { gardenStudioEs } from "./es";
import type { GardenStudioContent } from "./types";

const records: Record<Locale, GardenStudioContent> = {
  en: gardenStudioEn,
  es: gardenStudioEs,
};

export function getGardenStudioContent(locale: string): GardenStudioContent {
  const safe = isValidLocale(locale) ? locale : defaultLocale;
  return records[safe];
}

export type { GardenStudioContent };
