"use client";

import { useEffect, useRef, useState } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  MarkerF,
} from "@react-google-maps/api";

interface RouteMapDisplayProps {
  pickupAddress: string;
  intermediateStops?: Array<{ address: string }>;
  dropoffAddress: string;
  isLoaded: boolean;
  onRouteInfo?: (info: {
    distance: string;
    duration: string;
    originCity: string;
    destinationCity: string;
  }) => void;
}

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ saturation: -92 }, { lightness: 8 }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d9dde3" }, { weight: 0.7 }],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8b929d" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f7f8fa" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#e1e4e9" }, { weight: 1 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#d4d9e0" }, { weight: 1.15 }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9aa1ab" }],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#eef1f4" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a2a8b1" }],
  },
];

const cleanHex = (value: string) => {
  const trimmed = value.trim();
  if (/^#[0-9a-fA-F]{8}$/.test(trimmed)) return trimmed.slice(0, 7);
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  return "#087c68";
};

function isQaltHostedHostname(hostname: string) {
  const host = hostname.toLowerCase();
  return (
    host === "qalt.site" ||
    host === "www.qalt.site" ||
    host === "localhost" ||
    host.endsWith(".vercel.app")
  );
}

export default function RouteMapDisplay({
  pickupAddress,
  intermediateStops = [],
  dropoffAddress,
  isLoaded,
  onRouteInfo,
}: RouteMapDisplayProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [routeColor, setRouteColor] = useState("#087c68");
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [lastRoute, setLastRoute] = useState({ origin: "", destination: "", stopsKey: "" });
  const hostname = typeof window === "undefined" ? null : window.location.hostname;

  useEffect(() => {
    if (!shellRef.current) return;
    const inheritedRing = getComputedStyle(shellRef.current).getPropertyValue("--ring");
    if (inheritedRing) setRouteColor(cleanHex(inheritedRing));
  }, [pickupAddress, dropoffAddress, intermediateStops]);

  const stopsKey = intermediateStops.map((stop) => stop.address).join("\u0000");

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
      if (status !== "OK" || !result) return;

      setDirections(result);
      setLastRoute({ origin: pickupAddress, destination: dropoffAddress, stopsKey });

      const legs = result.routes[0]?.legs ?? [];
      if (legs.length > 0 && onRouteInfo) {
        const distanceMeters = legs.reduce((sum, leg) => sum + (leg.distance?.value ?? 0), 0);
        const durationSeconds = legs.reduce((sum, leg) => sum + (leg.duration?.value ?? 0), 0);
        onRouteInfo({
          distance: `${(distanceMeters * 0.000621371).toFixed(1)} mi`,
          duration: durationSeconds >= 3600
            ? `${Math.floor(durationSeconds / 3600)} hr ${Math.round((durationSeconds % 3600) / 60)} min`
            : `${Math.round(durationSeconds / 60)} min`,
          originCity: legs[0].start_address.split(",").slice(-3, -2)[0]?.trim() || "",
          destinationCity: legs.at(-1)?.end_address.split(",").slice(-3, -2)[0]?.trim() || "",
        });
      }
    };

  const needsNewRoute =
    pickupAddress &&
    dropoffAddress &&
    (lastRoute.origin !== pickupAddress || lastRoute.destination !== dropoffAddress || lastRoute.stopsKey !== stopsKey);

  if (!pickupAddress || !dropoffAddress) return null;

  if (hostname && !isQaltHostedHostname(hostname)) {
    const src = `https://www.qalt.site/widget-map?origin=${encodeURIComponent(
      pickupAddress
    )}&destination=${encodeURIComponent(dropoffAddress)}&stops=${encodeURIComponent(JSON.stringify(intermediateStops.map((stop) => stop.address)))}`;

    return (
      <div ref={shellRef} className="h-full w-full bg-[#f7f8fa]">
        <iframe
          src={src}
          title="Delivery route map"
          className="h-full w-full border-0"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  if (!isLoaded) {
    return <div ref={shellRef} className="h-full w-full bg-[#f7f8fa]" />;
  }

  const legs = directions?.routes[0]?.legs ?? [];
  const firstLeg = legs[0];
  const lastLeg = legs.at(-1);
  const markerIcon =
    typeof google !== "undefined"
      ? {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#ffffff",
          fillOpacity: 1,
          strokeColor: routeColor,
          strokeOpacity: 1,
          strokeWeight: 2.5,
          scale: 8,
        }
      : undefined;

  return (
    <div ref={shellRef} className="h-full w-full bg-[#f7f8fa]">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position:
              typeof google !== "undefined"
                ? google.maps.ControlPosition.RIGHT_BOTTOM
                : undefined,
          },
          gestureHandling: "cooperative",
          clickableIcons: false,
          keyboardShortcuts: false,
          backgroundColor: "#f7f8fa",
          styles: MAP_STYLES,
        }}
      >
        {needsNewRoute && (
          <DirectionsService
            options={{
              destination: dropoffAddress,
              origin: pickupAddress,
              waypoints: intermediateStops.map((stop) => ({ location: stop.address, stopover: true })),
              optimizeWaypoints: false,
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={directionsCallback}
          />
        )}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: routeColor,
                strokeWeight: 4.5,
                strokeOpacity: 0.96,
                clickable: false,
                zIndex: 4,
              },
            }}
          />
        )}

        {firstLeg?.start_location && markerIcon && (
          <MarkerF
            position={firstLeg.start_location}
            icon={markerIcon}
            label={{
              text: "A",
              color: routeColor,
              fontFamily: "Inter, Arial, sans-serif",
              fontWeight: "700",
              fontSize: "10px",
            }}
            zIndex={10}
          />
        )}

        {legs.slice(0, -1).map((leg, index) => leg.end_location && markerIcon ? (
          <MarkerF
            key={`stop-${index}`}
            position={leg.end_location}
            icon={markerIcon}
            label={{ text: String(index + 1), color: routeColor, fontFamily: "Inter, Arial, sans-serif", fontWeight: "700", fontSize: "9px" }}
            zIndex={10}
          />
        ) : null)}

        {lastLeg?.end_location && markerIcon && (
          <MarkerF
            position={lastLeg.end_location}
            icon={{ ...markerIcon, fillColor: routeColor }}
            label={{
              text: "B",
              color: "#ffffff",
              fontFamily: "Inter, Arial, sans-serif",
              fontWeight: "700",
              fontSize: "10px",
            }}
            zIndex={10}
          />
        )}
      </GoogleMap>
    </div>
  );
}
