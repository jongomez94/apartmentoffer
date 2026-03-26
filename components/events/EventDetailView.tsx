import Image from "next/image";
import Link from "next/link";
import type { SiteEvent } from "@/lib/events/types";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";

export default function EventDetailView({
  event,
  locale,
  backLabel,
}: {
  event: SiteEvent;
  locale: Locale;
  backLabel: string;
}) {
  const p = paths(locale);

  return (
    <main className="overflow-x-hidden pt-24">
      <article className="bg-cream pb-24 pt-12 md:pt-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link href={p.events} className="font-sans text-sm text-sage hover:underline">
            ← {backLabel}
          </Link>
          {event.tag && (
            <span className="mt-6 inline-block rounded-full bg-sage/15 px-3 py-1 font-sans text-xs font-medium uppercase tracking-wider text-sage">
              {event.tag}
            </span>
          )}
          <h1 className="mt-4 font-serif text-4xl font-medium text-stone-900 md:text-5xl">{event.title}</h1>
          <p className="mt-3 font-sans text-stone-600">{event.dateLabel}</p>
          {event.summary ? (
            <p className="mt-8 font-sans text-lg leading-relaxed text-stone-700">{event.summary}</p>
          ) : null}
          {event.imageUrl ? (
            <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-sm bg-stone-200">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42rem"
                priority
              />
            </div>
          ) : null}
          {event.description ? (
            <p className="mt-10 whitespace-pre-wrap font-sans text-stone-600 leading-relaxed">{event.description}</p>
          ) : null}
          {event.locationNote ? (
            <p className="mt-10 border-t border-stone-200 pt-8 font-sans text-sm text-stone-500">
              {event.locationNote}
            </p>
          ) : null}
        </div>
      </article>
    </main>
  );
}
