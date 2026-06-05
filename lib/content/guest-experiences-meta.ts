import type { Locale } from "@/lib/i18n/config";

const copy: Record<
  Locale,
  { title: string; description: string; heroTitle: string; heroSub: string }
> = {
  en: {
    title: "Guests Experiences",
    description:
      "Reviews and stories from Casa Portal de la Montaña.",
    heroTitle: "Guests Experiences",
    heroSub: "What visitors and guests share about their time here.",
  },
  es: {
    title: "Experiencias de huéspedes",
    description:
      "Reseñas y relatos de Casa Portal de la Montaña.",
    heroTitle: "Experiencias de huéspedes",
    heroSub: "Lo que visitantes y huéspedes comparten de su estadía.",
  },
};

export function getGuestExperiencesPageCopy(locale: Locale) {
  return copy[locale];
}
