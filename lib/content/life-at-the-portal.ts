/** Bump this when you replace photos in public/life-at-the-portal (clears stale CDN/browser cache). */
export const LIFE_AT_THE_PORTAL_VERSION = "2";

export function withLifeAtPortalCache(src: string): string {
  if (!src.startsWith("/life-at-the-portal/")) return src;
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}v=${LIFE_AT_THE_PORTAL_VERSION}`;
}
