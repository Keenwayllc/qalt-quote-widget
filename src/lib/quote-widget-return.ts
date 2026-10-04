import prisma from "@/lib/prisma";

/** New quotes snapshot their validated form ID in the existing extras JSON. */
export async function quoteWidgetReturnPath(companyId: string, selectedExtras: string | null): Promise<string> {
  try {
    const formId = JSON.parse(selectedExtras || "{}").formId;
    if (typeof formId === "string" && /^[a-zA-Z0-9_-]{1,128}$/.test(formId)) {
      const form = await prisma.widgetSettings.findFirst({ where: { id: formId, companyId }, select: { id: true } });
      if (form) return `/widget/form/${encodeURIComponent(form.id)}`;
    }
  } catch { /* Legacy extras can be absent or malformed. */ }
  return `/widget/${encodeURIComponent(companyId)}`;
}
