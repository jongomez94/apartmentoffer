"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function LocationSection() {
  const { content } = useContent();
  const { locationContent } = content;
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="inline-block text-4xl" aria-hidden>
            📍
          </span>
          <h2 className="font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl">
            {locationContent.title}
          </h2>
          <p className="font-sans text-lg leading-relaxed text-stone-600 md:text-xl">
            {locationContent.description}
          </p>
          <a
            href={`https://www.google.com/maps?q=${locationContent.coordinates.lat},${locationContent.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-sage underline-offset-4 hover:underline"
          >
            {locationContent.mapLinkText}
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
