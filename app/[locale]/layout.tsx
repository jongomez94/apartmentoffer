import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { isValidLocale, locales } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { ContentProvider } from "@/context/ContentContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppButton from "@/components/WhatsAppButton";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(locale);
  const isSpanish = locale === "es";
  return {
    title: isSpanish
      ? "Casa Portal de la Montaña | Vida en la montaña en San Salvador"
      : "Casa Portal de la Montaña | Mountain Living in San Salvador",
    description: isSpanish
      ? "Apartamento privado en la montaña en una comunidad holística cerrada. Vida consciente, naturaleza y claridad mental en Los Planes de Renderos."
      : "A private mountain apartment in a peaceful holistic gated community. Conscious living, nature, and mental clarity in Los Planes de Renderos.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const content = getContent(locale);

  return (
    <ContentProvider content={content} locale={locale as Locale}>
      <LanguageSwitcher />
      {children}
      <WhatsAppButton />
    </ContentProvider>
  );
}
