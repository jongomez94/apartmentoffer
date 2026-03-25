export type PortalHomeContent = {
  metaTitle: string;
  metaDescription: string;
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaHref: string;
    videoSrc: string;
  };
  welcome: {
    title: string;
    paragraphs: string[];
  };
  pillars: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  spaces: {
    title: string;
    subtitle: string;
    cards: Array<{
      key: "apartment" | "gardenStudio" | "events";
      title: string;
      description: string;
      cta: string;
    }>;
  };
  experience: {
    title: string;
    paragraphs: string[];
  };
  location: {
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
