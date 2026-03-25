/** Single source of truth for map links across the site (apartment, garden studio, etc.) */
export const PORTAL_COORDINATES = {
  lat: 13.633709641672699,
  lng: -89.17520788607239,
} as const;

export function googleMapsUrl(coords: { lat: number; lng: number } = PORTAL_COORDINATES) {
  return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
}
