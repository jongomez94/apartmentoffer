import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { createSupabaseServerCookieClient } from "@/lib/supabase/server-cookies";
import type { AdminEventRow, AdminGuestStoryRow } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = isValidLocale(locale) ? locale : "en";
  return {
    title: l === "es" ? "Admin · panel" : "Admin · dashboard",
    robots: { index: false, follow: false },
  };
}

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) redirect("/en/admin/login");

  const supabase = await createSupabaseServerCookieClient();
  if (!supabase) redirect(`/${locale}`);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const { data: events, error: evErr } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: true });

  const { data: stories, error: stErr } = await supabase
    .from("guest_stories")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <AdminDashboard
      locale={locale as Locale}
      userEmail={user.email ?? ""}
      events={(events ?? []) as AdminEventRow[]}
      stories={(stories ?? []) as AdminGuestStoryRow[]}
      loadError={
        evErr?.message || stErr?.message
          ? [evErr?.message, stErr?.message].filter(Boolean).join(" · ")
          : null
      }
    />
  );
}
