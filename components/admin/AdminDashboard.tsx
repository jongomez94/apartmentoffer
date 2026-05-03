"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { paths } from "@/lib/navigation";
import type { AdminEventRow, AdminGuestStoryRow } from "@/lib/admin/types";
import { deleteEvent, deleteGuestStory, signOutAdmin, upsertEvent, upsertGuestStory } from "@/lib/admin/actions";

function toDatetimeLocalValue(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function emptyEventDefaults(): Partial<AdminEventRow> {
  const now = new Date();
  return {
    id: "",
    slug: "",
    locale: "en",
    title: "",
    summary: "",
    description: "",
    tag: "",
    starts_at: now.toISOString(),
    ends_at: null,
    location_note: "",
    image_url: "",
    is_published: true,
  };
}

function emptyStoryDefaults(): Partial<AdminGuestStoryRow> {
  const now = new Date();
  return {
    id: "",
    slug: "",
    locale: "en",
    guest_name: "",
    subtitle: "",
    headline: "",
    body: "",
    experience_types: ["general"],
    stay_summary: "",
    image_src: "",
    image_alt: "",
    published_at: now.toISOString(),
    is_published: true,
  };
}

const inputClass =
  "mt-1 w-full rounded-sm border border-stone-300 bg-white px-3 py-2 font-sans text-sm text-stone-900 outline-none ring-sage/30 focus:ring-2";
const labelClass = "block font-sans text-xs font-medium uppercase tracking-wider text-stone-500";

export default function AdminDashboard({
  locale,
  userEmail,
  events,
  stories,
  loadError,
}: {
  locale: Locale;
  userEmail: string;
  events: AdminEventRow[];
  stories: AdminGuestStoryRow[];
  loadError: string | null;
}) {
  const router = useRouter();
  const p = paths(locale);
  const [tab, setTab] = useState<"events" | "stories">("events");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [eventDraft, setEventDraft] = useState<Partial<AdminEventRow>>(() => emptyEventDefaults());
  const [storyDraft, setStoryDraft] = useState<Partial<AdminGuestStoryRow>>(() => emptyStoryDefaults());

  function refresh() {
    router.refresh();
  }

  async function onSaveEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const fd = new FormData(e.currentTarget);
    const res = await upsertEvent(locale, undefined, fd);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setMessage(locale === "es" ? "Evento guardado." : "Event saved.");
    setEventDraft(emptyEventDefaults());
    refresh();
  }

  async function onSaveStory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const fd = new FormData(e.currentTarget);
    const res = await upsertGuestStory(locale, undefined, fd);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setMessage(locale === "es" ? "Historia guardada." : "Story saved.");
    setStoryDraft(emptyStoryDefaults());
    refresh();
  }

  async function onDeleteEvent(id: string) {
    if (!confirm(locale === "es" ? "¿Eliminar este evento?" : "Delete this event?")) return;
    setError(null);
    const res = await deleteEvent(locale, id);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setMessage(locale === "es" ? "Evento eliminado." : "Event deleted.");
    refresh();
  }

  async function onDeleteStory(id: string) {
    if (!confirm(locale === "es" ? "¿Eliminar esta historia?" : "Delete this story?")) return;
    setError(null);
    const res = await deleteGuestStory(locale, id);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setMessage(locale === "es" ? "Historia eliminada." : "Story deleted.");
    refresh();
  }

  function loadEvent(row: AdminEventRow) {
    setEventDraft({ ...row });
    setTab("events");
    setMessage(null);
    setError(null);
  }

  function loadStory(row: AdminGuestStoryRow) {
    setStoryDraft({ ...row });
    setTab("stories");
    setMessage(null);
    setError(null);
  }

  const storyTypesValue = (storyDraft.experience_types ?? []).join(", ");

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="flex flex-col gap-4 border-b border-stone-200 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-sans text-xs uppercase tracking-wider text-sage">Admin</p>
          <h1 className="mt-1 font-serif text-4xl font-medium text-stone-900">
            {locale === "es" ? "Panel" : "Dashboard"}
          </h1>
          <p className="mt-2 font-sans text-sm text-stone-600">{userEmail}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={p.home} className="rounded-sm border border-stone-300 bg-white px-4 py-2 font-sans text-sm text-stone-700 hover:bg-stone-50">
            {locale === "es" ? "Ver sitio" : "View site"}
          </Link>
          <form action={signOutAdmin.bind(null, locale)}>
            <button
              type="submit"
              className="rounded-sm border border-stone-900/20 bg-stone-900 px-4 py-2 font-sans text-sm font-medium text-white hover:bg-stone-800"
            >
              {locale === "es" ? "Salir" : "Sign out"}
            </button>
          </form>
        </div>
      </header>

      {loadError ? (
        <div className="mt-6 rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 font-sans text-sm text-amber-950">
          <p className="font-medium">{locale === "es" ? "No se pudieron cargar los datos" : "Could not load data"}</p>
          <p className="mt-1 text-amber-900/90">{loadError}</p>
          <p className="mt-2 text-xs text-amber-900/80">
            {locale === "es"
              ? "Si acabas de aplicar las políticas RLS, añade tu usuario a public.admin_users (ver supabase/admin-rls.sql)."
              : "If you just applied RLS policies, add your user to public.admin_users (see supabase/admin-rls.sql)."}
          </p>
        </div>
      ) : null}

      {message ? (
        <p className="mt-6 rounded-sm border border-sage/30 bg-sage/10 px-4 py-2 font-sans text-sm text-stone-800">{message}</p>
      ) : null}
      {error ? <p className="mt-3 rounded-sm border border-red-200 bg-red-50 px-4 py-2 font-sans text-sm text-red-900">{error}</p> : null}

      <div className="mt-8 flex gap-2 border-b border-stone-200 pb-2">
        <button
          type="button"
          onClick={() => setTab("events")}
          className={`rounded-full px-4 py-2 font-sans text-sm font-medium ${
            tab === "events" ? "bg-stone-900 text-white" : "bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
          }`}
        >
          {locale === "es" ? "Eventos" : "Events"}
        </button>
        <button
          type="button"
          onClick={() => setTab("stories")}
          className={`rounded-full px-4 py-2 font-sans text-sm font-medium ${
            tab === "stories" ? "bg-stone-900 text-white" : "bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
          }`}
        >
          {locale === "es" ? "Historias" : "Guest stories"}
        </button>
      </div>

      {tab === "events" ? (
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="font-serif text-2xl font-medium text-stone-900">
              {locale === "es" ? "Todos los eventos" : "All events"}
            </h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-stone-200 bg-white">
              <table className="min-w-full border-collapse text-left font-sans text-sm">
                <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                  <tr>
                    <th className="px-3 py-2">{locale === "es" ? "Título" : "Title"}</th>
                    <th className="px-3 py-2">Slug</th>
                    <th className="px-3 py-2">Loc</th>
                    <th className="px-3 py-2">Pub</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-stone-500">
                        {locale === "es" ? "Sin eventos (o sin permisos)." : "No events (or no permission)."}
                      </td>
                    </tr>
                  ) : (
                    events.map((ev) => (
                      <tr key={ev.id} className="border-t border-stone-100">
                        <td className="px-3 py-2 font-medium text-stone-900">{ev.title}</td>
                        <td className="px-3 py-2 text-stone-600">{ev.slug}</td>
                        <td className="px-3 py-2 text-stone-600">{ev.locale}</td>
                        <td className="px-3 py-2 text-stone-600">{ev.is_published ? "✓" : "—"}</td>
                        <td className="px-3 py-2 text-right">
                          <button type="button" className="text-sage hover:underline" onClick={() => loadEvent(ev)}>
                            {locale === "es" ? "Editar" : "Edit"}
                          </button>
                          <button type="button" className="ml-3 text-red-700 hover:underline" onClick={() => onDeleteEvent(ev.id)}>
                            {locale === "es" ? "Borrar" : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-stone-900">
              {eventDraft.id ? (locale === "es" ? "Editar evento" : "Edit event") : locale === "es" ? "Nuevo evento" : "New event"}
            </h2>
            <form onSubmit={onSaveEvent} className="mt-4 space-y-4 rounded-lg border border-stone-200 bg-white p-6">
              <input type="hidden" name="id" value={eventDraft.id ?? ""} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Slug</label>
                  <input className={inputClass} name="slug" required value={eventDraft.slug ?? ""} onChange={(e) => setEventDraft((d) => ({ ...d, slug: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Locale</label>
                  <select className={inputClass} name="locale" value={eventDraft.locale ?? "en"} onChange={(e) => setEventDraft((d) => ({ ...d, locale: e.target.value }))}>
                    <option value="en">en</option>
                    <option value="es">es</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Title</label>
                <input className={inputClass} name="title" required value={eventDraft.title ?? ""} onChange={(e) => setEventDraft((d) => ({ ...d, title: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Summary</label>
                <textarea className={inputClass} name="summary" rows={2} value={eventDraft.summary ?? ""} onChange={(e) => setEventDraft((d) => ({ ...d, summary: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea className={inputClass} name="description" rows={4} value={eventDraft.description ?? ""} onChange={(e) => setEventDraft((d) => ({ ...d, description: e.target.value }))} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Tag</label>
                  <input className={inputClass} name="tag" value={eventDraft.tag ?? ""} onChange={(e) => setEventDraft((d) => ({ ...d, tag: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Image URL</label>
                  <input className={inputClass} name="image_url" value={eventDraft.image_url ?? ""} onChange={(e) => setEventDraft((d) => ({ ...d, image_url: e.target.value }))} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>starts_at</label>
                  <input
                    className={inputClass}
                    name="starts_at"
                    type="datetime-local"
                    required
                    value={eventDraft.starts_at ? toDatetimeLocalValue(eventDraft.starts_at) : ""}
                    onChange={(e) => setEventDraft((d) => ({ ...d, starts_at: new Date(e.target.value).toISOString() }))}
                  />
                </div>
                <div>
                  <label className={labelClass}>ends_at (optional)</label>
                  <input
                    className={inputClass}
                    name="ends_at"
                    type="datetime-local"
                    value={eventDraft.ends_at ? toDatetimeLocalValue(eventDraft.ends_at) : ""}
                    onChange={(e) =>
                      setEventDraft((d) => ({
                        ...d,
                        ends_at: e.target.value ? new Date(e.target.value).toISOString() : null,
                      }))
                    }
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Location note</label>
                <textarea className={inputClass} name="location_note" rows={2} value={eventDraft.location_note ?? ""} onChange={(e) => setEventDraft((d) => ({ ...d, location_note: e.target.value }))} />
              </div>
              <label className="flex items-center gap-2 font-sans text-sm text-stone-700">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={!!eventDraft.is_published}
                  onChange={(e) => setEventDraft((d) => ({ ...d, is_published: e.target.checked }))}
                />
                {locale === "es" ? "Publicado" : "Published"}
              </label>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="rounded-sm bg-stone-900 px-5 py-2 font-sans text-sm font-medium text-white hover:bg-stone-800">
                  {locale === "es" ? "Guardar evento" : "Save event"}
                </button>
                <button
                  type="button"
                  className="rounded-sm border border-stone-300 bg-white px-5 py-2 font-sans text-sm text-stone-700 hover:bg-stone-50"
                  onClick={() => setEventDraft(emptyEventDefaults())}
                >
                  {locale === "es" ? "Nuevo (limpiar)" : "New (clear)"}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="font-serif text-2xl font-medium text-stone-900">
              {locale === "es" ? "Todas las historias" : "All guest stories"}
            </h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-stone-200 bg-white">
              <table className="min-w-full border-collapse text-left font-sans text-sm">
                <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                  <tr>
                    <th className="px-3 py-2">Headline</th>
                    <th className="px-3 py-2">Slug</th>
                    <th className="px-3 py-2">Loc</th>
                    <th className="px-3 py-2">Pub</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {stories.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-stone-500">
                        {locale === "es" ? "Sin historias (o sin permisos)." : "No stories (or no permission)."}
                      </td>
                    </tr>
                  ) : (
                    stories.map((s) => (
                      <tr key={s.id} className="border-t border-stone-100">
                        <td className="px-3 py-2 font-medium text-stone-900">{s.headline}</td>
                        <td className="px-3 py-2 text-stone-600">{s.slug}</td>
                        <td className="px-3 py-2 text-stone-600">{s.locale}</td>
                        <td className="px-3 py-2 text-stone-600">{s.is_published ? "✓" : "—"}</td>
                        <td className="px-3 py-2 text-right">
                          <button type="button" className="text-sage hover:underline" onClick={() => loadStory(s)}>
                            {locale === "es" ? "Editar" : "Edit"}
                          </button>
                          <button type="button" className="ml-3 text-red-700 hover:underline" onClick={() => onDeleteStory(s.id)}>
                            {locale === "es" ? "Borrar" : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium text-stone-900">
              {storyDraft.id ? (locale === "es" ? "Editar historia" : "Edit story") : locale === "es" ? "Nueva historia" : "New story"}
            </h2>
            <form onSubmit={onSaveStory} className="mt-4 space-y-4 rounded-lg border border-stone-200 bg-white p-6">
              <input type="hidden" name="id" value={storyDraft.id ?? ""} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Slug</label>
                  <input className={inputClass} name="slug" required value={storyDraft.slug ?? ""} onChange={(e) => setStoryDraft((d) => ({ ...d, slug: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Locale</label>
                  <select className={inputClass} name="locale" value={storyDraft.locale ?? "en"} onChange={(e) => setStoryDraft((d) => ({ ...d, locale: e.target.value }))}>
                    <option value="en">en</option>
                    <option value="es">es</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Guest name</label>
                <input className={inputClass} name="guest_name" required value={storyDraft.guest_name ?? ""} onChange={(e) => setStoryDraft((d) => ({ ...d, guest_name: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Subtitle</label>
                <input className={inputClass} name="subtitle" value={storyDraft.subtitle ?? ""} onChange={(e) => setStoryDraft((d) => ({ ...d, subtitle: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Headline</label>
                <input className={inputClass} name="headline" required value={storyDraft.headline ?? ""} onChange={(e) => setStoryDraft((d) => ({ ...d, headline: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Body</label>
                <textarea className={inputClass} name="body" rows={5} required value={storyDraft.body ?? ""} onChange={(e) => setStoryDraft((d) => ({ ...d, body: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>experience_types (comma)</label>
                <input
                  className={inputClass}
                  name="experience_types"
                  value={storyTypesValue}
                  onChange={(e) =>
                    setStoryDraft((d) => ({
                      ...d,
                      experience_types: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    }))
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Stay summary</label>
                <textarea className={inputClass} name="stay_summary" rows={2} value={storyDraft.stay_summary ?? ""} onChange={(e) => setStoryDraft((d) => ({ ...d, stay_summary: e.target.value }))} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>image_src</label>
                  <input className={inputClass} name="image_src" value={storyDraft.image_src ?? ""} onChange={(e) => setStoryDraft((d) => ({ ...d, image_src: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>image_alt</label>
                  <input className={inputClass} name="image_alt" value={storyDraft.image_alt ?? ""} onChange={(e) => setStoryDraft((d) => ({ ...d, image_alt: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className={labelClass}>published_at</label>
                <input
                  className={inputClass}
                  name="published_at"
                  type="datetime-local"
                  required
                  value={storyDraft.published_at ? toDatetimeLocalValue(storyDraft.published_at) : ""}
                  onChange={(e) => setStoryDraft((d) => ({ ...d, published_at: new Date(e.target.value).toISOString() }))}
                />
              </div>
              <label className="flex items-center gap-2 font-sans text-sm text-stone-700">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={!!storyDraft.is_published}
                  onChange={(e) => setStoryDraft((d) => ({ ...d, is_published: e.target.checked }))}
                />
                {locale === "es" ? "Publicado" : "Published"}
              </label>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="rounded-sm bg-stone-900 px-5 py-2 font-sans text-sm font-medium text-white hover:bg-stone-800">
                  {locale === "es" ? "Guardar historia" : "Save story"}
                </button>
                <button
                  type="button"
                  className="rounded-sm border border-stone-300 bg-white px-5 py-2 font-sans text-sm text-stone-700 hover:bg-stone-50"
                  onClick={() => setStoryDraft(emptyStoryDefaults())}
                >
                  {locale === "es" ? "Nueva (limpiar)" : "New (clear)"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
