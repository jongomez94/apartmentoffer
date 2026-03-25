import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/lib/i18n/config";
import SiteHeader from "@/components/SiteHeader";
import WhatsAppButton from "@/components/WhatsAppButton";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "Casa Portal de la Montaña",
    template: "%s · Casa Portal de la Montaña",
  },
  description:
    "Holistic mountain sanctuary in Los Planes de Renderos—wellness, nature, and conscious living near San Salvador.",
};

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

  return (
    <>
      <SiteHeader />
      {children}
      <WhatsAppButton />
    </>
  );
}
