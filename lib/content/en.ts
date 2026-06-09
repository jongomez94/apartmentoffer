import type { Content } from "./types";

export const en: Content = {
  site: {
    name: "Casa Portal de la Montaña",
    location: "Los Planes de Renderos, San Salvador",
    whatsappNumber: "50366748015",
    whatsappMessage: "Hi, I'm interested in scheduling a visit to Casa Portal de la Montaña.",
  },
  hero: {
    headline: "This is not just a place to live. It's a way of life.",
    subheadline:
      "Wake up in the mountains of San Salvador. Breathe deeply. Live slowly.",
    ctaText: "Schedule a Visit",
    videoSrc: "/hero/herovideo.mp4",
  },
  lifestyle: {
    title: "A different kind of home",
    paragraphs: [
      "A peaceful fully furnished private apartment inside a mountain sanctuary. A place where mornings are quiet, the air is fresh, and life moves at a slower, more intentional pace.",
      "Here you'll find silence. Real silence. The kind that lets you hear your own thoughts. Nature wraps around you, birds at dawn, cool mountain breeze, the scent of earth and greenery.",
      "Escape the city noise without leaving the city behind. Casa Portal de la Montaña is a safe, gated community designed for conscious living: for clarity, for peace, for a different way of being.",
    ],
    highlights: [
      "Silence",
      "Nature",
      "Mental clarity",
      "Escape from city noise",
      "Safe gated environment",
    ],
  },
  space: {
    title: "Your Private Space",
    intro:
      "From your bedroom window, enjoy beautiful sunsets over the mountains, with the ocean visible in the distance.",
    features: [
      "King size bedroom",
      "Private bathroom with hot water",
      "Basic kitchen with oven and breakfast counter",
      "Small living area with sofa",
      "Ceiling fan + naturally cool mountain air",
      "Second-floor apartment",
      "Private street entrance (come and go freely)",
      "Access to shared garden and common areas",
    ],
  },
  dailyExperience: {
    title: "A day in the mountains",
    morning: {
      title: "Morning",
      description:
        "Fresh air. Birds at first light. The calm energy of sunrise before the world wakes.",
    },
    midday: {
      title: "Midday",
      description:
        "Remote work with peaceful surroundings. Focus comes easily when the only noise is the wind.",
    },
    evening: {
      title: "Evening",
      description:
        "Sunset views from your window. Quiet. Stillness. A natural end to the day.",
    },
  },
  amenitiesTitle: "What's included",
  amenities: [
    { title: "Utilities included", icon: "utilities" },
    { title: "Weekly cleaning", icon: "cleaning" },
    { title: "Safe gated community", icon: "security" },
    { title: "Park access", icon: "park" },
    { title: "Nature immersion", icon: "nature" },
    { title: "Optional healthy meals", icon: "meals" },
  ],
  pricing: {
    title: "Choose your stay",
    popularLabel: "Most popular",
    option1: {
      name: "Independent Stay",
      price: "$1,000",
      period: "/month",
      features: ["Furnished apartment", "Utilities included", "Weekly cleaning"],
    },
    option2: {
      name: "Wellness Living",
      price: "$1,250",
      period: "/month",
      features: [
        "Everything in Independent Stay",
        "Daily breakfast, lunch, and dinner. Salvadoran Healthy Cuisine",
        "Clean, high-quality ingredients, no seed oils",
        "VIP Access to all property events (Yoga classes, Cacao Ceremonies, Meditation Sessions, etc.)",
      ],
    },
  },
  gallery: {
    title: "Life at the portal",
    images: [
      { src: "/life-at-the-portal/01.jpeg", alt: "Casa Portal de la Montaña" },
      { src: "/life-at-the-portal/02.jpeg", alt: "Mountain view and nature" },
      { src: "/life-at-the-portal/03.jpeg", alt: "Living space" },
      { src: "/life-at-the-portal/04.jpeg", alt: "Peaceful surroundings" },
      { src: "/life-at-the-portal/05.jpeg", alt: "Garden and greenery" },
      { src: "/life-at-the-portal/06.jpeg", alt: "Morning light" },
      { src: "/life-at-the-portal/07.jpeg", alt: "Private space" },
      { src: "/life-at-the-portal/08.jpeg", alt: "Mountain sanctuary" },
      { src: "/life-at-the-portal/09.jpeg", alt: "Life at the portal" },
      { src: "/life-at-the-portal/10.jpeg", alt: "Views and atmosphere" },
      { src: "/life-at-the-portal/11.jpeg", alt: "Interior and comfort" },
      { src: "/life-at-the-portal/12.jpeg", alt: "Nature immersion" },
      { src: "/life-at-the-portal/13.jpeg", alt: "Sunset and ocean view" },
    ],
  },
  videoSection: {
    title: "Experience the Space",
    videoUrl: "/Experience%20the%20Space/ExpTheHouse.mp4",
    placeholder: false,
  },
  locationContent: {
    title: "Los Planes de Renderos",
    description:
      "Close to San Salvador, yet worlds apart. Cooler climate, fresh air, and the perfect balance between nature and accessibility. You're in the mountains, but the city is there when you need it.",
    coordinates: { lat: 13.633709641672699, lng: -89.17520788607239 },
    mapLinkText: "View on Google Maps",
  },
  finalCta: {
    headline: "Spaces like this are rare.",
    subheadline:
      "If you're looking for peace, clarity, and a different way of living, this might be your place.",
    ctaText: "Message to Schedule a Visit",
  },
  scrollLabel: "Scroll",
};
