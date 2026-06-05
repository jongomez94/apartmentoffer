export type GooglePlaceReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  authorPhotoUrl?: string;
};

export type GooglePlaceReviewsSummary = {
  placeName: string;
  rating: number;
  totalCount: number;
  reviews: GooglePlaceReview[];
  mapsUrl: string;
};
