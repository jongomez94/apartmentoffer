export type AdminEventRow = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  summary: string | null;
  description: string | null;
  tag: string | null;
  starts_at: string;
  ends_at: string | null;
  location_note: string | null;
  image_url: string | null;
  is_published: boolean;
};

export type AdminGuestStoryRow = {
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
