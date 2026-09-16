import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getAdminStorage } from "@/lib/firebase-admin";
import crypto from "crypto";
import sharp from "sharp";

// This endpoint is only for PUBLIC merchant branding assets (logos, widget
// backgrounds). Do not use for private customer documents or PDFs — those need
// a separate secure, access-controlled document design.

const MAX_BYTES = 5 * 1024 * 1024; // 5 MiB

// Raster images are detected by magic bytes. SVG is handled as text and is never
// served back raw: it is rasterized to PNG before storage so embedded script or
// active SVG content cannot execute in a customer's browser.
type ImageFormat = { mime: string; ext: string; isSvg?: boolean };

function looksLikeSvg(bytes: Uint8Array): boolean {
  try {
    const head = new TextDecoder("utf-8", { fatal: false })
      .decode(bytes.slice(0, Math.min(bytes.length, 8192)))
      .replace(/^\uFEFF/, "")
      .trimStart();
    return /^(?:<\?xml[\s\S]*?\?>\s*)?<svg(?:\s|>)/i.test(head);
  } catch {
    return false;
  }
}

function detectImageFormat(bytes: Uint8Array): ImageFormat | null {
  // JPEG: FF D8 FF
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    return { mime: "image/png", ext: "png" };
  }
  // GIF: "GIF87a" or "GIF89a"
  if (bytes.length >= 6) {
    const sig = String.fromCharCode(...bytes.slice(0, 6));
    if (sig === "GIF87a" || sig === "GIF89a") {
      return { mime: "image/gif", ext: "gif" };
    }
  }
  // WebP: bytes 0-3 "RIFF" and bytes 8-11 "WEBP"
  if (bytes.length >= 12) {
    const riff = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
    const webp = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]);
    if (riff === "RIFF" && webp === "WEBP") {
      return { mime: "image/webp", ext: "webp" };
    }
  }
  if (looksLikeSvg(bytes)) {
    return { mime: "image/svg+xml", ext: "svg", isSvg: true };
  }
  return null;
}

function svgFailsSafetyPreflight(bytes: Uint8Array): boolean {
  const svg = new TextDecoder("utf-8", { fatal: false }).decode(bytes);

  // Reject active/embedded content and external resource references before the
  // server rasterizer sees the SVG. Fragment-only hrefs (e.g. #shape) are fine.
  const unsafe = [
    /<!DOCTYPE/i,
    /<!ENTITY/i,
    /<script\b/i,
    /<foreignObject\b/i,
    /<(?:iframe|object|embed|audio|video)\b/i,
    /\son[a-z0-9_-]+\s*=/i,
    /javascript\s*:/i,
    /@import/i,
    /url\s*\(\s*["']?\s*(?:https?:|data:|\/\/)/i,
    /(?:href|xlink:href)\s*=\s*["']\s*(?!#)/i,
  ];

  return unsafe.some((pattern) => pattern.test(svg));
}

export async function POST(req: Request) {
  try {
    // 1. Verify Authentication — companyId comes ONLY from the signed token,
    // never from the browser.
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.companyId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const companyId = payload.companyId;

    // 2. Extract FormData and confirm the entry is really a File.
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string" || typeof (file as File).arrayBuffer !== "function") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const upload = file as File;

    // 3. Size limits — validated BEFORE buffering the file into memory.
    if (upload.size === 0) {
      return NextResponse.json({ error: "Invalid image file" }, { status: 400 });
    }
    if (upload.size > MAX_BYTES) {
      return NextResponse.json({ error: "File must be 5 MB or smaller" }, { status: 413 });
    }

    // 4. Detect the actual image type from file contents (authoritative).
    let bytes = new Uint8Array(await upload.arrayBuffer());
    if (bytes.length > MAX_BYTES) {
      return NextResponse.json({ error: "File must be 5 MB or smaller" }, { status: 413 });
    }

    let format = detectImageFormat(bytes);
    if (!format) {
      return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
    }

    // 5. If the browser declared a MIME, it must agree with the detected type.
    // A missing/blank browser MIME is allowed (detected type is used).
    const browserMime = typeof upload.type === "string" ? upload.type.trim().toLowerCase() : "";
    if (browserMime && browserMime !== format.mime) {
      return NextResponse.json({ error: "Invalid image file" }, { status: 400 });
    }

    // 6. SVGs are accepted as an upload format but never stored or served raw.
    // Preflight them, then rasterize to a transparent PNG using the server-side
    // image pipeline. This preserves transparency and removes active SVG code.
    if (format.isSvg) {
      if (svgFailsSafetyPreflight(bytes)) {
        return NextResponse.json(
          { error: "This SVG contains unsupported active or external content. Use a simple logo SVG." },
          { status: 400 }
        );
      }

      try {
        const png = await sharp(Buffer.from(bytes), { density: 192, limitInputPixels: 25_000_000 })
          .png({ compressionLevel: 9 })
          .toBuffer();
        bytes = new Uint8Array(png);
        format = { mime: "image/png", ext: "png" };
      } catch {
        return NextResponse.json({ error: "Invalid SVG logo" }, { status: 400 });
      }
    }

    // 7. Server-controlled object name. The original filename is never used —
    // the tenant cannot inject a path, "..", extension, or bucket segment.
    const objectName = `uploads/${companyId}/${crypto.randomUUID()}.${format.ext}`;

    const bucket = getAdminStorage().bucket();
    const fileRef = bucket.file(objectName);

    await fileRef.save(Buffer.from(bytes), {
      metadata: {
        contentType: format.mime,
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    // Public read is intentional: these are merchant branding assets embedded in
    // the public widget. See the file-level note — never store private docs here.
    await fileRef.makePublic();

    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${objectName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error: unknown) {
    console.error("Upload error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
