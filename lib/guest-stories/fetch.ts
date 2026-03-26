import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { GuestStory } from "./types";

type GuestStoryRow = {
  id: string;
  slug: string;
  locale: string;
  guest_name: string;
  subtitle: string;
  headline: string;
  body: string;
  experience_types: string[] | null;
  stay_summary: string | null;
  image_src: string | null;
  image_alt: string | null;
  published_at: string;
  is_published: boolean;
};

const experienceTypeSet = new Set<GuestStory["experienceTypes"][number]>([
  "apartment",
  "garden_studio",
  "events",
  "general",
]);

function mapExperienceTypes(raw: string[] | null): GuestStory["experienceTypes"] {
  if (!raw?.length) return ["general"];
  const out = raw.filter((t): t is GuestStory["experienceTypes"][number] =>
    experienceTypeSet.has(t as GuestStory["experienceTypes"][number]),
  );
  return out.length ? out : ["general"];
}

function mapRow(row: GuestStoryRow): GuestStory {
  return {
    id: row.id,
    slug: row.slug,
    guestName: row.guest_name,
    subtitle: row.subtitle,
    headline: row.headline,
    body: row.body,
    experienceTypes: mapExperienceTypes(row.experience_types),
    staySummary: row.stay_summary ?? undefined,
    imageSrc: row.image_src ?? undefined,
    imageAlt: row.image_alt ?? undefined,
    publishedAt: row.published_at,
  };
}

export async function fetchGuestStoriesFromSupabase(locale: string): Promise<GuestStory[] | null> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("guest_stories")
    .select("*")
    .eq("locale", locale)
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error || !data) return null;
  return (data as GuestStoryRow[]).map(mapRow);
}
