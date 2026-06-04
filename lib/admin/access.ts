import type { SupabaseClient } from "@supabase/supabase-js";

/** True when the signed-in user is listed in public.admin_users (see supabase/admin-rls.sql). */
export async function isAdminUser(supabase: SupabaseClient, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return false;
  return !!data;
}

export function adminAccessError(locale: string): string {
  return locale === "es"
    ? "Tu cuenta no está en public.admin_users. Ejecuta supabase/admin-rls.sql y añade el UUID de tu usuario de Auth."
    : "Your account is not in public.admin_users. Run supabase/admin-rls.sql and add your Auth user UUID.";
}

export function noRowUpdatedError(locale: string, entity: "event" | "story"): string {
  if (locale === "es") {
    return entity === "event"
      ? "No se actualizó ningún evento (permisos o id incorrecto)."
      : "No se actualizó ninguna historia (permisos o id incorrecto).";
  }
  return entity === "event"
    ? "No event was updated (permissions or wrong id)."
    : "No guest story was updated (permissions or wrong id).";
}

export function noRowDeletedError(locale: string, entity: "event" | "story"): string {
  if (locale === "es") {
    return entity === "event" ? "No se eliminó ningún evento." : "No se eliminó ninguna historia.";
  }
  return entity === "event" ? "No event was deleted." : "No guest story was deleted.";
}
