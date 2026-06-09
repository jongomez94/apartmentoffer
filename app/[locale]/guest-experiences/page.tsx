import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getGuestExperiencesPageCopy } from "@/lib/content/guest-experiences-meta";
import { getGooglePlaceReviewsForDisplay } from "@/lib/google-reviews/fetch";
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
  const googleReviews = await getGooglePlaceReviewsForDisplay(locale as Locale);

  return (
    <GuestExperiencesView locale={locale as Locale} googleReviews={googleReviews} />
  );
}
