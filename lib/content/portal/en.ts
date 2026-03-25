import type { PortalHomeContent } from "./types";

export const portalHomeEn: PortalHomeContent = {
  metaTitle: "Casa Portal de la Montaña | Holistic Mountain Community",
  metaDescription:
    "A gated holistic sanctuary in Los Planes de Renderos—wellness, nature, apartments, garden studios, and soulful events near San Salvador.",
  hero: {
    headline: "Casa Portal de la Montaña",
    subheadline:
      "A holistic mountain sanctuary for conscious living—where nature, community, and stillness meet.",
    ctaText: "Explore the portal",
    ctaHref: "#spaces",
    videoSrc: "/hero/herovideo.mp4",
  },
  welcome: {
    title: "More than a place. A way of being.",
    paragraphs: [
      "Casa Portal de la Montaña is a peaceful gated community set in the mountains of Los Planes de Renderos. It was created for people who want to slow down: remote workers, creatives, couples, and anyone drawn to cleaner air, quieter mornings, and a life aligned with nature.",
      "Here you’ll find private residences, creative spaces, and a rhythm of gatherings—from yoga and meditation to cacao and community meals. Each corner is designed to support clarity, rest, and connection.",
    ],
  },
  pillars: {
    title: "What defines this place",
    items: [
      {
        title: "Nature & climate",
        description:
          "Cool mountain breeze, birds at dawn, and greenery all around—minutes from San Salvador yet worlds apart.",
      },
      {
        title: "Wellness & ritual",
        description:
          "Ongoing practices and events that nourish body and mind, in a setting built for depth and presence.",
      },
      {
        title: "Community & safety",
        description:
          "A gated, intentional environment where neighbors share values: respect, peace, and conscious living.",
      },
    ],
  },
  spaces: {
    title: "Explore within the portal",
    subtitle: "Different spaces. One shared intention.",
    cards: [
      {
        key: "apartment",
        title: "Mountain apartment",
        description:
          "A fully furnished private apartment for longer stays—with mountain views, wellness options, and access to community life.",
        cta: "View apartment",
      },
      {
        key: "gardenStudio",
        title: "Garden studio",
        description:
          "A distinct creative retreat surrounded by the garden—ideal for focused work, rest, or a slower rhythm close to the earth.",
        cta: "Discover the studio",
      },
      {
        key: "events",
        title: "Events & gatherings",
        description:
          "Yoga, cacao, meditation, and seasonal happenings—our calendar grows with the community.",
        cta: "See what’s on",
      },
    ],
  },
  experience: {
    title: "A day in the sanctuary",
    paragraphs: [
      "Mornings begin softly: light through the trees, fresh air, optional practice or quiet coffee before the world wakes.",
      "Days can be for deep work, walks, shared meals, or simply doing nothing with intention. Evenings often close with sunset colors over the volcanoes—and sometimes the ocean glimmering far away.",
    ],
  },
  location: {
    title: "Los Planes de Renderos",
    description:
      "Elevated above the city with a cooler climate and easy access when you need urban life—nature and convenience in balance.",
    coordinates: { lat: 13.633709641672699, lng: -89.17520788607239 },
    mapLinkText: "View on Google Maps",
  },
  finalCta: {
    headline: "Step closer to the mountain.",
    subheadline:
      "Whether you’re looking for a home, a creative nest, or the next gathering—write to us and we’ll welcome you in.",
    ctaText: "Message us",
  },
  scrollLabel: "Scroll",
};
