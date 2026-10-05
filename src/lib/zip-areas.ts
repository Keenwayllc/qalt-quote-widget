export type ZipGeometry = { type: "Polygon"; coordinates: number[][][] } | { type: "MultiPolygon"; coordinates: number[][][][] };
export type ZipFeature = { type: "Feature"; properties: { zip: string }; geometry: ZipGeometry };
export type ZipAreas = { type: "FeatureCollection"; features: ZipFeature[] };

export function parseZipAreaQuery(input: string): string[] {
  const values = input.split(",");
  if (!input || values.length > 20 || values.some((zip) => !/^\d{5}$/.test(zip))) throw new Error("Enter 1 to 20 five-digit ZIP codes.");
  return [...new Set(values)].sort();
}

export function censusZipAreaUrl(zips: string[]): string {
  const url = new URL("https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/MapServer/2/query");
  url.search = new URLSearchParams({ where: `ZCTA5 IN (${parseZipAreaQuery(zips.join(",")).map(zip => `'${zip}'`).join(",")})`, outFields: "ZCTA5", returnGeometry: "true", outSR: "4326", f: "geojson", maxAllowableOffset: "0.0001", geometryPrecision: "5" }).toString();
  return url.toString();
}

export function normalizeZipAreas(value: unknown, requested: string[]): ZipAreas {
  const data = value as { type?: string; features?: Array<{ properties?: { ZCTA5?: string }; geometry?: ZipGeometry }>; error?: unknown };
  if (!data || data.error || data.type !== "FeatureCollection" || !Array.isArray(data.features) || data.features.length > 20) throw new Error("ZIP boundaries are unavailable.");
  let points = 0;
  const polygonValid = (polygon: number[][][]) => Array.isArray(polygon) && polygon.length > 0 && polygon.every(ring =>
    Array.isArray(ring) && ring.length >= 4 && ring.every(point => {
      points++;
      return points <= 200000 && Array.isArray(point) && point.length >= 2 && Number.isFinite(point[0]) && Number.isFinite(point[1]) && Math.abs(point[0]) <= 180 && Math.abs(point[1]) <= 90;
    }) && ring[0][0] === ring.at(-1)?.[0] && ring[0][1] === ring.at(-1)?.[1]);
  const features: ZipFeature[] = [];
  for (const feature of data.features) {
    const zip = feature.properties?.ZCTA5;
    if (!zip || !requested.includes(zip)) continue;
    const geometry = feature.geometry;
    if (!geometry || !(geometry.type === "Polygon" ? polygonValid(geometry.coordinates) : geometry.type === "MultiPolygon" && Array.isArray(geometry.coordinates) && geometry.coordinates.length > 0 && geometry.coordinates.every(polygonValid))) throw new Error("ZIP boundary geometry is unavailable.");
    features.push({ type: "Feature", properties: { zip }, geometry });
  }
  return { type: "FeatureCollection", features };
}

/** Fit the smallest longitude arc, including Alaska's areas across the date line. */
export function zipAreaBounds(areas: ZipAreas): { south: number; north: number; west: number; east: number } | null {
  let south = 90;
  let north = -90;
  const longitudes = new Set<number>();
  const addPolygon = (polygon: number[][][]) => polygon.forEach(ring => ring.forEach(([lng, lat]) => {
    south = Math.min(south, lat); north = Math.max(north, lat);
    longitudes.add((lng + 360) % 360);
  }));
  areas.features.forEach(feature => feature.geometry.type === "Polygon" ? addPolygon(feature.geometry.coordinates) : feature.geometry.coordinates.forEach(addPolygon));
  if (!longitudes.size) return null;
  const values = [...longitudes].sort((a, b) => a - b);
  let biggestGap = -1;
  let gapIndex = 0;
  values.forEach((lng, index) => {
    const gap = (index === values.length - 1 ? values[0] + 360 : values[index + 1]) - lng;
    if (gap > biggestGap) { biggestGap = gap; gapIndex = index; }
  });
  const normalize = (lng: number) => lng >= 180 ? lng - 360 : lng;
  return { south, north, west: normalize(values[(gapIndex + 1) % values.length]), east: normalize(values[gapIndex]) };
}
