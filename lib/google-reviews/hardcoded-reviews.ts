import type { Locale } from "@/lib/i18n/config";
import { PORTAL_GOOGLE_MAPS_URL } from "@/lib/site-location";
import type { GooglePlaceReviewsSummary } from "./types";

type HardcodedReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: { en: string; es: string };
};

const REVIEWS: HardcodedReview[] = [
  {
    authorName: "Nancy Carol Portillo Machado",
    rating: 5,
    text: "Excelente lugar y atención, Tiffany es un amor",
    relativeTime: { en: "3 weeks ago", es: "Hace 3 semanas" },
  },
  {
    authorName: "Anna Chand",
    rating: 5,
    text: "We attend their Yin Yoga & Sound Immersive Experience and had a beautiful time! The garden is lush and beautiful. Tiffany & Jonathan gifted us a wonderful experience!",
    relativeTime: { en: "3 weeks ago", es: "Hace 3 semanas" },
  },
  {
    authorName: "Florenzhia Moda y Accesorios",
    rating: 5,
    text: "Muy excelente lugar 🤗",
    relativeTime: { en: "3 weeks ago", es: "Hace 3 semanas" },
  },
  {
    authorName: "Shantee Chand",
    rating: 5,
    text: "Beautiful yoga experience! Tiffany and Jonathan were welcoming and very friendly",
    relativeTime: { en: "3 weeks ago", es: "Hace 3 semanas" },
  },
  {
    authorName: "Uriel Orellana",
    rating: 5,
    text: "Un lugar mágico, con clima agradable y calidez humana!",
    relativeTime: { en: "3 weeks ago", es: "Hace 3 semanas" },
  },
  {
    authorName: "Robert Medrano",
    rating: 5,
    text:
      "Lovely spot in the green mountains of Los Planes, surrounded by nature, and evoking the nicest ‘grandma’s house’ vibes. The perfect escape to disconnect from the hustle, to breathe fresh air & reconnect with yourself/nature, without having …",
    relativeTime: { en: "3 weeks ago", es: "Hace 3 semanas" },
  },
  {
    authorName: "Elena Gonzalez",
    rating: 5,
    text:
      "Amazing location! The place is beautiful and the vibe is inmmaculate, the owner of the place is the sweetest woman ever 🤍 easy to access by bus or by car :) def comming back",
    relativeTime: { en: "a month ago", es: "Hace un mes" },
  },
  {
    authorName: "Jonathan Gomez",
    rating: 5,
    text:
      "Un lugar de conexión, es como lo puedo resumir. Ofrecen la estadía en sus habitaciones, y también hacen eventos holisticos como meditaciones y retiros. Tienen un jardín bonito donde se puede pasar tranquilamente. Se escuchan los pájaros al amanecer y atardecer. Los atardeceres son espectaculares.",
    relativeTime: { en: "a month ago", es: "Hace un mes" },
  },
  {
    authorName: "Gustavo Alvarado",
    rating: 5,
    text:
      "Hola, la verdad me sorprendió, mi experiencia fue grata en todo sentido, un lugar tranquilo, la comodidad, la limpieza e higiene, para mi todo bien, super recomendado",
    relativeTime: { en: "a month ago", es: "Hace un mes" },
  },
];

export function getHardcodedGoogleReviews(locale: Locale): GooglePlaceReviewsSummary {
  const timeKey = locale === "es" ? "es" : "en";

  return {
    placeName: "Casa Portal de la Montaña",
    rating: 5,
    totalCount: REVIEWS.length,
    mapsUrl: PORTAL_GOOGLE_MAPS_URL,
    reviews: REVIEWS.map((review) => ({
      authorName: review.authorName,
      rating: review.rating,
      text: review.text,
      relativeTime: review.relativeTime[timeKey],
    })),
  };
}
