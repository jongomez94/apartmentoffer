import type { PricingContent } from "@/lib/content/types";

export type GardenStudioContent = {
  metaTitle: string;
  metaDescription: string;
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    imageSrc: string;
  };
  story: {
    title: string;
    paragraphs: string[];
    highlights: string[];
  };
  space: {
    title: string;
    intro: string;
    features: string[];
    imageSrc: string;
  };
  dailyExperience: {
    title: string;
    morning: { title: string; description: string };
    midday: { title: string; description: string };
    evening: { title: string; description: string };
  };
  amenitiesTitle: string;
  amenities: Array<{ title: string; icon: string }>;
  videoSection: {
    title: string;
    videoUrl: string;
    placeholder: boolean;
  };
  gallery: {
    title: string;
    images: Array<{ src: string; alt: string }>;
  };
  pricing: PricingContent;
  locationContent: {
    title: string;
    description: string;
    coordinates: { lat: number; lng: number };
    mapLinkText: string;
  };
  finalCta: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  backToPortal: string;
};
