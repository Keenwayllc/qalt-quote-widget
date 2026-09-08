
type DistanceResult = {
  distanceMiles: number;
  durationMinutes: number;
};

type GeocodeResult = {
  postalCode: string | null;
  formattedAddress: string;
};

type GoogleAddressComponent = { types: string[]; long_name: string; short_name: string };

/**
 * Server-side geocode of a free-form address via the Google Geocoding API,
 * returning the structured postal_code component (not string-parsed from the
 * formatted address) plus Google's canonical formatted address.
 *
 * Server-side only. Returns null on missing key, API error, or no result — the
 * caller MUST treat null as "unverifiable" and fail closed, never fall back to
 * a browser-supplied value.
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

    if (data.status === "OK" && data.results?.[0]) {
      const result = data.results[0];
      const postalComponent = (result.address_components as GoogleAddressComponent[] | undefined)?.find(
        (c) => c.types.includes("postal_code")
      );
      return {
        postalCode: postalComponent?.long_name ?? null,
        formattedAddress: String(result.formatted_address ?? address),
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
