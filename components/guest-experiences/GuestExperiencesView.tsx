"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GuestStory } from "@/lib/guest-stories";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";
import { getGuestExperiencesPageCopy } from "@/lib/content/guest-experiences-meta";

export default function GuestExperiencesView({
  stories,
  locale,
}: {
  stories: GuestStory[];
  locale: Locale;
}) {
  const p = paths(locale);
  const copy = getGuestExperiencesPageCopy(locale);

  return (
    <main className="overflow-x-hidden pt-24">
      <section className="relative overflow-hidden bg-stone-900 py-20 md:py-28">
        <div className="gradient-hero absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.h1
            className="font-serif text-4xl font-medium text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {copy.heroTitle}
          </motion.h1>
          <motion.p
            className="mt-6 font-sans text-lg text-white/85 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            {copy.heroSub}
          </motion.p>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center font-sans text-lg text-stone-600">{copy.intro}</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-16 px-6">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              className="border-b border-stone-200 pb-16 last:border-0 last:pb-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
                <div>
                  <p className="font-sans text-sm font-medium text-sage">{story.subtitle}</p>
                  <h2 className="mt-2 font-serif text-2xl font-medium text-stone-900 md:text-3xl">
                    {story.headline}
                  </h2>
                  <p className="mt-1 font-serif text-xl text-stone-700">{story.guestName}</p>
                  {story.staySummary && (
                    <p className="mt-2 font-sans text-sm text-stone-500">{story.staySummary}</p>
                  )}
                  <p className="mt-6 font-sans text-stone-600 leading-relaxed">{story.body}</p>
                  <time
                    dateTime={story.publishedAt}
                    className="mt-4 block font-sans text-xs text-stone-400"
                  >
                    {story.publishedAt}
                  </time>
                </div>
                {story.imageSrc && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-200 md:aspect-square md:max-w-[280px] md:justify-self-end">
                    <Image
                      src={story.imageSrc}
                      alt={story.imageAlt ?? story.headline}
                      fill
                      className="object-cover"
                      sizes="280px"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-cream py-10" aria-label="Navigation">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Link href={p.home} className="font-sans text-sm text-sage hover:underline">
            ← {locale === "es" ? "Volver al inicio del portal" : "Back to portal home"}
          </Link>
        </div>
      </section>
    </main>
  );
}
