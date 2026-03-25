import type { GardenStudioContent } from "./types";

/** Placeholder imagery reuses gallery assets until you add studio-specific media */
export const gardenStudioEn: GardenStudioContent = {
  metaTitle: "Garden Studio | Casa Portal de la Montaña",
  metaDescription:
    "A creative garden retreat at Casa Portal de la Montaña—focused work, rest, and immersion in nature near San Salvador.",
  hero: {
    headline: "The Garden Studio",
    subheadline:
      "A private creative space nestled in the garden—designed for focus, restoration, and slower days.",
    ctaText: "Schedule a visit",
    imageSrc: "/gallery/Portal%20%20%288%29.jpeg",
  },
  story: {
    title: "Your corner of the garden",
    paragraphs: [
      "The Garden Studio is being offered with the same ethos as our mountain apartment: conscious living, beautiful surroundings, and room to think clearly. It is a distinct space—closer to the soil, the light through the leaves, and the quiet rhythm of outdoor life.",
      "Ideal for solo travelers, creatives, or anyone who wants a smaller footprint with the same sanctuary energy. Details, pricing, and availability will be tailored to your stay—reach out and we will share the next chapter.",
    ],
    highlights: [
      "Garden immersion",
      "Creative focus",
      "Private sanctuary",
      "Same gated community",
      "Events access",
    ],
  },
  space: {
    title: "The space",
    intro:
      "Finishes, layout, and media here are placeholders while we prepare dedicated photography and film for this listing.",
    features: [
      "Dedicated studio footprint in the garden zone",
      "Natural light and proximity to green space",
      "Designed for work, rest, and short retreats",
      "Access to shared gardens and community amenities",
      "Optional meals & wellness paths, subject to package",
    ],
    imageSrc: "/gallery/Portal%20%20%285%29.jpeg",
  },
  videoSection: {
    title: "Experience the studio",
    videoUrl: "",
    placeholder: true,
  },
  gallery: {
    title: "Garden & atmosphere",
    images: [
      { src: "/gallery/Portal%20%20%285%29.jpeg", alt: "Garden greenery" },
      { src: "/gallery/Portal%20%20%2812%29.jpeg", alt: "Nature immersion" },
      { src: "/gallery/Portal%20%20%282%29.jpeg", alt: "Mountain light" },
      { src: "/gallery/Portal%20%20%284%29.jpeg", alt: "Peaceful surroundings" },
    ],
  },
  locationContent: {
    title: "Los Planes de Renderos",
    description:
      "Part of Casa Portal de la Montaña—same mountain air, same community, a different angle on the land.",
    coordinates: { lat: 13.633709641672699, lng: -89.17520788607239 },
    mapLinkText: "View on Google Maps",
  },
  finalCta: {
    headline: "Ask about the Garden Studio",
    subheadline:
      "We will share availability, orientation, and how this space fits alongside our apartment offering.",
    ctaText: "Message us",
  },
  backToPortal: "Back to portal home",
};
