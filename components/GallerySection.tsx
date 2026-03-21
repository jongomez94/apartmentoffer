"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

export default function GallerySection() {
  const { content } = useContent();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images = content.gallery.images;
  const total = images.length;

  const goPrev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : i === 0 ? total - 1 : i - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  const close = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, close, goPrev, goNext]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          className="mb-16 text-center font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {content.gallery.title}
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, i) => (
            <motion.button
              type="button"
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm text-left focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelectedIndex(i)}
              aria-label={`View image ${i + 1} of ${total}: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox carousel */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close gallery"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white md:left-4"
              aria-label="Previous image"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <motion.div
              className="relative mx-14 h-[70vh] w-[90vw] max-w-5xl md:mx-20"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              key={selectedIndex}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white md:right-4"
              aria-label="Next image"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 font-sans text-sm text-white/90 backdrop-blur-sm">
              {selectedIndex + 1} / {total}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
