/**
 * Guest experience story — structured for static data now and Supabase later.
 * A future `guest_stories` table could map 1:1 to this shape (snake_case columns).
 */
export type GuestStory = {
  id: string;
  /** URL-safe id for future /guest-experiences/[slug] pages */
  slug: string;
  guestName: string;
  /** Short line under the name, e.g. "Remote worker · Apartment stay" */
  subtitle: string;
  headline: string;
  body: string;
  /** Which offering(s) — useful for filters when you add DB */
  experienceTypes: Array<"apartment" | "garden_studio" | "events" | "general">;
  /** Optional stay context */
  staySummary?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** ISO date string — aligns with DB `published_at` */
  publishedAt: string;
};
