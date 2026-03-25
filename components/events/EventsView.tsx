"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { EventsContent } from "@/lib/content/events";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";
import { getWhatsAppUrl } from "@/lib/whatsapp-defaults";

export default function EventsView({
  content,
  locale,
}: {
  content: EventsContent;
  locale: Locale;
}) {
  const p = paths(locale);
  const whatsappUrl = getWhatsAppUrl(locale);

  return (
    <main className="overflow-x-hidden pt-24">
      <section className="relative overflow-hidden bg-stone-900 py-24 md:py-32">
        <div className="gradient-hero-light absolute inset-0 bg-stone-800/80" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.h1
            className="font-serif text-4xl font-medium text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {content.hero.headline}
          </motion.h1>
          <motion.p
            className="mt-6 font-sans text-lg text-white/85 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {content.hero.subheadline}
          </motion.p>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-3xl font-medium text-stone-900 md:text-4xl">
            {content.intro.title}
          </h2>
          <div className="mt-8 space-y-6">
            {content.intro.paragraphs.map((para, i) => (
              <p key={i} className="font-sans text-lg leading-relaxed text-stone-600">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-4 text-center font-serif text-3xl font-medium text-stone-900">
            {content.upcoming.title}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center font-sans text-stone-600">
            {content.upcoming.emptyMessage}
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.upcoming.events.map((ev, i) => (
              <motion.article
                key={ev.title}
                className="flex flex-col rounded-lg border border-stone-200 bg-cream/20 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                {ev.tag && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-sage/15 px-3 py-1 font-sans text-xs font-medium uppercase tracking-wider text-sage">
                    {ev.tag}
                  </span>
                )}
                <h3 className="font-serif text-xl font-medium text-stone-900">{ev.title}</h3>
                <p className="mt-2 font-sans text-sm text-stone-500">{ev.date}</p>
                <p className="mt-4 flex-1 font-sans text-stone-600 leading-relaxed">
                  {ev.description}
                </p>
              </motion.article>
            ))}
          </div>
          <p className="mt-12 text-center font-sans text-sm text-stone-500">{content.locationNote}</p>
        </div>
      </section>

      <section className="bg-stone-900 py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif text-3xl text-white">{content.join.title}</h2>
          <p className="mt-4 font-sans text-white/80">{content.join.paragraph}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-sm border border-white/40 bg-white/10 px-8 py-4 font-sans text-sm font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {content.join.ctaText}
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
