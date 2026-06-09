import { ContentProvider } from "@/context/ContentContext";
import { buildGardenStudioPageContent } from "@/lib/content/garden-studio/page-content";
import { getGardenStudioContent } from "@/lib/content/garden-studio";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

export default async function GardenStudioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const gs = getGardenStudioContent(locale);
  const content = buildGardenStudioPageContent(gs, locale as Locale);

  return (
    <ContentProvider content={content} locale={locale as Locale}>
      {children}
    </ContentProvider>
  );
}
