"use client";

import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { zipAreaBounds, type ZipAreas } from "@/lib/zip-areas";

const LIBRARIES: ("places")[] = ["places"];
const CENTER = { lat: 39, lng: -98 };
const STYLE = { fillColor: "#df1731", fillOpacity: 0.18, strokeColor: "#df1731", strokeOpacity: 0.8, strokeWeight: 1.5, clickable: false };

export default function ZipAreaMap({ zips, allowSearch = false, title = "ZIP area map" }: { zips: string[]; allowSearch?: boolean; title?: string }) {
  const [search, setSearch] = useState("");
  const [lookedUp, setLookedUp] = useState("");
  const [inputError, setInputError] = useState("");
  const [retry, setRetry] = useState(0);
  const zipKey = [...new Set([...zips, ...(lookedUp ? [lookedUp] : [])].filter(zip => /^\d{5}$/.test(zip)))].sort().join(",");
  const [result, setResult] = useState<{ key: string; areas: ZipAreas; missing: string[] } | null>(null);
  const [error, setError] = useState<{ key: string; message: string } | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded, loadError } = useJsApiLoader({ id: "google-map-script", googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", libraries: LIBRARIES });
  const areas = result?.key === zipKey ? result.areas : null;

  useEffect(() => {
    if (!zipKey) return;
    const controller = new AbortController();
    const load = async () => {
      const requested = zipKey.split(",");
      const features: ZipAreas["features"] = [];
      const missing: string[] = [];
      for (let i = 0; i < requested.length; i += 20) {
        const response = await fetch(`/api/zip-areas?zips=${requested.slice(i, i + 20).join(",")}`, { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(25000)]) });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "ZIP area boundaries are unavailable.");
        features.push(...data.features); missing.push(...data.missing);
      }
      if (!controller.signal.aborted) { setError(null); setResult({ key: zipKey, areas: { type: "FeatureCollection", features }, missing }); }
    };
    load().catch(error => { if (!controller.signal.aborted) setError({ key: zipKey, message: error instanceof Error ? error.message : "ZIP area boundaries are unavailable." }); });
    return () => controller.abort();
  }, [zipKey, retry]);

  useEffect(() => {
    if (!map) return;
    const layer = new google.maps.Data({ map });
    layer.setStyle(STYLE);
    if (areas?.features.length) {
      layer.addGeoJson(areas);
      const bounds = zipAreaBounds(areas);
      if (bounds) map.fitBounds(bounds, 30);
    } else { map.setCenter(CENTER); map.setZoom(3); }
    return () => layer.setMap(null);
  }, [map, areas]);

  return (
    <section aria-label={title} className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white">{title}</h3>
        {allowSearch && <div className="flex flex-wrap gap-2">
          <input aria-label="Look up a ZIP code" inputMode="numeric" maxLength={5} placeholder="Enter a 5-digit ZIP" value={search} onChange={event => { setSearch(event.target.value.replace(/\D/g, "")); setInputError(""); }} className="min-w-0 w-40 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 dark:bg-zinc-800 dark:text-white" />
          <button type="button" onClick={() => { if (!/^\d{5}$/.test(search)) { setInputError("Enter a five-digit ZIP code."); return; } setLookedUp(search); }} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white">Highlight ZIP</button>
          {lookedUp && <button type="button" onClick={() => { setLookedUp(""); setSearch(""); }} className="text-xs font-semibold text-slate-500">Clear lookup</button>}
        </div>}
        {inputError && <p role="alert" className="text-xs text-red-600">{inputError}</p>}
        <p aria-live="polite" className="text-xs text-slate-500 dark:text-zinc-400">
          {!zipKey ? "Add a ZIP code to highlight its area." : areas ? `Highlighted ZIP areas: ${areas.features.map(feature => feature.properties.zip).join(", ") || "None"}` : error?.key === zipKey ? error.message : "Loading ZIP areas…"}
        </p>
        {error?.key === zipKey && <button type="button" onClick={() => { setError(null); setResult(null); setRetry(value => value + 1); }} className="text-xs font-bold text-red-600 underline">Retry ZIP map</button>}
        {result?.key === zipKey && result.missing.length > 0 && <p className="text-xs text-slate-500 dark:text-zinc-400">No mapped area available for: {result.missing.join(", ")}. Some ZIP codes do not have a Census area boundary.</p>}
      </div>
      <div className="relative h-[280px] w-full bg-slate-100" role="region" aria-label="Map with soft red ZIP area boundaries">
        {loadError ? <p role="alert" className="p-4 text-sm text-slate-600">The map could not load. Reload to try again.</p> : isLoaded ? <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={CENTER} zoom={3} onLoad={setMap} onUnmount={() => setMap(null)} options={{ disableDefaultUI: true, zoomControl: true, gestureHandling: "cooperative", mapTypeControl: false, clickableIcons: false }} /> : <p className="p-4 text-sm text-slate-600">Loading map…</p>}
      </div>
      <p className="p-3 text-[11px] text-slate-500 dark:text-zinc-400">Soft red shading shows approximate ZIP areas. <a href="https://www.census.gov/programs-surveys/geography/guidance/geo-areas/zctas.html" target="_blank" rel="noopener noreferrer" className="underline">Boundary source: U.S. Census Bureau.</a>{allowSearch && " Shading alone does not confirm delivery availability."}</p>
    </section>
  );
}
