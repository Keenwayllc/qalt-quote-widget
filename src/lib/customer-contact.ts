import prisma from "@/lib/prisma";

export type CustomerFacingContact = {
  department: string | null;
  email: string | null;
  phone: string | null;
  hours: string | null;
  website: string | null;
};

type ContactRow = {
  customerContactDepartment: string | null;
  customerContactEmail: string | null;
  customerContactPhone: string | null;
  customerContactHours: string | null;
  website: string | null;
};

const clean = (value: unknown, max = 320): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
};

export async function getCustomerFacingContact(companyId: string): Promise<CustomerFacingContact> {
  const rows = await prisma.$queryRaw<ContactRow[]>`
    SELECT
      "customerContactDepartment",
      "customerContactEmail",
      "customerContactPhone",
      "customerContactHours",
      "website"
    FROM "Company"
    WHERE "id" = ${companyId}
    LIMIT 1
  `;
  const row = rows[0];
  return {
    department: clean(row?.customerContactDepartment, 120),
    email: clean(row?.customerContactEmail, 320),
    phone: clean(row?.customerContactPhone, 80),
    hours: clean(row?.customerContactHours, 160),
    website: clean(row?.website, 500),
  };
}

export async function saveCustomerFacingContact(
  companyId: string,
  input: Omit<CustomerFacingContact, "website">
): Promise<CustomerFacingContact> {
  const department = clean(input.department, 120);
  const email = clean(input.email, 320);
  const phone = clean(input.phone, 80);
  const hours = clean(input.hours, 160);

  await prisma.$executeRaw`
    UPDATE "Company"
    SET
      "customerContactDepartment" = ${department},
      "customerContactEmail" = ${email},
      "customerContactPhone" = ${phone},
      "customerContactHours" = ${hours}
    WHERE "id" = ${companyId}
  `;

  return getCustomerFacingContact(companyId);
}
