"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { PortalHomeContent } from "@/lib/content/portal";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";
import { getWhatsAppUrl } from "@/lib/whatsapp-defaults";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type Props = {
  content: PortalHomeContent;
  locale: Locale;
};

export default function PortalHomePage({ content, locale }: Props) {
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    setVideoReady(false);
  }, [content.hero.videoSrc]);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.45]);
  const p = paths(locale);
  const whatsappUrl = getWhatsAppUrl(locale);

  const spaceHref = (key: string) => {
    if (key === "apartment") return p.apartment;
    if (key === "gardenStudio") return p.gardenStudio;
    return p.events;
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <motion.div
            className="absolute inset-0 h-[115%] w-full -top-[7%]"
            style={{ y, opacity }}
          >
            <motion.div
              className="absolute inset-0 h-full w-full"
              initial={false}
              animate={{ opacity: videoReady ? 1 : 0 }}
              transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                key={content.hero.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
                src={content.hero.videoSrc}
                aria-hidden
                onLoadedData={() => setVideoReady(true)}
              />
            </motion.div>
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
            <a
              href={content.hero.ctaHref}
              className="group inline-flex items-center gap-2 rounded-sm border border-white/80 bg-white/10 px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {content.hero.ctaText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a
            href="#welcome"
            className="flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
            aria-label={content.scrollLabel}
          >
            <span className="font-sans text-xs uppercase tracking-widest">
              {content.scrollLabel}
            </span>
            <span className="block h-8 w-px bg-white/50" />
          </a>
        </motion.div>
      </section>

      <section
        id="welcome"
        className="relative overflow-hidden bg-cream py-24 md:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            <motion.h2
              variants={item}
              className="font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl"
            >
              {content.welcome.title}
            </motion.h2>
            {content.welcome.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={item}
                className="font-sans text-lg leading-relaxed text-stone-600 md:text-xl"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            className="mb-16 text-center font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {content.pillars.title}
          </motion.h2>
          <div className="grid gap-10 md:grid-cols-3">
            {content.pillars.items.map((pillar, i) => (
              <motion.article
                key={pillar.title}
                className="border-t border-stone-200 pt-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  {pillar.title}
                </h3>
                <p className="mt-4 font-sans text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="spaces"
        className="relative overflow-hidden bg-cream py-24 md:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl">
              {content.spaces.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-stone-600">
              {content.spaces.subtitle}
            </p>
          </motion.div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {content.spaces.cards.map((card, i) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={spaceHref(card.key)}
                  className="group flex h-full flex-col rounded-lg border border-stone-200 bg-white p-8 shadow-sm transition-shadow hover:border-sage/30 hover:shadow-md"
                >
                  <h3 className="font-serif text-2xl font-medium text-stone-900 group-hover:text-sage">
                    {card.title}
                  </h3>
                  <p className="mt-4 flex-1 font-sans text-stone-600 leading-relaxed">
                    {card.description}
                  </p>
                  <span className="mt-6 font-sans text-sm font-medium text-sage">
                    {card.cta} →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.h2
            className="font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {content.experience.title}
          </motion.h2>
          <div className="mt-10 space-y-6 text-left">
            {content.experience.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="font-sans text-lg leading-relaxed text-stone-600 md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

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
              {content.location.title}
            </h2>
            <p className="font-sans text-lg leading-relaxed text-stone-600 md:text-xl">
              {content.location.description}
            </p>
            <a
              href={`https://www.google.com/maps?q=${content.location.coordinates.lat},${content.location.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-sage underline-offset-4 hover:underline"
            >
              {content.location.mapLinkText}
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </section>

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
              {content.finalCta.headline}
            </h2>
            <p className="font-sans text-lg text-white/80 md:text-xl">
              {content.finalCta.subheadline}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-white px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-stone-900 transition-colors hover:bg-cream"
            >
              {content.finalCta.ctaText}
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
