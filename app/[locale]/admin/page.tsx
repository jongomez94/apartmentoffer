import { redirect } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { createSupabaseServerCookieClient } from "@/lib/supabase/server-cookies";

export const dynamic = "force-dynamic";

export default async function AdminIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) redirect("/en/admin");

  const supabase = await createSupabaseServerCookieClient();
  if (!supabase) redirect(`/${locale}`);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect(`/${locale}/admin/dashboard`);
  redirect(`/${locale}/admin/login`);
}
