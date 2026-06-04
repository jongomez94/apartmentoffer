/** Bump when you replace photos in public/gardenstudio (clears stale CDN/browser cache). */
export const GARDEN_STUDIO_VERSION = "1";

export function withGardenStudioCache(src: string): string {
  if (!src.startsWith("/gardenstudio/")) return src;
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}v=${GARDEN_STUDIO_VERSION}`;
}
