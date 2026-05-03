import Image from "next/image";
import Link from "next/link";
import type { SiteEvent } from "@/lib/events/types";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";
import { getWhatsAppUrl } from "@/lib/whatsapp-defaults";

function labels(locale: Locale) {
  return locale === "es"
    ? {
        back: "Volver a eventos",
        details: "Detalles",
        when: "Cuándo",
        where: "Dónde",
        about: "Sobre el evento",
        cta: "Reservar / preguntar por WhatsApp",
      }
    : {
        back: "Back to events",
        details: "Details",
        when: "When",
        where: "Where",
        about: "About the event",
        cta: "Book / ask on WhatsApp",
      };
}

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
  const L = labels(locale);
  const whatsappUrl = getWhatsAppUrl(locale);

  return (
    <main className="overflow-x-hidden pt-24">
      <article className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-stone-900">
          {event.imageUrl ? (
            <div className="absolute inset-0">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                priority
                className="object-cover opacity-90"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/55 to-stone-900/85" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(193,205,176,0.22),transparent_55%)]" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950" />
          )}

          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-10 md:pb-20 md:pt-12">
            <Link
              href={p.events}
              className="inline-flex items-center gap-2 font-sans text-sm text-white/80 hover:text-white"
            >
              <span aria-hidden>←</span>
              <span className="underline-offset-4 hover:underline">{backLabel || L.back}</span>
            </Link>

            <div className="mt-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                {event.tag ? (
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 font-sans text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm">
                    {event.tag}
                  </span>
                ) : null}
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 font-sans text-xs text-white/80 backdrop-blur-sm">
                  {event.dateLabel}
                </span>
              </div>

              <h1 className="mt-6 font-serif text-4xl font-medium text-white md:text-5xl lg:text-6xl">
                {event.title}
              </h1>
              {event.summary ? (
                <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/85">
                  {event.summary}
                </p>
              ) : null}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm bg-white px-6 py-3 font-sans text-sm font-medium uppercase tracking-wider text-stone-900 shadow-sm transition-colors hover:bg-white/90"
                >
                  {L.cta}
                </a>
                {event.locationNote ? (
                  <p className="font-sans text-sm text-white/70">{event.locationNote}</p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,1fr)_360px] md:gap-12">
            <div>
              <h2 className="font-serif text-3xl font-medium text-stone-900 md:text-4xl">
                {L.about}
              </h2>
              <div className="mt-6 space-y-6">
                {event.description ? (
                  <p className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-stone-600">
                    {event.description}
                  </p>
                ) : (
                  <p className="font-sans text-lg leading-relaxed text-stone-600">
                    {locale === "es"
                      ? "Pronto compartiremos más detalles sobre este encuentro."
                      : "More details will be shared soon for this gathering."}
                  </p>
                )}
              </div>
            </div>

            <aside className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-2xl font-medium text-stone-900">{L.details}</h3>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="font-sans text-xs font-medium uppercase tracking-wider text-stone-500">
                    {L.when}
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-stone-700">{event.dateLabel}</dd>
                </div>
                <div>
                  <dt className="font-sans text-xs font-medium uppercase tracking-wider text-stone-500">
                    {L.where}
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-stone-700">
                    {event.locationNote ??
                      (locale === "es"
                        ? "Casa Portal de la Montaña"
                        : "Casa Portal de la Montaña")}
                  </dd>
                </div>
                {event.tag ? (
                  <div>
                    <dt className="font-sans text-xs font-medium uppercase tracking-wider text-stone-500">
                      {locale === "es" ? "Tipo" : "Type"}
                    </dt>
                    <dd className="mt-1 font-sans text-sm text-stone-700">{event.tag}</dd>
                  </div>
                ) : null}
              </dl>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-sm border border-stone-900/15 bg-stone-900 px-5 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-stone-800"
              >
                {locale === "es" ? "Escríbenos por WhatsApp" : "Message us on WhatsApp"}
              </a>
              <p className="mt-3 text-center font-sans text-xs text-stone-500">
                {locale === "es"
                  ? "Te respondemos con los detalles y cómo unirte."
                  : "We’ll reply with details and how to join."}
              </p>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
