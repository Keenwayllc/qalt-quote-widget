"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  MarkerF,
} from "@react-google-maps/api";

interface RouteMapDisplayProps {
  pickupAddress: string;
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

export default function RouteMapDisplay({
  pickupAddress,
  dropoffAddress,
  isLoaded,
  onRouteInfo,
}: RouteMapDisplayProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [routeColor, setRouteColor] = useState("#087c68");
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [lastRoute, setLastRoute] = useState({ origin: "", destination: "" });

  useEffect(() => {
    if (!shellRef.current) return;
    const inheritedRing = getComputedStyle(shellRef.current).getPropertyValue("--ring");
    if (inheritedRing) setRouteColor(cleanHex(inheritedRing));
  }, [pickupAddress, dropoffAddress]);

  const directionsCallback = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status !== "OK" || !result) return;

      setDirections(result);
      setLastRoute({ origin: pickupAddress, destination: dropoffAddress });

      const leg = result.routes[0]?.legs[0];
      if (leg && onRouteInfo) {
        onRouteInfo({
          distance: leg.distance?.text || "",
          duration: leg.duration?.text || "",
          originCity: leg.start_address.split(",").slice(-3, -2)[0]?.trim() || "",
          destinationCity: leg.end_address.split(",").slice(-3, -2)[0]?.trim() || "",
        });
      }
    },
    [pickupAddress, dropoffAddress, onRouteInfo]
  );

  const needsNewRoute =
    pickupAddress &&
    dropoffAddress &&
    (lastRoute.origin !== pickupAddress || lastRoute.destination !== dropoffAddress);

  if (!isLoaded || !pickupAddress || !dropoffAddress) return null;

  const leg = directions?.routes[0]?.legs[0];
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

        {leg?.start_location && markerIcon && (
          <MarkerF
            position={leg.start_location}
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

        {leg?.end_location && markerIcon && (
          <MarkerF
            position={leg.end_location}
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
