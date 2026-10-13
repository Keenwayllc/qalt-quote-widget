import { loadOverview } from "@/lib/overview-data";
import OverviewWorkspace from "./OverviewWorkspace";
export default async function DashboardOverview() {
  return <OverviewWorkspace data={await loadOverview()} />;
}
