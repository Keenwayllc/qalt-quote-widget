import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import StopsClient from "./StopsClient";
import { CircleCheck, MapPinned, Repeat2 } from "lucide-react";

export default async function StopsPage() {
  const company = await getCurrentCompany();

  const stops = await prisma.stopNote.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Saved Locations</h1>
        <p className="text-slate-500 dark:text-zinc-400 font-medium text-sm sm:text-base max-w-3xl">
          Save instructions for places you pick up from or deliver to often. Qalt keeps the important details here so you and your team do not have to look them up again on the next job.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200/70 dark:border-white/6 bg-white dark:bg-[#141414] p-4 flex gap-3">
          <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0"><MapPinned size={18} /></div>
          <div>
            <p className="font-black text-slate-900 dark:text-white text-sm">1. Save a place</p>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400 mt-1">Add a warehouse, hospital, apartment, customer, dock, or other location you visit regularly.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/70 dark:border-white/6 bg-white dark:bg-[#141414] p-4 flex gap-3">
          <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0"><CircleCheck size={18} /></div>
          <div>
            <p className="font-black text-slate-900 dark:text-white text-sm">2. Add useful instructions</p>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400 mt-1">Store delivery hours, gate codes, loading docks, parking notes, contact names, and access instructions.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/70 dark:border-white/6 bg-white dark:bg-[#141414] p-4 flex gap-3">
          <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0"><Repeat2 size={18} /></div>
          <div>
            <p className="font-black text-slate-900 dark:text-white text-sm">3. Reuse it next time</p>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400 mt-1">When you return to that location, your team already knows where to go, who to contact, and what to expect.</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-red-100 dark:border-red-500/15 bg-red-50/60 dark:bg-red-500/5 px-4 py-3">
        <p className="text-sm font-bold text-slate-800 dark:text-zinc-200">
          Example: Save a warehouse once with “Mon-Fri 7 AM-3 PM, use Dock B, gate code 1234#.” The next driver can see those instructions before arriving.
        </p>
      </div>

      <StopsClient initialStops={stops} />
    </div>
  );
}
