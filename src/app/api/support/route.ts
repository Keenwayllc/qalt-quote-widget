import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SupportContactEmail } from "@/components/emails/SupportContactEmail";
import * as React from "react";

const MAX_SCREENSHOT_BYTES = 5 * 1024 * 1024;
const SUPPORT_TO = "support@qalt.site";
const DEFAULT_FROM = "Qalt <notifications@qalt.site>";

function valueOf(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function detectScreenshot(bytes: Uint8Array) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    return { mime: "image/png", ext: "png" };
  }
  if (bytes.length >= 12) {
    const riff = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
    const webp = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]);
    if (riff === "RIFF" && webp === "WEBP") return { mime: "image/webp", ext: "webp" };
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    let name = "";
    let email = "";
    let subject = "";
    let message = "";
    let platform = "General Qalt issue";
    let exactError = "";
    let screenshot: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = valueOf(formData.get("name"), 120);
      email = valueOf(formData.get("email"), 254).toLowerCase();
      subject = valueOf(formData.get("subject"), 160);
      message = valueOf(formData.get("message"), 6000);
      platform = valueOf(formData.get("platform"), 80) || platform;
      exactError = valueOf(formData.get("exactError"), 2000);
      const file = formData.get("screenshot");
      if (file && typeof file !== "string" && typeof file.arrayBuffer === "function" && file.size > 0) {
        screenshot = file;
      }
    } else {
      const body = await req.json();
      name = String(body.name ?? "").trim().slice(0, 120);
      email = String(body.email ?? "").trim().toLowerCase().slice(0, 254);
      subject = String(body.subject ?? "").trim().slice(0, 160);
      message = String(body.message ?? "").trim().slice(0, 6000);
      platform = String(body.platform ?? platform).trim().slice(0, 80) || platform;
      exactError = String(body.exactError ?? "").trim().slice(0, 2000);
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Name, email, subject, and issue details are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    let attachment: { filename: string; content: Buffer } | undefined;
    let screenshotName: string | undefined;

    if (screenshot) {
      if (screenshot.size > MAX_SCREENSHOT_BYTES) {
        return NextResponse.json({ error: "Screenshot must be 5 MB or smaller." }, { status: 413 });
      }
      const bytes = new Uint8Array(await screenshot.arrayBuffer());
      const format = detectScreenshot(bytes);
      if (!format) {
        return NextResponse.json({ error: "Screenshot must be a PNG, JPG, or WebP image." }, { status: 400 });
      }
      screenshotName = `qalt-support-screenshot.${format.ext}`;
      attachment = { filename: screenshotName, content: Buffer.from(bytes) };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY env var is not set");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: SUPPORT_TO,
      replyTo: email,
      subject: `[Support][${platform}] ${subject}`,
      react: React.createElement(SupportContactEmail, {
        name,
        email,
        subject,
        message,
        platform,
        exactError,
        screenshotName,
      }),
      ...(attachment ? { attachments: [attachment] } : {}),
    });

    if (error) {
      console.error("Support email error:", error);
      return NextResponse.json({ error: "Failed to send support request. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Support form error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
