import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getEventsContent } from "@/lib/content/events";
import EventDetailView from "@/components/events/EventDetailView";
import { fetchPublishedEventBySlug } from "@/lib/events/fetch";

/** Read Supabase on every request (Vercel/local), not only at build time. */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const event = await fetchPublishedEventBySlug(locale, slug);
  const base = getEventsContent(locale);
  if (!event) {
    return { title: base.metaTitle.split("|")[0].trim() };
  }
  const desc =
    event.summary ||
    (event.description ? event.description.slice(0, 160) : base.metaDescription);
  return {
    title: `${event.title} | Casa Portal de la Montaña`,
    description: desc,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const event = await fetchPublishedEventBySlug(locale, slug);
  if (!event) notFound();

  const backLabel = locale === "es" ? "Todos los eventos" : "All events";

  return (
    <EventDetailView event={event} locale={locale as Locale} backLabel={backLabel} />
  );
}
