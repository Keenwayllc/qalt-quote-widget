import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PublicWidgetPage({ params }: { params: { companyId: string } }) {
  const { companyId } = await params;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      pricingProfile: true,
      widgetSettings: true,
    }
  });

  if (!company) {
    notFound();
  }

  // Pure widget page, no layout from dashboard
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 flex items-center justify-center">
      <QuoteWidgetForm company={company as any} />
    </div>
  );
}
