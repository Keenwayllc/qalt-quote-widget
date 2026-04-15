import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentCompany } from "@/lib/session";

// POST /api/shopify/connect — links a Shopify install to the logged-in Qalt company
// and injects the widget script tag into the Shopify store
export async function POST(req: Request) {
  try {
    const company = await getCurrentCompany();
    const { shop } = await req.json();

    if (!shop) {
      return NextResponse.json({ error: "Missing shop" }, { status: 400 });
    }

    const install = await prisma.shopifyInstall.findUnique({ where: { shop } });
    if (!install) {
      return NextResponse.json({ error: "Shop not installed" }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    const scriptSrc = `${appUrl}/shopify-widget.js?companyId=${company.id}`;

    // Remove old script tag if exists
    if (install.scriptTagId) {
      await fetch(
        `https://${shop}/admin/api/2024-04/script_tags/${install.scriptTagId}.json`,
        {
          method: "DELETE",
          headers: { "X-Shopify-Access-Token": install.accessToken },
        }
      ).catch(() => {});
    }

    // Create new script tag
    const scriptRes = await fetch(
      `https://${shop}/admin/api/2024-04/script_tags.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": install.accessToken,
        },
        body: JSON.stringify({
          script_tag: {
            event: "onload",
            src: scriptSrc,
          },
        }),
      }
    );

    const scriptData = await scriptRes.json();
    const scriptTagId = String(scriptData.script_tag?.id ?? "");

    // Link company to install
    await prisma.shopifyInstall.update({
      where: { shop },
      data: { companyId: company.id, scriptTagId },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[shopify/connect]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/shopify/connect — unlinks and removes script tag
export async function DELETE(req: Request) {
  try {
    const company = await getCurrentCompany();
    const { shop } = await req.json();

    const install = await prisma.shopifyInstall.findUnique({ where: { shop } });
    if (!install || install.companyId !== company.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (install.scriptTagId) {
      await fetch(
        `https://${shop}/admin/api/2024-04/script_tags/${install.scriptTagId}.json`,
        {
          method: "DELETE",
          headers: { "X-Shopify-Access-Token": install.accessToken },
        }
      ).catch(() => {});
    }

    await prisma.shopifyInstall.update({
      where: { shop },
      data: { companyId: null, scriptTagId: null },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[shopify/connect DELETE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
