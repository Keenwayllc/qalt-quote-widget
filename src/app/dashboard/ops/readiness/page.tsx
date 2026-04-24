import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import ReadinessClient from "./ReadinessClient";

export default async function ReadinessPage() {
  const company = await getCurrentCompany();

  // For this starter build, we pull all saved stops to allow checking readiness for any of them.
  const stops = await prisma.stopNote.findMany({
    where: { companyId: company.id },
    orderBy: { companyName: "asc" },
  });

  return (
    <div className="p-4 lg:p-10 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Delivery Readiness</h1>
        <p className="text-slate-500 dark:text-zinc-400 font-medium text-sm sm:text-base">Confirm stops are prepared before dispatching. Verified deliveries have higher success rates.</p>
      </div>
      <ReadinessClient stops={stops} />
    </div>
  );
}
