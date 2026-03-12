import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { adminStorage } from "@/lib/firebase-admin";
import path from "path";

export async function POST(req: Request) {
  try {
    // 1. Verify Authentication
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

    // 2. Extract FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 3. Validate File Type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, WEBP, GIF, and SVG are allowed." },
        { status: 400 }
      );
    }

    // 4. Upload via Admin SDK (bypasses Firebase Storage security rules)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = path.extname(file.name) || ".png";
    const uniqueFilename = `uploads/${companyId}-${Date.now()}${extension}`;

    const bucket = adminStorage.bucket();
    const fileRef = bucket.file(uniqueFilename);

    await fileRef.save(buffer, {
      metadata: { contentType: file.type },
    });

    // Make publicly readable so the widget can display it
    await fileRef.makePublic();

    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFilename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error: unknown) {
    console.error("Upload error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
