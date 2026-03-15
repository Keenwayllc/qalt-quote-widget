"use client";

import { useState, useCallback } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

interface RouteMapDisplayProps {
  pickupAddress: string;
  dropoffAddress: string;
  isLoaded: boolean;
}

export default function RouteMapDisplay({ pickupAddress, dropoffAddress, isLoaded }: RouteMapDisplayProps) {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [lastRoute, setLastRoute] = useState({ origin: "", destination: "" });

  const directionsCallback = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === "OK" && result) {
        setDirections(result);
        setLastRoute({ origin: pickupAddress, destination: dropoffAddress });
      }
    },
    [pickupAddress, dropoffAddress]
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
        draggable: false,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6c757d" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9ecef" }],
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
              strokeColor: "#10b981",
              strokeWeight: 4,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}
