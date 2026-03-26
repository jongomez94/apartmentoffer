import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { guestStoriesEn } from "./data-en";
import { guestStoriesEs } from "./data-es";
import { fetchGuestStoriesFromSupabase } from "./fetch";
import type { GuestStory } from "./types";

export type { GuestStory };

function getGuestStoriesStatic(locale: string): GuestStory[] {
  const safe: Locale = isValidLocale(locale) ? locale : defaultLocale;
  return safe === "es" ? guestStoriesEs : guestStoriesEn;
}

/**
 * Loads published guest stories from Supabase when env is configured; otherwise static JSON.
 */
export async function getGuestStories(locale: string): Promise<GuestStory[]> {
  const fromDb = await fetchGuestStoriesFromSupabase(locale);
  if (fromDb !== null && fromDb.length > 0) return fromDb;
  return getGuestStoriesStatic(locale);
}
