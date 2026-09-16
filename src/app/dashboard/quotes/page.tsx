import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { listOpenAbandonedQuotes } from "@/lib/abandoned-quotes";
import QuotesClient from "./QuotesClient";
import styles from "./quotes-polish.module.css";

export default async function QuotesListPage() {
  const company = await getCurrentCompany();

  const [quotes, abandoned] = await Promise.all([
    prisma.quoteRequest.findMany({
      where: { companyId: company.id, deletedAt: null },
      orderBy: { createdAt: "desc" },
    }),
    listOpenAbandonedQuotes(company.id),
  ]);

  const widget = await prisma.widgetSettings.findFirst({
    where: { companyId: company.id },
    select: { insideDeliveryLabel: true, addon3Label: true },
  });

  return (
    <div className={`${styles.studio} p-4 lg:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-red-600 dark:text-red-400">Sales pipeline</p>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#22252b] dark:text-white tracking-tight">Quotes</h1>
            <p className="mt-1 text-[#646b76] dark:text-zinc-400 font-medium text-sm sm:text-base max-w-2xl">
              Review every delivery request, follow up with customers, and move opportunities through your pipeline.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard/quotes/abandoned" className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-800 transition hover:bg-amber-100 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300">
            <RotateCcw size={14} />
            {abandoned.length} abandoned
          </Link>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e2e4e9] dark:border-white/10 bg-white dark:bg-[#171717] px-3 py-1.5 text-xs font-bold text-[#646b76] dark:text-zinc-300 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {quotes.length} active quote{quotes.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <QuotesClient
        quotes={quotes}
        insideDeliveryLabel={widget?.insideDeliveryLabel ?? "Inside Delivery"}
        addon3Label={widget?.addon3Label ?? ""}
      />
    </div>
  );
}
