import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import JobsClient from "./JobsClient";

export default async function JobsPage() {
  const company = await getCurrentCompany();

  const [jobs, stops, quotes] = await Promise.all([
    prisma.job.findMany({
      where: { companyId: company.id },
      include: {
        stops: {
          include: {
            stopNote: true,
          },
          orderBy: { order: "asc" }
        },
        readinessChecks: {
          orderBy: { createdAt: "desc" },
          take: 1 },
      },
      orderBy: { scheduledDate: "desc" },
    }),
    prisma.stopNote.findMany({
      where: { companyId: company.id },
      orderBy: { companyName: "asc" },
    }),
    prisma.quoteRequest.findMany({
      where: { companyId: company.id, status: { in: ["CONFIRMED", "WON"] }, deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 20
    })
  ]);

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Jobs Dashboard</h1>
        <p className="text-slate-500 dark:text-zinc-400 font-medium text-sm sm:text-base">Track and execute delivery workflows. Connect verified stops to your dispatch cycle.</p>
      </div>
      <JobsClient initialJobs={jobs} stops={stops} quotes={quotes} />
    </div>
  );
}
