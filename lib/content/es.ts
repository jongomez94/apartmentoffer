import type { Content } from "./types";

export const es: Content = {
  site: {
    name: "Casa Portal de la Montaña",
    location: "Los Planes de Renderos, San Salvador",
    whatsappNumber: "18034202923",
    whatsappMessage: "Hola, me interesa agendar una visita a Casa Portal de la Montaña.",
  },
  hero: {
    headline: "No es solo un lugar para vivir. Es una forma de vida.",
    subheadline:
      "Despierta en las montañas de San Salvador. Respira profundo. Vive despacio.",
    ctaText: "Agendar Visita",
    videoSrc: "/hero/herovideo.mp4",
  },
  lifestyle: {
    title: "Un hogar diferente",
    paragraphs: [
      "Un apartamento privado amueblado dentro de un santuario de montaña. Un lugar donde las mañanas son tranquilas, el aire es fresco y la vida fluye a un ritmo más lento e intencional.",
      "Aquí encontrarás silencio. Silencio real. El tipo que te permite escuchar tus propios pensamientos. La naturaleza te rodea—pájaros al amanecer, brisa fresca de montaña, el aroma de tierra y vegetación.",
      "Escapa del ruido de la ciudad sin alejarte de ella. Casa Portal de la Montaña es una comunidad cerrada y segura diseñada para la vida consciente: para la claridad, para la paz, para una forma diferente de ser.",
    ],
    highlights: [
      "Silencio",
      "Naturaleza",
      "Claridad mental",
      "Escape del ruido urbano",
      "Comunidad cerrada y segura",
    ],
  },
  space: {
    title: "Tu Espacio Privado",
    intro:
      "Desde la ventana de tu habitación, disfruta de hermosos atardeceres sobre las montañas, con el océano visible en la distancia.",
    features: [
      "Habitación con cama king size",
      "Baño privado con agua caliente",
      "Cocina básica con horno y barra de desayuno",
      "Pequeña sala con sofá",
      "Ventilador de techo + aire fresco natural de montaña",
      "Apartamento en segundo piso",
      "Entrada privada por calle (entra y sale con libertad)",
      "Acceso a jardín compartido y áreas comunes",
    ],
  },
  dailyExperience: {
    title: "Un día en las montañas",
    morning: {
      title: "Mañana",
      description:
        "Aire fresco. Pájaros al amanecer. La energía tranquila del amanecer antes de que el mundo despierte.",
    },
    midday: {
      title: "Mediodía",
      description:
        "Trabajo remoto en un entorno pacífico. La concentración llega fácil cuando el único ruido es el viento.",
    },
    evening: {
      title: "Noche",
      description:
        "Vistas del atardecer desde tu ventana. Quietud. Silencio. Un final natural del día.",
    },
  },
  amenitiesTitle: "Qué incluye",
  amenities: [
    { title: "Servicios incluidos", icon: "utilities" },
    { title: "Limpieza semanal", icon: "cleaning" },
    { title: "Comunidad cerrada segura", icon: "security" },
    { title: "Acceso al parque", icon: "park" },
    { title: "Inmersión en la naturaleza", icon: "nature" },
    { title: "Comidas saludables opcionales", icon: "meals" },
  ],
  pricing: {
    title: "Elige tu estadía",
    popularLabel: "Más popular",
    option1: {
      name: "Estadía Independiente",
      price: "$1,250",
      period: "/mes",
      features: [
        "Apartamento amueblado",
        "Servicios incluidos",
        "Limpieza semanal",
      ],
    },
    option2: {
      name: "Vida Wellness",
      price: "$1,550",
      period: "/mes",
      features: [
        "Todo en Estadía Independiente",
        "Desayuno, almuerzo y cena diarios — Cocina Saludable Salvadoreña",
        "Ingredientes limpios y de alta calidad, sin aceites de semillas",
        "Acceso VIP a todos los eventos de la propiedad (clases de yoga, ceremonias de cacao, sesiones de meditación, etc.)",
      ],
    },
  },
  gallery: {
    title: "La vida en el portal",
    images: [
      { src: "/gallery/Portal%20%20%281%29.jpeg", alt: "Casa Portal de la Montaña" },
      { src: "/gallery/Portal%20%20%282%29.jpeg", alt: "Vista de montaña y naturaleza" },
      { src: "/gallery/Portal%20%20%283%29.jpeg", alt: "Espacio de living" },
      { src: "/gallery/Portal%20%20%284%29.jpeg", alt: "Entorno pacífico" },
      { src: "/gallery/Portal%20%20%285%29.jpeg", alt: "Jardín y vegetación" },
      { src: "/gallery/Portal%20%20%286%29.jpeg", alt: "Luz de la mañana" },
      { src: "/gallery/Portal%20%20%287%29.jpeg", alt: "Espacio privado" },
      { src: "/gallery/Portal%20%20%288%29.jpeg", alt: "Santuario de montaña" },
      { src: "/gallery/Portal%20%20%289%29.jpeg", alt: "La vida en el portal" },
      { src: "/gallery/Portal%20%20%2810%29.jpeg", alt: "Vistas y atmósfera" },
      { src: "/gallery/Portal%20%20%2811%29.jpeg", alt: "Interior y confort" },
      { src: "/gallery/Portal%20%20%2812%29.jpeg", alt: "Inmersión en la naturaleza" },
      { src: "/gallery/Portal%20%20%2813%29.jpeg", alt: "Atardecer y vista al mar" },
      { src: "/gallery/Portal%20%20%2814%29.jpeg", alt: "Cocina y living" },
      { src: "/gallery/Portal%20%20%2815%29.jpeg", alt: "Habitación y descanso" },
      { src: "/gallery/Portal%20%20%2816%29.jpeg", alt: "Acceso al jardín compartido" },
    ],
  },
  videoSection: {
    title: "Experimenta el Espacio",
    videoUrl: "/Experience%20the%20Space/ExpTheHouse.mp4",
    placeholder: false,
  },
  locationContent: {
    title: "Los Planes de Renderos",
    description:
      "Cerca de San Salvador, pero en otro mundo. Clima más fresco, aire puro y el balance perfecto entre naturaleza y accesibilidad. Estás en las montañas—pero la ciudad está ahí cuando la necesitas.",
    coordinates: { lat: 13.633709641672699, lng: -89.17520788607239 },
    mapLinkText: "Ver en Google Maps",
  },
  finalCta: {
    headline: "Espacios como este son raros.",
    subheadline:
      "Si buscas paz, claridad y una forma diferente de vivir, este podría ser tu lugar.",
    ctaText: "Escribe para Agendar una Visita",
  },
  scrollLabel: "Desplazar",
};
