import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const company = await getCurrentCompany();
    const body = await req.json();

    const log = await prisma.$transaction(async (tx) => {
      const newLog = await tx.exceptionLog.create({
        data: {
          stopNoteId: body.stopNoteId || null,
          jobId: body.jobId || null,
          type: body.type,
          notes: body.notes,
        },
      });

      // Simple Auto-Update Rule: If an issue is logged on a job, change status to ISSUE
      if (body.jobId) {
        await tx.job.update({
          where: { id: body.jobId },
          data: { status: "ISSUE" }
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
