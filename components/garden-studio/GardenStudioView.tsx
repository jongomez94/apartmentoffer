"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GardenStudioContent } from "@/lib/content/garden-studio";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";
import { getWhatsAppUrl } from "@/lib/whatsapp-defaults";
import { googleMapsUrl, PORTAL_COORDINATES } from "@/lib/site-location";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function GardenStudioView({
  content,
  locale,
}: {
  content: GardenStudioContent;
  locale: Locale;
}) {
  const p = paths(locale);
  const whatsappUrl = getWhatsAppUrl(locale);
  const mapUrl = googleMapsUrl(PORTAL_COORDINATES);

  const scrollToCta = () =>
    document.getElementById("garden-cta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="overflow-x-hidden pt-24">
      <section className="relative min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={content.hero.imageSrc}
            alt={content.hero.headline}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="gradient-hero absolute inset-0" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 pb-20 pt-28 text-center md:min-h-[60vh]">
          <motion.h1
            className="font-serif text-4xl font-medium text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {content.hero.headline}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl font-sans text-lg text-white/90 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {content.hero.subheadline}
          </motion.p>
          <motion.button
            type="button"
            onClick={scrollToCta}
            className="mt-10 rounded-sm border border-white/80 bg-white/15 px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-stone-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {content.hero.ctaText}
          </motion.button>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 variants={item} className="font-serif text-3xl font-medium text-stone-900 md:text-4xl">
              {content.story.title}
            </motion.h2>
            {content.story.paragraphs.map((para, i) => (
              <motion.p key={i} variants={item} className="font-sans text-lg text-stone-600">
                {para}
              </motion.p>
            ))}
            <motion.ul variants={item} className="flex flex-wrap gap-2 pt-2">
              {content.story.highlights.map((h) => (
                <li key={h}>
                  <span className="inline-block rounded-full border border-stone-300 bg-white/60 px-4 py-2 font-sans text-sm text-stone-700">
                    {h}
                  </span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-200"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src={content.space.imageSrc}
              alt={content.space.title}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={item} className="font-serif text-3xl font-medium text-stone-900 md:text-4xl">
              {content.space.title}
            </motion.h2>
            <motion.p variants={item} className="mt-4 font-sans text-lg text-stone-600">
              {content.space.intro}
            </motion.p>
            <ul className="mt-6 space-y-2">
              {content.space.features.map((f, i) => (
                <motion.li key={i} variants={item} className="flex gap-2 font-sans text-stone-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                  {f}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <motion.h2
            className="mb-10 text-center font-serif text-3xl font-medium text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {content.videoSection.title}
          </motion.h2>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-stone-900">
            {content.videoSection.videoUrl && !content.videoSection.placeholder ? (
              <video
                src={content.videoSection.videoUrl}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-500">
                <p className="font-sans text-sm">Video coming soon</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center font-serif text-3xl font-medium text-stone-900">
            {content.gallery.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.gallery.images.map((img, i) => (
              <motion.div
                key={img.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </motion.div>
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
              {content.locationContent.title}
            </h2>
            <p className="font-sans text-lg leading-relaxed text-stone-600 md:text-xl">
              {content.locationContent.description}
            </p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-sage underline-offset-4 hover:underline"
            >
              {content.locationContent.mapLinkText}
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      <section id="garden-cta" className="bg-stone-900 py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-3xl text-white md:text-4xl">{content.finalCta.headline}</h2>
          <p className="mt-4 font-sans text-white/80">{content.finalCta.subheadline}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-sm bg-white px-8 py-4 font-sans text-sm font-medium uppercase tracking-wider text-stone-900"
          >
            {content.finalCta.ctaText}
          </a>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-cream py-10" aria-label="Navigation">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Link href={p.home} className="font-sans text-sm text-sage hover:underline">
            ← {content.backToPortal}
          </Link>
        </div>
      </section>
    </main>
  );
}
