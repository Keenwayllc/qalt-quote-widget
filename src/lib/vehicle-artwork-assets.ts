import type { VehicleArtKind } from "./form-vehicles";

/**
 * Rendered vehicle artwork, one transparent WebP per theme, built from the
 * full-size renders by scripts/build-vehicle-artwork.mjs. Kinds missing here
 * fall back to the drawn silhouettes in VehicleArtwork.tsx.
 */
export type VehicleArtAsset = { light: string; dark: string };

const art = (file: string): VehicleArtAsset => ({
  light: `/images/vehicles/light/${file}.webp`,
  dark: `/images/vehicles/dark/${file}.webp`,
});

export const VEHICLE_ARTWORK_ASSETS: Partial<Record<VehicleArtKind, VehicleArtAsset>> = {
  bicycle: art("bicycle"),
  "cargo-bike": art("cargo-bike"),
  sedan: art("sedan"),
  "straight-truck": art("straight-truck"),
  "box-truck": art("box-truck"),
  "box-truck-16": art("box-truck"),
  "box-truck-20": art("box-truck"),
  "box-truck-24": art("box-truck"),
  "box-truck-26": art("box-truck"),
};
