import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import StopsClient from "./StopsClient";

export default async function StopsPage() {
  const company = await getCurrentCompany();

  const stops = await prisma.stopNote.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Saved Stop Notes</h1>
          <p className="text-slate-500 dark:text-zinc-400 font-medium text-sm sm:text-base">Manage repeat details, gate codes, and access info for your frequent locations.</p>
        </div>
      </div>
      <StopsClient initialStops={stops} />
    </div>
  );
}
