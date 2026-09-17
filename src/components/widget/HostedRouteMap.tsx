"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import RouteMapDisplay from "./RouteMapDisplay";

const LIBRARIES: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

export default function HostedRouteMap({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f7f8fa]">
      <RouteMapDisplay
        pickupAddress={origin}
        dropoffAddress={destination}
        isLoaded={isLoaded}
      />
    </div>
  );
}
