import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const company = await getCurrentCompany();
    const jobs = await prisma.job.findMany({
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
        exceptionLogs: {
          orderBy: { timestamp: "desc" },
          take: 1 },
      },
      orderBy: { scheduledDate: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("GET Jobs Error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const company = await getCurrentCompany();
    const body = await req.json();

    const job = await prisma.$transaction(async (tx) => {
      // 1. Create the Job
      const newJob = await tx.job.create({
        data: {
          companyId: company.id,
          quoteRequestId: body.quoteRequestId || null,
          scheduledDate: new Date(body.scheduledDate),
          status: "PENDING",
        },
      });

      // 2. Link the Stops
      if (body.stopNoteIds && Array.isArray(body.stopNoteIds)) {
        await tx.jobStop.createMany({
          data: body.stopNoteIds.map((stopId: string, index: number) => ({
            jobId: newJob.id,
            stopNoteId: stopId,
            order: index,
          })),
        });
      }

      return newJob;
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("POST Job Error:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
