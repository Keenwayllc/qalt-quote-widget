import { cache } from "react";
import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export const getCurrentCompany = cache(async function getCurrentCompany() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.companyId) {
    redirect("/login");
  }

  const company = await prisma.company.findUnique({
    where: { id: payload.companyId },
    include: {
      pricingProfile: true,
      widgetSettings: true,
    }
  });

  if (!company) {
    redirect("/login");
  }

  return company;
});
