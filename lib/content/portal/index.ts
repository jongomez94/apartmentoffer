import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { portalHomeEn } from "./en";
import { portalHomeEs } from "./es";
import type { PortalHomeContent } from "./types";

const records: Record<Locale, PortalHomeContent> = {
  en: portalHomeEn,
  es: portalHomeEs,
};

export function getPortalHomeContent(locale: string): PortalHomeContent {
  const safe = isValidLocale(locale) ? locale : defaultLocale;
  return records[safe];
}

export type { PortalHomeContent };
