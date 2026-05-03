"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerCookieClient } from "@/lib/supabase/server-cookies";
function adminDashboardPath(locale: string) {
  return `/${locale}/admin/dashboard`;
}

export async function signOutAdmin(locale: string) {
  const supabase = await createSupabaseServerCookieClient();
  if (supabase) await supabase.auth.signOut();
  redirect(`/${locale}/admin/login`);
}

function parseBool(v: FormDataEntryValue | null): boolean {
  return v === "on" || v === "true" || v === "1";
}

function parseOptionalIso(v: FormDataEntryValue | null): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function parseTypes(v: FormDataEntryValue | null): string[] {
  if (!v) return ["general"];
  return String(v)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function upsertEvent(locale: string, _prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerCookieClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };

  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) return { ok: false, error: "Not signed in" };

  const id = String(formData.get("id") ?? "").trim() || null;
  const slug = String(formData.get("slug") ?? "").trim();
  const loc = String(formData.get("locale") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!slug || !loc || !title) return { ok: false, error: "Slug, locale, and title are required" };

  const payload = {
    slug,
    locale: loc,
    title,
    summary: String(formData.get("summary") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    tag: String(formData.get("tag") ?? "").trim() || null,
    starts_at: parseOptionalIso(formData.get("starts_at")),
    ends_at: parseOptionalIso(formData.get("ends_at")),
    location_note: String(formData.get("location_note") ?? "").trim() || null,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    is_published: parseBool(formData.get("is_published")),
  };

  if (!payload.starts_at) return { ok: false, error: "starts_at is required" };

  if (id) {
    const { error } = await supabase.from("events").update(payload).eq("id", id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase.from("events").insert(payload);
    if (error) return { ok: false, error: error.message };
  }

  revalidatePath(adminDashboardPath(locale));
  return { ok: true };
}

export async function deleteEvent(locale: string, eventId: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerCookieClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) return { ok: false, error: "Not signed in" };

  const { error } = await supabase.from("events").delete().eq("id", eventId);
  if (error) return { ok: false, error: error.message };
  revalidatePath(adminDashboardPath(locale));
  return { ok: true };
}

export async function upsertGuestStory(locale: string, _prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerCookieClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };

  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) return { ok: false, error: "Not signed in" };

  const id = String(formData.get("id") ?? "").trim() || null;
  const slug = String(formData.get("slug") ?? "").trim();
  const loc = String(formData.get("locale") ?? "").trim();
  const guest_name = String(formData.get("guest_name") ?? "").trim();
  const headline = String(formData.get("headline") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!slug || !loc || !guest_name || !headline || !body) {
    return { ok: false, error: "Slug, locale, guest name, headline, and body are required" };
  }

  const publishedAt = parseOptionalIso(formData.get("published_at"));
  if (!publishedAt) return { ok: false, error: "published_at is required" };

  const payload = {
    slug,
    locale: loc,
    guest_name,
    subtitle: String(formData.get("subtitle") ?? "").trim() || "",
    headline,
    body,
    experience_types: parseTypes(formData.get("experience_types")),
    stay_summary: String(formData.get("stay_summary") ?? "").trim() || null,
    image_src: String(formData.get("image_src") ?? "").trim() || null,
    image_alt: String(formData.get("image_alt") ?? "").trim() || null,
    published_at: publishedAt,
    is_published: parseBool(formData.get("is_published")),
  };

  if (id) {
    const { error } = await supabase.from("guest_stories").update(payload).eq("id", id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase.from("guest_stories").insert(payload);
    if (error) return { ok: false, error: error.message };
  }

  revalidatePath(adminDashboardPath(locale));
  return { ok: true };
}

export async function deleteGuestStory(locale: string, storyId: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerCookieClient();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { data: userRes } = await supabase.auth.getUser();
  if (!userRes.user) return { ok: false, error: "Not signed in" };

  const { error } = await supabase.from("guest_stories").delete().eq("id", storyId);
  if (error) return { ok: false, error: error.message };
  revalidatePath(adminDashboardPath(locale));
  return { ok: true };
}
