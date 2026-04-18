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

    const stopNoteIds: string[] = Array.isArray(body.stopNoteIds) ? body.stopNoteIds : [];
    const quoteRequestId: string | null = body.quoteRequestId || null;

    if (quoteRequestId) {
      const quote = await prisma.quoteRequest.findFirst({
        where: { id: quoteRequestId, companyId: company.id },
        select: { id: true },
      });
      if (!quote) {
        return NextResponse.json({ error: "Quote request not found" }, { status: 404 });
      }
    }

    if (stopNoteIds.length > 0) {
      const ownedStops = await prisma.stopNote.findMany({
        where: { id: { in: stopNoteIds }, companyId: company.id },
        select: { id: true },
      });
      if (ownedStops.length !== stopNoteIds.length) {
        return NextResponse.json({ error: "One or more stops not found" }, { status: 404 });
      }
    }

    const job = await prisma.$transaction(async (tx) => {
      const newJob = await tx.job.create({
        data: {
          companyId: company.id,
          quoteRequestId,
          scheduledDate: new Date(body.scheduledDate),
          status: "PENDING",
        },
      });

      if (stopNoteIds.length > 0) {
        await tx.jobStop.createMany({
          data: stopNoteIds.map((stopId, index) => ({
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
