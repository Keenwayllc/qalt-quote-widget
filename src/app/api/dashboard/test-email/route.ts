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
      html: `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0"><div style="height:4px;background:linear-gradient(90deg,#e9001a 0%,#4f515b 100%)"></div><div style="padding:40px 40px 32px;text-align:center;border-bottom:1px solid #f1f5f9"><img src="https://www.qalt.site/images/qalt-logo-main-2026.png" width="140" style="display:block;margin:0 auto" alt="Qalt"/></div><div style="padding:48px 40px"><div style="text-align:center;margin-bottom:32px"><div style="display:inline-block;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:100px;padding:6px 16px;font-size:13px;color:#16a34a;font-weight:700;letter-spacing:0.02em">✓ Connection Verified</div></div><h1 style="font-size:26px;color:#0f172a;margin:0 0 12px;font-weight:800;letter-spacing:-0.03em;text-align:center">Email Test — Working!</h1><p style="color:#64748b;font-size:16px;line-height:1.7;margin:0;text-align:center">Your Qalt email notifications are configured correctly. Quote requests from your widget will be delivered to this address instantly.</p></div><div style="margin:0 40px 40px;background:#f8fafc;border-radius:12px;padding:20px 24px;border:1px solid #e2e8f0"><p style="margin:0;font-size:13px;color:#64748b;line-height:1.6">💡 <strong style="color:#334155">Tip:</strong> Make sure your widget is embedded on your website so customers can start requesting quotes right away.</p></div><div style="padding:24px 40px;background:#fafafa;border-top:1px solid #f1f5f9;text-align:center"><p style="margin:0;font-size:12px;color:#94a3b8;font-weight:500">Sent via <strong style="color:#64748b">Qalt Dashboard</strong> &nbsp;·&nbsp; <a href="https://qalt.site" style="color:#e9001a;text-decoration:none;font-weight:600">qalt.site</a></p></div></div>`,
    });

    return NextResponse.json({ success: true, result, sentTo: payload.email });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg, raw: String(error) }, { status: 500 });
  }
}
