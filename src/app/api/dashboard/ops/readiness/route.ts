import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const company = await getCurrentCompany();
    const body = await req.json();

    const check = await prisma.$transaction(async (tx) => {
      const newCheck = await tx.readinessCheck.create({
        data: {
          stopNoteId: body.stopNoteId,
          jobId: body.jobId || null,
          scheduledDate: new Date(body.scheduledDate),
          contactConfirmed: body.contactConfirmed,
          addressConfirmed: body.addressConfirmed,
          accessConfirmed: body.accessConfirmed,
          siteReady: body.siteReady,
          notes: body.notes,
          status: body.status,
        },
      });

      // Simple Auto-Update Rule: If everything is ready and linked to a job, mark the job as READY.
      if (body.jobId && body.status === "READY") {
        await tx.job.update({
          where: { id: body.jobId },
          data: { status: "READY" }
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
