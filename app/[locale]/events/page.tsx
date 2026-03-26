import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getEventsContent } from "@/lib/content/events";
import EventsView from "@/components/events/EventsView";
import { fetchPublishedEvents, staticFallbackEvents } from "@/lib/events/fetch";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getEventsContent(locale);
  return {
    title: c.metaTitle.split("|")[0].trim(),
    description: c.metaDescription,
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getEventsContent(locale);
  const safe = locale as Locale;
  const fromDb = await fetchPublishedEvents(locale);
  const hasDbRows = fromDb !== null && fromDb.length > 0;
  const events = hasDbRows ? fromDb : staticFallbackEvents(content, safe);
  const calendarEnabled = hasDbRows;

  return (
    <EventsView content={content} locale={safe} events={events} calendarEnabled={calendarEnabled} />
  );
}
