import HostedRouteMap from "@/components/widget/HostedRouteMap";

export const dynamic = "force-dynamic";

export default async function WidgetMapPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const origin = typeof params.origin === "string" ? params.origin : "";
  const destination = typeof params.destination === "string" ? params.destination : "";

  if (!origin || !destination) {
    return <div className="h-screen w-screen bg-[#f7f8fa]" />;
  }

  return <HostedRouteMap origin={origin} destination={destination} />;
}
