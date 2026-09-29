"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type SettingsFormOption = {
  id: string;
  name: string;
  formStyle: string;
  showWeight: boolean;
  showAwb: boolean;
  showVehicles: boolean;
  hasVehicleChoices: boolean;
};

function experienceLabel(form: SettingsFormOption) {
  if (form.formStyle === "quick") return "Vehicle Options";
  if (form.formStyle === "extended") return "Extended";
  if (form.showVehicles && form.hasVehicleChoices) return "Standard · Vehicle choices";
  if (form.showWeight || form.showAwb) return "Standard · Extended fields";
  return "Standard Quote";
}

export default function FormSettingsSelector({
  forms,
  selectedFormId,
  page,
}: {
  forms: SettingsFormOption[];
  selectedFormId?: string;
  page: "pricing" | "widget";
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const otherPage = page === "pricing" ? "widget" : "pricing";
  const otherLabel = page === "pricing" ? "Edit appearance" : "Edit pricing";

  return (
    <section className="mx-4 mt-5 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#181818] sm:mx-8 sm:p-5" aria-label="Select form to edit">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <label htmlFor={`${page}-form-selector`} className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Editing form
          </label>
          {forms.length > 0 ? (
            <select
              id={`${page}-form-selector`}
              value={selectedFormId}
              disabled={pending}
              onChange={(event) => {
                const nextId = event.target.value;
                startTransition(() => router.push(`/dashboard/${page}?formId=${encodeURIComponent(nextId)}`));
              }}
              className="w-full max-w-xl rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60 dark:border-white/15 dark:bg-[#222] dark:text-white"
            >
              {forms.map((form) => (
                <option key={form.id} value={form.id}>
                  {form.name} — {experienceLabel(form)}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-300">No forms yet. Create a form in My Forms to configure it.</p>
          )}
          {forms.length > 0 && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Pricing and appearance changes apply to the selected form. Save your edits before switching.</p>}
        </div>
        {selectedFormId ? (
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              href={`/widget/form/${encodeURIComponent(selectedFormId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-500"
            >
              Preview selected form ↗
            </Link>
            <Link
              href={`/dashboard/${otherPage}?formId=${encodeURIComponent(selectedFormId)}`}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-red-500 hover:text-red-600 dark:border-white/15 dark:text-slate-200 dark:hover:text-red-400"
            >
              {otherLabel} →
            </Link>
          </div>
        ) : (
          <Link href="/dashboard/forms" className="text-sm font-bold text-red-600 dark:text-red-400">Go to My Forms →</Link>
        )}
      </div>
    </section>
  );
}
