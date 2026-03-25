import type { Locale } from "@/lib/i18n/config";

const WHATSAPP_NUMBER = "18034202923";

const messages: Record<Locale, string> = {
  en: "Hi, I'm interested in Casa Portal de la Montaña.",
  es: "Hola, me interesa Casa Portal de la Montaña.",
};

export function getWhatsAppUrl(locale: Locale): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[locale])}`;
}

export function getWhatsAppNumber(): string {
  return WHATSAPP_NUMBER;
}
