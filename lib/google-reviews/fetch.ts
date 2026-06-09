import { unstable_cache } from "next/cache";
import type { Locale } from "@/lib/i18n/config";
import { PORTAL_COORDINATES, PORTAL_GOOGLE_MAPS_URL } from "@/lib/site-location";
import { getHardcodedGoogleReviews } from "./hardcoded-reviews";
import type { GooglePlaceReview, GooglePlaceReviewsSummary } from "./types";

const PLACE_SEARCH_QUERY = "Casa Portal de la Montaña Los Planes de Renderos";
const FIELD_MASK_DETAILS = "displayName,rating,userRatingCount,reviews,googleMapsUri";
const FIELD_MASK_SEARCH = "places.id,places.displayName";

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
};

type PlaceDetailsResponse = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

async function findPlaceId(apiKey: string): Promise<string | null> {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK_SEARCH,
    },
    body: JSON.stringify({
      textQuery: PLACE_SEARCH_QUERY,
      locationBias: {
        circle: {
          center: {
            latitude: PORTAL_COORDINATES.lat,
            longitude: PORTAL_COORDINATES.lng,
          },
          radius: 800,
        },
      },
      maxResultCount: 1,
    }),
    next: { revalidate: 86400 },
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { places?: Array<{ id?: string }> };
  const id = data.places?.[0]?.id;
  return id ?? null;
}

function mapReview(r: PlacesReview): GooglePlaceReview | null {
  const text = r.text?.text?.trim();
  if (!text) return null;
  return {
    authorName: r.authorAttribution?.displayName?.trim() || "Google user",
    rating: r.rating ?? 0,
    text,
    relativeTime: r.relativePublishTimeDescription ?? "",
    authorPhotoUrl: r.authorAttribution?.photoUri,
  };
}

async function fetchGooglePlaceReviewsUncached(): Promise<GooglePlaceReviewsSummary | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) return null;

  let placeId = process.env.GOOGLE_PLACE_ID?.trim();
  if (!placeId) {
    placeId = (await findPlaceId(apiKey)) ?? undefined;
  }
  if (!placeId) return null;

  const placeResourceId = placeId.startsWith("places/") ? placeId.slice("places/".length) : placeId;
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeResourceId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK_DETAILS,
    },
    next: { revalidate: 86400 },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as PlaceDetailsResponse;
  const reviews = (data.reviews ?? []).map(mapReview).filter((r): r is GooglePlaceReview => r !== null);

  if (reviews.length === 0 && !data.rating) return null;

  return {
    placeName: data.displayName?.text ?? "Casa Portal de la Montaña",
    rating: data.rating ?? 0,
    totalCount: data.userRatingCount ?? 0,
    reviews,
    mapsUrl: data.googleMapsUri ?? PORTAL_GOOGLE_MAPS_URL,
  };
}

export const getGooglePlaceReviews = unstable_cache(
  fetchGooglePlaceReviewsUncached,
  ["google-place-reviews"],
  { revalidate: 86400 },
);

/** Live API when configured; otherwise hardcoded reviews from Google. */
export async function getGooglePlaceReviewsForDisplay(
  locale: Locale,
): Promise<GooglePlaceReviewsSummary> {
  const live = await getGooglePlaceReviews();
  if (live?.reviews.length) return live;
  return getHardcodedGoogleReviews(locale);
}
