import { ContentProvider } from "@/context/ContentContext";
import { getContent } from "@/lib/content";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

export default async function ApartmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <ContentProvider content={content} locale={locale as Locale}>
      {children}
    </ContentProvider>
  );
}
