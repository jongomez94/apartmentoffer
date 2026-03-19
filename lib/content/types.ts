export type Content = {
  site: {
    name: string;
    location: string;
    whatsappNumber: string;
    whatsappMessage: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    videoSrc: string;
  };
  lifestyle: {
    title: string;
    paragraphs: string[];
    highlights: string[];
  };
  space: {
    title: string;
    intro: string;
    features: string[];
  };
  dailyExperience: {
    title: string;
    morning: { title: string; description: string };
    midday: { title: string; description: string };
    evening: { title: string; description: string };
  };
  amenitiesTitle: string;
  amenities: Array<{ title: string; icon: string }>;
  pricing: {
    title: string;
    popularLabel: string;
    option1: {
      name: string;
      price: string;
      period: string;
      features: string[];
    };
    option2: {
      name: string;
      price: string;
      period: string;
      features: string[];
    };
  };
  gallery: {
    title: string;
    images: Array<{ src: string; alt: string }>;
  };
  videoSection: {
    title: string;
    videoUrl: string;
    placeholder: boolean;
  };
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
  scrollLabel: string;
};
