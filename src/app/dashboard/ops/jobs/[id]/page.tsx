import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import JobDetailClient from "./JobDetailClient";
import { notFound } from "next/navigation";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const company = await getCurrentCompany();
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { 
      id,
      companyId: company.id 
    },
    include: {
      stops: {
        include: {
          stopNote: true,
        },
        orderBy: { order: "asc" }
      },
      readinessChecks: {
        orderBy: { createdAt: "desc" },
        take: 5
      },
      exceptionLogs: {
        orderBy: { timestamp: "desc" },
        take: 5
      },
      quoteRequest: true
    }
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="p-4 lg:p-10 max-w-5xl mx-auto">
      <JobDetailClient job={job} />
    </div>
  );
}
