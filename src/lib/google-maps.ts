
type DistanceResult = {
  distanceMiles: number;
  durationMinutes: number;
};

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
