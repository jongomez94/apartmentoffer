import type { Locale } from "@/lib/i18n/config";

const copy: Record<
  Locale,
  { title: string; description: string; heroTitle: string; heroSub: string; intro: string }
> = {
  en: {
    title: "Guests Experiences",
    description:
      "Stories from people who stayed at Casa Portal de la Montaña—the apartment, garden studio, and gatherings.",
    heroTitle: "Guests Experiences",
    heroSub:
      "Real voices from the mountain—short stays, slow weeks, and the details that stayed with them.",
    intro:
      "We’re grateful when guests share how this place met them. More stories will appear here as the community grows.",
  },
  es: {
    title: "Experiencias de huéspedes",
    description:
      "Relatos de quienes se hospedaron en Casa Portal de la Montaña—apartamento, estudio del jardín y encuentros.",
    heroTitle: "Experiencias de huéspedes",
    heroSub:
      "Voces reales desde la montaña—estadías cortas, semanas lentas y los detalles que se quedaron.",
    intro:
      "Agradecemos cuando comparten cómo este lugar los encontró. Irán sumándose más relatos conforme crece la comunidad.",
  },
};

export function getGuestExperiencesPageCopy(locale: Locale) {
  return copy[locale];
}
