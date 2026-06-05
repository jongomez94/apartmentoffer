"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GuestStory } from "@/lib/guest-stories";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";
import { PORTAL_GOOGLE_MAPS_URL } from "@/lib/site-location";
import { getGuestExperiencesPageCopy } from "@/lib/content/guest-experiences-meta";
import type { GooglePlaceReviewsSummary } from "@/lib/google-reviews/types";
import { withLifeAtPortalCache } from "@/lib/content/life-at-the-portal";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex gap-0.5 text-amber-500" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "opacity-100" : "opacity-25"} aria-hidden>
          ★
        </span>
      ))}
    </span>
  );
}

export default function GuestExperiencesView({
  stories,
  locale,
  googleReviews,
}: {
  stories: GuestStory[];
  locale: Locale;
  googleReviews: GooglePlaceReviewsSummary | null;
}) {
  const p = paths(locale);
  const copy = getGuestExperiencesPageCopy(locale);
  const isEs = locale === "es";
  const hasGoogleReviews = googleReviews && googleReviews.reviews.length > 0;
  const mapsUrl = googleReviews?.mapsUrl ?? PORTAL_GOOGLE_MAPS_URL;

  return (
    <main className="overflow-x-hidden pt-24">
      <section className="relative overflow-hidden bg-stone-900 py-16 md:py-20">
        <div className="gradient-hero absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.h1
            className="font-serif text-4xl font-medium text-white md:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {copy.heroTitle}
          </motion.h1>
          <motion.p
            className="mt-4 font-sans text-lg text-white/85"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {copy.heroSub}
          </motion.p>
          {!hasGoogleReviews ? (
            <motion.p className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-medium text-white/90 underline-offset-4 hover:text-white hover:underline"
              >
                {isEs ? "Ver reseñas en Google" : "Read reviews on Google"}
                <span aria-hidden> →</span>
              </a>
            </motion.p>
          ) : null}
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          {hasGoogleReviews ? (
            <div className="mb-14 border-b border-stone-200 pb-14">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Stars rating={googleReviews.rating} />
                <span className="font-sans text-sm text-stone-600">
                  {googleReviews.rating.toFixed(1)}
                  {googleReviews.totalCount > 0
                    ? isEs
                      ? ` · ${googleReviews.totalCount} en Google`
                      : ` · ${googleReviews.totalCount} on Google`
                    : null}
                </span>
              </div>
              <ul className="mt-8 space-y-6">
                {googleReviews.reviews.map((review, index) => (
                  <li
                    key={`${review.authorName}-${index}`}
                    className="rounded-sm border border-stone-200 bg-white p-5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-sans text-sm font-medium text-stone-900">{review.authorName}</p>
                      <Stars rating={review.rating} />
                      {review.relativeTime ? (
                        <span className="font-sans text-xs text-stone-400">{review.relativeTime}</span>
                      ) : null}
                    </div>
                    <p className="mt-3 font-sans text-sm text-stone-600 leading-relaxed">{review.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-center">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-medium text-sage underline-offset-4 hover:underline"
                >
                  {isEs ? "Más reseñas en Google" : "More on Google"}
                  <span aria-hidden> →</span>
                </a>
              </p>
            </div>
          ) : null}

          {stories.length > 0 ? (
            <ul className="space-y-12">
              {stories.map((story, index) => (
                <motion.li
                  key={story.id}
                  className={index < stories.length - 1 ? "border-b border-stone-200 pb-12" : ""}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <article className="grid gap-6 md:grid-cols-[minmax(0,1fr)_240px] md:items-start">
                    <div>
                      <p className="font-sans text-sm font-medium text-sage">{story.subtitle}</p>
                      <h2 className="mt-1 font-serif text-2xl font-medium text-stone-900">{story.headline}</h2>
                      <p className="mt-1 font-sans text-stone-700">{story.guestName}</p>
                      {story.staySummary ? (
                        <p className="mt-1 font-sans text-sm text-stone-500">{story.staySummary}</p>
                      ) : null}
                      <p className="mt-4 font-sans text-stone-600 leading-relaxed">{story.body}</p>
                    </div>
                    {story.imageSrc ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-200 md:aspect-square">
                        <Image
                          src={withLifeAtPortalCache(story.imageSrc)}
                          alt={story.imageAlt ?? story.headline}
                          fill
                          className="object-cover"
                          sizes="240px"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                  </article>
                </motion.li>
              ))}
            </ul>
          ) : !hasGoogleReviews ? (
            <p className="text-center font-sans text-stone-600">
              {isEs ? "Pronto habrá más relatos aquí." : "More stories coming soon."}
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-8">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Link href={p.home} className="font-sans text-sm text-sage hover:underline">
            ← {isEs ? "Volver al inicio" : "Back to home"}
          </Link>
        </div>
      </section>
    </main>
  );
}
