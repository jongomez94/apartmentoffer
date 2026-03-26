/** Event shaped for UI + calendar (from `events` table or static fallback). */
export type SiteEvent = {
  id: string;
  slug: string | null;
  title: string;
  summary: string;
  /** Short line under title on cards */
  dateLabel: string;
  description: string;
  startsAt: string;
  endsAt: string | null;
  tag?: string;
  locationNote?: string;
  imageUrl?: string;
};
