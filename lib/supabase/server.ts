import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "./env";

/**
 * Server-side Supabase client **without** user cookies (anonymous reads).
 * Use for public pages where no session is required.
 */
export function createSupabaseServerClient(): SupabaseClient | null {
  const env = getSupabasePublicEnv();
  if (!env) return null;
  return createClient(env.url, env.anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
