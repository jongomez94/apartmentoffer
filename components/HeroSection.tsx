"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useContent } from "@/context/ContentContext";

const scrollToContact = () => {
  document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
};

export default function HeroSection() {
  const { content } = useContent();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.45]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-stone-900">
        <motion.div
          className="absolute inset-0 h-[115%] w-full -top-[7%]"
          style={{ y, opacity }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            src={content.hero.videoSrc}
            aria-hidden
          />
        </motion.div>
      </div>

      <div className="gradient-hero absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          className="font-serif text-4xl font-medium leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.hero.headline}
        </motion.h1>
        <motion.p
          className="mt-6 font-sans text-lg font-light tracking-wide text-white/90 md:text-xl lg:text-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.hero.subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-2 rounded-sm border border-white/80 bg-white/10 px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {content.hero.ctaText}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a
          href="#lifestyle"
          className="flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
          aria-label="Scroll to content"
        >
          <span className="font-sans text-xs uppercase tracking-widest">
            {content.scrollLabel}
          </span>
          <span className="block h-8 w-px bg-white/50" />
        </a>
      </motion.div>
    </section>
  );
}
