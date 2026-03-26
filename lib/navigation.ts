import type { Locale } from "@/lib/i18n/config";

export type NavLabels = {
  home: string;
  apartment: string;
  gardenStudio: string;
  events: string;
  guestExperiences: string;
};

export const navLabels: Record<Locale, NavLabels> = {
  en: {
    home: "Home",
    apartment: "Apartment",
    gardenStudio: "Garden Studio",
    events: "Events",
    guestExperiences: "Guests Experiences",
  },
  es: {
    home: "Inicio",
    apartment: "Apartamento",
    gardenStudio: "Estudio del Jardín",
    events: "Eventos",
    guestExperiences: "Experiencias de huéspedes",
  },
};

export function getNavLabels(locale: Locale): NavLabels {
  return navLabels[locale];
}

export function paths(locale: Locale) {
  const l = `/${locale}`;
  return {
    home: l,
    apartment: `${l}/apartment`,
    gardenStudio: `${l}/garden-studio`,
    events: `${l}/events`,
    event: (slug: string) => `${l}/events/${encodeURIComponent(slug)}`,
    guestExperiences: `${l}/guest-experiences`,
  };
}
