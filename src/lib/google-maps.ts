
/**
 * Calculates the driving distance between two addresses in miles using Google Maps Distance Matrix API.
 * This is a server-side only function.
 */
export async function calculateDrivingDistance(origin: string, destination: string): Promise<number | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
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
      const distanceInMeters = data.rows[0].elements[0].distance.value;
      const distanceInMiles = distanceInMeters * 0.000621371; // Convert meters to miles
      return distanceInMiles;
    } else {
      console.error("Distance Matrix API error:", data.status, data.rows[0].elements[0].status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching distance from Google Maps:", error);
    return null;
  }
}
