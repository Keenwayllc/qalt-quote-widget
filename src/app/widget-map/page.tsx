import HostedRouteMap from "@/components/widget/HostedRouteMap";
import { MAX_INTERMEDIATE_STOPS } from "@/lib/route-stops";

export const dynamic = "force-dynamic";

export default async function WidgetMapPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const origin = typeof params.origin === "string" ? params.origin : "";
  const destination = typeof params.destination === "string" ? params.destination : "";
  let intermediateStops: Array<{ address: string }> = [];
  if (typeof params.stops === "string") {
    try {
      const parsed = JSON.parse(params.stops);
      if (Array.isArray(parsed)) {
        intermediateStops = parsed.slice(0, MAX_INTERMEDIATE_STOPS).flatMap((address) =>
          typeof address === "string" && address.trim() ? [{ address: address.trim().slice(0, 500) }] : []
        );
      }
    } catch {
      intermediateStops = [];
    }
  }

  if (!origin || !destination) {
    return <div className="h-screen w-screen bg-[#f7f8fa]" />;
  }

  return <HostedRouteMap origin={origin} intermediateStops={intermediateStops} destination={destination} />;
}
