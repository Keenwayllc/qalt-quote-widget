"use client";

import { useState, useCallback } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

interface RouteMapDisplayProps {
  pickupAddress: string;
  dropoffAddress: string;
  isLoaded: boolean;
  onRouteInfo?: (info: { distance: string; duration: string; originCity: string; destinationCity: string }) => void;
}

export default function RouteMapDisplay({ pickupAddress, dropoffAddress, isLoaded, onRouteInfo }: RouteMapDisplayProps) {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [lastRoute, setLastRoute] = useState({ origin: "", destination: "" });

  const directionsCallback = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === "OK" && result) {
        setDirections(result);
        setLastRoute({ origin: pickupAddress, destination: dropoffAddress });

        const leg = result.routes[0]?.legs[0];
        if (leg && onRouteInfo) {
          onRouteInfo({
            distance: leg.distance?.text || "",
            duration: leg.duration?.text || "",
            originCity: leg.start_address.split(',').slice(-3, -2)[0]?.trim() || "",
            destinationCity: leg.end_address.split(',').slice(-3, -2)[0]?.trim() || "",
          });
        }
      }
    },
    [pickupAddress, dropoffAddress, onRouteInfo]
  );

  const needsNewRoute =
    pickupAddress &&
    dropoffAddress &&
    (lastRoute.origin !== pickupAddress || lastRoute.destination !== dropoffAddress);

  if (!isLoaded || !pickupAddress || !dropoffAddress) return null;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        disableDefaultUI: true,
        zoomControl: false,
        scrollwheel: false,
        draggable: true, // Allow dragging now that it's larger
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#94a3b8" }], // slate-400
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#f1f5f9" }], // slate-100
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f8fafc" }], // slate-50
          },
        ],
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
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: "#10b981", // emerald-500
              strokeWeight: 6, // Slightly thicker for larger map
              strokeOpacity: 0.8,
            },
            markerOptions: {
               // Use standard markers but ensure they look good
            }
          }}
        />
      )}
    </GoogleMap>
  );
}
