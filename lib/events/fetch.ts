import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import { formatEventRange } from "./calendar";
import type { SiteEvent } from "./types";
import type { EventsContent } from "@/lib/content/events/types";

type EventRow = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  summary: string | null;
  description: string | null;
  tag: string | null;
  starts_at: string;
  ends_at: string | null;
  location_note: string | null;
  image_url: string | null;
  is_published: boolean;
};

function mapRow(row: EventRow, locale: Locale): SiteEvent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? "",
    dateLabel: formatEventRange(row.starts_at, row.ends_at, locale),
    description: row.description ?? "",
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    tag: row.tag ?? undefined,
    locationNote: row.location_note ?? undefined,
    imageUrl: row.image_url ?? undefined,
  };
}

export async function fetchPublishedEvents(locale: string): Promise<SiteEvent[] | null> {
  const supabase = createSupabaseServerClient();
  const safe: Locale = isValidLocale(locale) ? locale : defaultLocale;
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("locale", safe)
    .eq("is_published", true)
    .order("starts_at", { ascending: true });

  if (error) return null;
  if (!data) return null;
  return (data as EventRow[]).map((row) => mapRow(row, safe));
}

export async function fetchPublishedEventBySlug(
  locale: string,
  slug: string,
): Promise<SiteEvent | null> {
  const supabase = createSupabaseServerClient();
  const safe: Locale = isValidLocale(locale) ? locale : defaultLocale;
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("locale", safe)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) return null;
  if (!data) return null;
  return mapRow(data as EventRow, safe);
}

export function staticFallbackEvents(content: EventsContent, locale: Locale): SiteEvent[] {
  const y = new Date().getFullYear();
  const m = new Date().getMonth() + 1;
  return content.upcoming.events.map((ev, i) => {
    const day = Math.min(4 + i * 9, 28);
    const startsAt = new Date(Date.UTC(y, m - 1, day, 18, 0, 0)).toISOString();
    return {
      id: `static-${locale}-${i}`,
      slug: null,
      title: ev.title,
      summary: "",
      dateLabel: ev.date,
      description: ev.description,
      startsAt,
      endsAt: null,
      tag: ev.tag,
    };
  });
}
