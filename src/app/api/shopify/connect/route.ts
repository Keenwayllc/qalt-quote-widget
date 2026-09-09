import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { isValidShopDomain } from "@/lib/shopify";

// POST /api/shopify/connect — links a Shopify install to the logged-in Qalt company
// and injects the widget script tag into the Shopify store
async function getCompanyFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const company = await getCompanyFromCookie();
    if (!company) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { shop } = await req.json();

    // Validate the shop hostname before it is used in any Shopify Admin API URL.
    if (!isValidShopDomain(shop)) {
      return NextResponse.json({ error: "Invalid shop" }, { status: 400 });
    }

    const install = await prisma.shopifyInstall.findUnique({ where: { shop } });
    if (!install) {
      return NextResponse.json({ error: "Shop not installed" }, { status: 404 });
    }

    // Atomic tenant claim — performed BEFORE any Shopify Admin API mutation. A
    // single conditional UPDATE transitions the install from unlinked
    // (companyId null) to this company, OR confirms it is already ours. If a
    // different tenant already owns it — or wins a concurrent first-time claim —
    // this matches zero rows and we stop before touching Shopify. This closes
    // the read-check-then-write race where two tenants could both observe
    // companyId === null and both proceed. Security-first: if a later Shopify
    // call fails, the claim stays with this (legitimate) tenant and can be
    // retried; ownership is never reassigned by a race.
    const claim = await prisma.shopifyInstall.updateMany({
      where: {
        shop,
        OR: [{ companyId: null }, { companyId: company.companyId }],
      },
      data: { companyId: company.companyId },
    });
    if (claim.count === 0) {
      return NextResponse.json({ error: "Shop is already connected." }, { status: 409 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    const scriptSrc = `${appUrl}/api/shopify/widget-js?companyId=${company.companyId}`;

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

    // Ownership was already claimed atomically above; only persist the new
    // script tag id here.
    await prisma.shopifyInstall.update({
      where: { shop },
      data: { scriptTagId },
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
    const company = await getCompanyFromCookie();
    if (!company) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { shop } = await req.json();

    if (!isValidShopDomain(shop)) {
      return NextResponse.json({ error: "Invalid shop" }, { status: 400 });
    }

    const install = await prisma.shopifyInstall.findUnique({ where: { shop } });
    // Ownership check preserved: only the linked tenant may unlink/remove the
    // script tag. Foreign or unlinked installs are not found.
    if (!install || install.companyId !== company.companyId) {
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
