"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";
import { getGuestExperiencesPageCopy } from "@/lib/content/guest-experiences-meta";
import type { GooglePlaceReviewsSummary } from "@/lib/google-reviews/types";

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
  locale,
  googleReviews,
}: {
  locale: Locale;
  googleReviews: GooglePlaceReviewsSummary;
}) {
  const p = paths(locale);
  const copy = getGuestExperiencesPageCopy(locale);
  const isEs = locale === "es";
  const mapsUrl = googleReviews.mapsUrl;

  return (
    <main className="overflow-x-hidden pt-24">
      <section className="relative overflow-hidden bg-trustBlue py-16 md:py-20">
        <div className="gradient-hero-trust absolute inset-0" />
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
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-serif text-2xl font-medium text-stone-900 md:text-3xl">
            {copy.reviewsTitle}
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Stars rating={googleReviews.rating} />
            <span className="font-sans text-sm text-stone-600">
              {googleReviews.rating.toFixed(1)}
              {isEs
                ? ` · ${googleReviews.totalCount} en Google`
                : ` · ${googleReviews.totalCount} on Google`}
            </span>
          </div>
          <ul className="mt-8 space-y-6">
            {googleReviews.reviews.map((review, index) => (
              <li
                key={`${review.authorName}-${index}`}
                className="rounded-sm border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
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
              {isEs ? "Ver todas en Google" : "See all on Google"}
              <span aria-hidden> →</span>
            </a>
          </p>
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
