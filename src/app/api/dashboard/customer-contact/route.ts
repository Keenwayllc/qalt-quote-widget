import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import { getCustomerFacingContact, saveCustomerFacingContact } from "@/lib/customer-contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  try {
    const company = await getCurrentCompany();
    return NextResponse.json(await getCustomerFacingContact(company.id));
  } catch (error: unknown) {
    console.error("Customer contact GET failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Could not load customer contact settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const company = await getCurrentCompany();
    const body = (await request.json()) as Record<string, unknown>;
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (email && (email.length > 320 || !EMAIL_PATTERN.test(email))) {
      return NextResponse.json({ error: "Enter a valid customer-facing email address." }, { status: 400 });
    }

    const contact = await saveCustomerFacingContact(company.id, {
      department: typeof body.department === "string" ? body.department : null,
      email: email || null,
      phone: typeof body.phone === "string" ? body.phone : null,
      hours: typeof body.hours === "string" ? body.hours : null,
    });

    return NextResponse.json({ success: true, contact });
  } catch (error: unknown) {
    console.error("Customer contact PATCH failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Could not save customer contact settings" }, { status: 500 });
  }
}
