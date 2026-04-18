import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const company = await getCurrentCompany();
    const body = await req.json();

    const stopNoteId: string | null = body.stopNoteId || null;
    const jobId: string | null = body.jobId || null;

    if (!stopNoteId && !jobId) {
      return NextResponse.json({ error: "stopNoteId or jobId is required" }, { status: 400 });
    }

    if (stopNoteId) {
      const stop = await prisma.stopNote.findFirst({
        where: { id: stopNoteId, companyId: company.id },
        select: { id: true },
      });
      if (!stop) {
        return NextResponse.json({ error: "Stop not found" }, { status: 404 });
      }
    }

    if (jobId) {
      const job = await prisma.job.findFirst({
        where: { id: jobId, companyId: company.id },
        select: { id: true },
      });
      if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }
    }

    const log = await prisma.$transaction(async (tx) => {
      const newLog = await tx.exceptionLog.create({
        data: {
          stopNoteId,
          jobId,
          type: body.type,
          notes: body.notes,
        },
      });

      if (jobId) {
        await tx.job.update({
          where: { id: jobId },
          data: { status: "ISSUE" },
        });
      }

      return newLog;
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("POST Exception Error:", error);
    return NextResponse.json({ error: "Failed to log exception" }, { status: 500 });
  }
}
