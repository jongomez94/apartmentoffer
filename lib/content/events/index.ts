import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { eventsEn } from "./en";
import { eventsEs } from "./es";
import type { EventsContent } from "./types";

const records: Record<Locale, EventsContent> = {
  en: eventsEn,
  es: eventsEs,
};

export function getEventsContent(locale: string): EventsContent {
  const safe = isValidLocale(locale) ? locale : defaultLocale;
  return records[safe];
}

export type { EventsContent };
