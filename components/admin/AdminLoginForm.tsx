"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Locale } from "@/lib/i18n/config";

export default function AdminLoginForm({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signErr) {
        setError(signErr.message);
        setLoading(false);
        return;
      }
      router.replace(`/${locale}/admin/dashboard`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-email" className="block font-sans text-xs font-medium uppercase tracking-wider text-stone-500">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-sm border border-stone-300 bg-white px-3 py-2 font-sans text-sm text-stone-900 outline-none ring-sage/30 focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="block font-sans text-xs font-medium uppercase tracking-wider text-stone-500">
          {locale === "es" ? "Contraseña" : "Password"}
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-sm border border-stone-300 bg-white px-3 py-2 font-sans text-sm text-stone-900 outline-none ring-sage/30 focus:ring-2"
        />
      </div>
      {error ? <p className="font-sans text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-stone-900 px-4 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-stone-800 disabled:opacity-60"
      >
        {loading ? (locale === "es" ? "Entrando…" : "Signing in…") : locale === "es" ? "Entrar" : "Sign in"}
      </button>
    </form>
  );
}
