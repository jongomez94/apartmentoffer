import type { GuestStory } from "./types";

export const guestStoriesEn: GuestStory[] = [
  {
    id: "1",
    slug: "mountain-mornings-apartment",
    guestName: "Alex M.",
    subtitle: "Remote worker · Mountain apartment",
    headline: "The first week rewired how I work",
    body: "I came for quiet and fast internet, and stayed for the mountain air. Mornings on the terrace beat any coworking noise. The community is present without being intrusive—exactly what I needed to finish a hard project.",
    experienceTypes: ["apartment"],
    staySummary: "3 weeks · Independent stay",
    imageSrc: "/gallery/Portal%20%20%283%29.jpeg",
    imageAlt: "Bright living space with natural light",
    publishedAt: "2025-11-08",
  },
  {
    id: "2",
    slug: "garden-weekend-reset",
    guestName: "Sofia R.",
    subtitle: "Creative · Garden studio",
    headline: "A soft reset among the trees",
    body: "I write for a living and was stuck. The garden studio gave me short walks between sessions and a rhythm I had forgotten. At night it was so still I could actually hear myself think.",
    experienceTypes: ["garden_studio"],
    staySummary: "10 days · Writing retreat",
    imageSrc: "/gallery/Portal%20%20%2812%29.jpeg",
    imageAlt: "Greenery and peaceful outdoor space",
    publishedAt: "2025-12-01",
  },
];
