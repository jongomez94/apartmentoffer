import EventNavProvider from "@/components/events/EventNavProvider";
import { isValidLocale } from "@/lib/i18n/config";
import { defaultLocale } from "@/lib/i18n/config";

export default async function EventsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safe = isValidLocale(locale) ? locale : defaultLocale;

  return <EventNavProvider locale={safe}>{children}</EventNavProvider>;
}
