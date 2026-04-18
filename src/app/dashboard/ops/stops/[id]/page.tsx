import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import StopDetailClient from "./StopDetailClient";
import { notFound } from "next/navigation";

export default async function StopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const company = await getCurrentCompany();
  const { id } = await params;

  const stop = await prisma.stopNote.findFirst({
    where: {
      id,
      companyId: company.id,
    },
    include: {
      readinessChecks: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      exceptionLogs: {
        orderBy: { timestamp: "desc" },
        take: 10,
      },
    },
  });

  if (!stop) {
    notFound();
  }

  return (
    <div className="p-4 lg:p-10 max-w-5xl mx-auto">
      <StopDetailClient stop={stop} />
    </div>
  );
}
