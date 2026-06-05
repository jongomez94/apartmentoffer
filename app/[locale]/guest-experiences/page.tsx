import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getGuestStories } from "@/lib/guest-stories";
import { getGuestExperiencesPageCopy } from "@/lib/content/guest-experiences-meta";
import { getGooglePlaceReviews } from "@/lib/google-reviews/fetch";
import GuestExperiencesView from "@/components/guest-experiences/GuestExperiencesView";

/** Read Supabase on every request (Vercel/local), not only at build time. */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const copy = getGuestExperiencesPageCopy(locale as Locale);
  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function GuestExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [stories, googleReviews] = await Promise.all([
    getGuestStories(locale),
    getGooglePlaceReviews(),
  ]);

  return (
    <GuestExperiencesView
      stories={stories}
      locale={locale as Locale}
      googleReviews={googleReviews}
    />
  );
}
