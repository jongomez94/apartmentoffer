import type { Content } from "@/lib/content/types";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import type { GardenStudioContent } from "./types";

export function buildGardenStudioPageContent(gs: GardenStudioContent, locale: Locale): Content {
  const base = getContent(locale);

  return {
    site: base.site,
    scrollLabel: locale === "es" ? "Desplazar" : "Scroll",
    hero: {
      headline: gs.hero.headline,
      subheadline: gs.hero.subheadline,
      ctaText: gs.hero.ctaText,
      videoSrc: "",
      imageSrc: gs.hero.imageSrc,
      imageObjectPosition: "center 70%",
    },
    lifestyle: gs.story,
    space: {
      title: gs.space.title,
      intro: gs.space.intro,
      features: gs.space.features,
      imageSrc: gs.space.imageSrc,
    },
    dailyExperience: gs.dailyExperience,
    amenitiesTitle: gs.amenitiesTitle,
    amenities: gs.amenities,
    pricing: gs.pricing,
    gallery: gs.gallery,
    videoSection: gs.videoSection,
    locationContent: gs.locationContent,
    finalCta: gs.finalCta,
  };
}
