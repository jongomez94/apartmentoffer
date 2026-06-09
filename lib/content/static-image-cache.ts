import { withGardenStudioCache } from "@/lib/content/garden-studio-assets";
import { withLifeAtPortalCache } from "@/lib/content/life-at-the-portal";

export function withStaticImageCache(src: string): string {
  if (src.startsWith("/gardenstudio/")) return withGardenStudioCache(src);
  if (src.startsWith("/life-at-the-portal/")) return withLifeAtPortalCache(src);
  return src;
}
