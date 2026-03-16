import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { Resend } from "resend";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "RESEND_API_KEY is not set in environment" }, { status: 500 });
    }

    const resend = new Resend(key);

    const result = await resend.emails.send({
      from: "Qalt <notifications@qalt.site>",
      to: payload.email,
      subject: "Qalt Email Test",
      html: `<p>This is a test email from Qalt. If you received this, email notifications are working correctly.</p><p>Sent at: ${new Date().toISOString()}</p>`,
    });

    return NextResponse.json({ success: true, result, sentTo: payload.email });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg, raw: String(error) }, { status: 500 });
  }
}
