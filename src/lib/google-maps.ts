
type DistanceResult = {
  distanceMiles: number;
  durationMinutes: number;
};

type GoogleAddressComponent = { types: string[]; long_name: string; short_name: string };

type GeocodeResult = {
  // The structured postal_code component, if Google returns one. Null is a
  // legitimate outcome for some addresses — the caller must NOT treat a missing
  // postal code as a contradiction.
  postalCode: string | null;
  postalCodeSuffix: string | null;
  formattedAddress: string;
  placeId: string | null;
  addressComponents: GoogleAddressComponent[];
};

/**
 * Server-side geocode of a free-form address via the Google Geocoding API.
 * Returns the strongest structured result available: the postal_code component
 * (not string-parsed from the formatted address), its suffix when present,
 * Google's canonical formatted address, the place_id, and the raw components.
 *
 * Server-side only. Returns null on missing key, API error, or zero results.
 * `postalCode: null` (with a non-null result) means Google resolved the address
 * but attached no postal_code — a valid state, not a contradiction.
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.warn("Google Maps API Key not found in environment variables.");
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && Array.isArray(data.results) && data.results.length > 0) {
      // Prefer the first result that actually carries a postal_code; fall back
      // to the top result so we still return a canonical address + place_id.
      const results = data.results as Array<{
        address_components?: GoogleAddressComponent[];
        formatted_address?: string;
        place_id?: string;
      }>;
      const withPostal = results.find((r) =>
        r.address_components?.some((c) => c.types.includes("postal_code"))
      );
      const chosen = withPostal ?? results[0];
      const components = chosen.address_components ?? [];
      const postalComponent = components.find((c) => c.types.includes("postal_code"));
      const suffixComponent = components.find((c) => c.types.includes("postal_code_suffix"));

      return {
        postalCode: postalComponent?.long_name ?? null,
        postalCodeSuffix: suffixComponent?.long_name ?? null,
        formattedAddress: String(chosen.formatted_address ?? address),
        placeId: chosen.place_id ?? null,
        addressComponents: components,
      };
    }

    console.error("[google-maps] Geocode API error — status:", data.status, "| error_message:", data.error_message);
    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
}

/**
 * Calculates the driving distance and duration between two addresses using Google Maps Distance Matrix API.
 * This is a server-side only function.
 */
export async function calculateDrivingDistance(origin: string, destination: string): Promise<DistanceResult | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.warn("Google Maps API Key not found in environment variables.");
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&units=imperial&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
      const element = data.rows[0].elements[0];
      const distanceMiles = element.distance.value * 0.000621371;
      const durationMinutes = Math.round(element.duration.value / 60);
      return { distanceMiles, durationMinutes };
    } else {
      console.error("[google-maps] Distance Matrix API error — top-level status:", data.status, "| element status:", data.rows?.[0]?.elements?.[0]?.status, "| error_message:", data.error_message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching distance from Google Maps:", error);
    return null;
  }
}
