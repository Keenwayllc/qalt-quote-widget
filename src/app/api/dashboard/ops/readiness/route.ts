import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const company = await getCurrentCompany();
    const body = await req.json();

    const stopNoteId: string | undefined = body.stopNoteId;
    const jobId: string | null = body.jobId || null;

    if (!stopNoteId) {
      return NextResponse.json({ error: "stopNoteId is required" }, { status: 400 });
    }

    const stop = await prisma.stopNote.findFirst({
      where: { id: stopNoteId, companyId: company.id },
      select: { id: true },
    });
    if (!stop) {
      return NextResponse.json({ error: "Stop not found" }, { status: 404 });
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

    const check = await prisma.$transaction(async (tx) => {
      const newCheck = await tx.readinessCheck.create({
        data: {
          stopNoteId,
          jobId,
          scheduledDate: new Date(body.scheduledDate),
          contactConfirmed: body.contactConfirmed,
          addressConfirmed: body.addressConfirmed,
          accessConfirmed: body.accessConfirmed,
          siteReady: body.siteReady,
          notes: body.notes,
          status: body.status,
        },
      });

      if (jobId && body.status === "READY") {
        await tx.job.update({
          where: { id: jobId },
          data: { status: "READY" },
        });
      }

      return newCheck;
    });

    return NextResponse.json(check);
  } catch (error) {
    console.error("POST Readiness Error:", error);
    return NextResponse.json({ error: "Failed to create readiness check" }, { status: 500 });
  }
}
