"use client";

import { visibleCustomQuestions, type CustomQuestion } from "@/lib/form-questions";

export type AnswerValues = Record<string, string | string[]>;

export default function CustomerCustomQuestions({ questions, answers, onChange }: {
  questions: CustomQuestion[];
  answers: AnswerValues;
  onChange: (answers: AnswerValues) => void;
}) {
  if (questions.length === 0) return null;

  return (
    <fieldset className="space-y-4 border-t border-slate-200 pt-5">
      <legend className="text-sm font-black text-slate-800">Additional details</legend>
      {visibleCustomQuestions(questions, answers).map((question) => {
        const current = answers[question.id];
        const selected = Array.isArray(current) ? current : [];
        const inputId = `custom-question-${question.id}`;
        return (
          <div key={question.id} className="space-y-2">
            <label htmlFor={inputId} className="block text-xs font-bold text-slate-700">
              {question.label}{question.required && <span className="ml-1 text-red-600">*</span>}
            </label>
            {question.type === "text" || question.type === "number" ? (
              <input id={inputId} type={question.type === "number" ? "number" : "text"} min={question.type === "number" ? "0.01" : undefined} step={question.type === "number" ? "any" : undefined} maxLength={500} required={question.required}
                value={typeof current === "string" ? current : ""}
                onChange={(event) => onChange({ ...answers, [question.id]: event.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)]" />
            ) : question.type === "single" ? (
              <select id={inputId} required={question.required} value={typeof current === "string" ? current : ""}
                onChange={(event) => onChange({ ...answers, [question.id]: event.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)]">
                <option value="">Choose an answer</option>
                {question.options.map((option) => <option key={option} value={option}>{option}{(question.optionFees?.[option] ?? 0) > 0 ? ` (+$${question.optionFees![option].toFixed(2)})` : ""}</option>)}
              </select>
            ) : (
              <div id={inputId} className="grid gap-2 sm:grid-cols-2">
                {question.options.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700">
                    <input type="checkbox" checked={selected.includes(option)}
                      onChange={(event) => onChange({ ...answers, [question.id]: event.target.checked
                        ? [...selected, option]
                        : selected.filter((item) => item !== option) })}
                      className="h-4 w-4 accent-red-600" />
                    {option}{(question.optionFees?.[option] ?? 0) > 0 ? ` (+$${question.optionFees![option].toFixed(2)})` : ""}
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </fieldset>
  );
}
