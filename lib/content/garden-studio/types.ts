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
  videoSection: {
    title: string;
    videoUrl: string;
    placeholder: boolean;
  };
  gallery: {
    title: string;
    images: Array<{ src: string; alt: string }>;
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
  backToPortal: string;
};
