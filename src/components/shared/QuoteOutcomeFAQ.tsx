import { QUOTE_OUTCOME_FAQS } from "@/lib/quote-outcomes";

export default function QuoteOutcomeFAQ() {
  return (
    <section aria-labelledby="quote-outcome-heading" className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <h2 id="quote-outcome-heading" className="text-2xl font-black tracking-tight text-slate-950">From quote to request</h2>
      <div className="mt-6 space-y-3">
        {QUOTE_OUTCOME_FAQS.map(({ question, answer }) => (
          <details key={question} className="border border-slate-200 bg-white px-5 py-4">
            <summary className="cursor-pointer font-bold text-slate-800">{question}</summary>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
