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

// 45 and 47 ft trailers share the 48 ft render; every box truck size shares one.
export const VEHICLE_ARTWORK_ASSETS: Partial<Record<VehicleArtKind, VehicleArtAsset>> = {
  bicycle: art("bicycle"),
  "cargo-bike": art("cargo-bike"),
  "e-bike": art("electric-bicycle"),
  "e-scooter": art("scooter"),
  moped: art("moped"),
  motorcycle: art("motorcycle"),
  sedan: art("sedan"),
  hatchback: art("hatchback"),
  suv: art("suv"),
  minivan: art("minivan"),
  pickup: art("pickup-truck"),
  "cargo-van": art("cargo-van"),
  "high-roof-van": art("high-roof-cargo-van"),
  "sprinter-van": art("sprinter-van"),
  "straight-truck": art("straight-truck"),
  "box-truck": art("box-truck"),
  "box-truck-16": art("box-truck"),
  "box-truck-20": art("box-truck"),
  "box-truck-24": art("box-truck"),
  "box-truck-26": art("box-truck"),
  flatbed: art("flatbed-stake-bed"),
  refrigerated: art("refrigerated-truck"),
  "dump-truck": art("dump-truck"),
  "tanker-truck": art("tanker-truck"),
  "roll-off-truck": art("roll-off-truck"),
  "tractor-trailer": art("tractor-trailer-53ft"),
  "tractor-trailer-28": art("tractor-trailer-28ft"),
  "tractor-trailer-40": art("tractor-trailer-40ft"),
  "tractor-trailer-45": art("tractor-trailer-48ft"),
  "tractor-trailer-47": art("tractor-trailer-48ft"),
  "tractor-trailer-48": art("tractor-trailer-48ft"),
  "tractor-trailer-53": art("tractor-trailer-53ft"),
  "flatbed-tractor-trailer": art("flatbed-tractor-trailer"),
  doubles: art("doubles"),
  triples: art("triples"),
};
