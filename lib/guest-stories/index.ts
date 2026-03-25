import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { guestStoriesEn } from "./data-en";
import { guestStoriesEs } from "./data-es";
import type { GuestStory } from "./types";

export type { GuestStory };

/** Static list today; swap implementation for Supabase without changing callers. */
export function getGuestStories(locale: string): GuestStory[] {
  const safe: Locale = isValidLocale(locale) ? locale : defaultLocale;
  return safe === "es" ? guestStoriesEs : guestStoriesEn;
}

/**
 * Future (example):
 * export async function getGuestStories(locale: string): Promise<GuestStory[]> {
 *   if (process.env.NEXT_PUBLIC_SUPABASE_GUEST_STORIES === "true") {
 *     const { data } = await supabase.from("guest_stories").select("*").eq("locale", locale);
 *     return mapRowsToGuestStories(data);
 *   }
 *   return getGuestStoriesStatic(locale);
 * }
 */
