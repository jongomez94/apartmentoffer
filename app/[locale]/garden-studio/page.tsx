import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getGardenStudioContent } from "@/lib/content/garden-studio";
import GardenStudioView from "@/components/garden-studio/GardenStudioView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getGardenStudioContent(locale);
  return {
    title: c.metaTitle.split("|")[0].trim(),
    description: c.metaDescription,
  };
}

export default async function GardenStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getGardenStudioContent(locale);

  return <GardenStudioView content={content} locale={locale as Locale} />;
}
