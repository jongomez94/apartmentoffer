"use client";

import { motion } from "framer-motion";
import { site, finalCta } from "@/lib/content";

const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

export default function FinalCTASection() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-stone-900 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="font-serif text-3xl font-medium leading-tight text-white md:text-4xl lg:text-5xl">
            {finalCta.headline}
          </h2>
          <p className="font-sans text-lg text-white/80 md:text-xl">
            {finalCta.subheadline}
          </p>
          <div className="pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-white px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-stone-900 transition-colors hover:bg-cream focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {finalCta.ctaText}
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
