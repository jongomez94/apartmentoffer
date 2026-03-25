export type EventsContent = {
  metaTitle: string;
  metaDescription: string;
  hero: {
    headline: string;
    subheadline: string;
  };
  intro: {
    title: string;
    paragraphs: string[];
  };
  upcoming: {
    title: string;
    emptyMessage: string;
    events: Array<{
      title: string;
      date: string;
      description: string;
      tag?: string;
    }>;
  };
  join: {
    title: string;
    paragraph: string;
    ctaText: string;
  };
  locationNote: string;
  backToPortal: string;
};
