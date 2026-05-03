import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { createSupabaseServerCookieClient } from "@/lib/supabase/server-cookies";
import { paths } from "@/lib/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = isValidLocale(locale) ? locale : "en";
  return {
    title: l === "es" ? "Admin · acceso" : "Admin · sign in",
    robots: { index: false, follow: false },
  };
}

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) redirect("/en/admin/login");

  const supabase = await createSupabaseServerCookieClient();
  if (!supabase) redirect(paths(locale as Locale).home);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect(`/${locale}/admin/dashboard`);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-0px)] max-w-md flex-col justify-center px-6 py-16">
      <div className="rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-medium text-stone-900">
          {locale === "es" ? "Acceso admin" : "Admin sign in"}
        </h1>
        <p className="mt-2 font-sans text-sm text-stone-600">
          {locale === "es"
            ? "Inicia sesión con tu cuenta de Supabase Auth."
            : "Sign in with your Supabase Auth account."}
        </p>
        <div className="mt-8">
          <AdminLoginForm locale={locale as Locale} />
        </div>
        <p className="mt-8 text-center font-sans text-xs text-stone-500">
          <Link href={paths(locale as Locale).home} className="text-sage hover:underline">
            {locale === "es" ? "← Volver al portal" : "← Back to portal"}
          </Link>
        </p>
      </div>
    </main>
  );
}
