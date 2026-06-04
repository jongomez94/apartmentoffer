/** Single source of truth for map links across the site (apartment, garden studio, etc.) */
export const PORTAL_GOOGLE_MAPS_URL = "https://maps.app.goo.gl/aRmVkDjJ9QZnWN9u5";

export const PORTAL_COORDINATES = {
  lat: 13.633709641672699,
  lng: -89.17520788607239,
} as const;

export function googleMapsUrl(_coords: { lat: number; lng: number } = PORTAL_COORDINATES) {
  return PORTAL_GOOGLE_MAPS_URL;
}
