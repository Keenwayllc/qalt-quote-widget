import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PublicWidgetFormPage({ params }: { params: { formId: string } }) {
  const { formId } = await params;

  const form = await prisma.widgetSettings.findUnique({
    where: { id: formId },
    include: {
      company: {
        include: { pricingProfile: true },
      },
    },
  });

  if (!form) {
    notFound();
  }

  const { company, ...widgetSettings } = form;

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 flex items-center justify-center">
      <QuoteWidgetForm company={{ ...company, widgetSettings } as any} />
    </div>
  );
}
