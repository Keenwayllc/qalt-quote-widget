export type CustomQuestion = {
  id: string;
  label: string;
  type: "text" | "number" | "single" | "multiple";
  required: boolean;
  options: string[];
  showWhen?: { questionId: string; answer: string };
  optionFees?: Record<string, number>;
};

export type CustomAnswer = {
  id: string;
  label: string;
  answer: string | string[];
};

export const MAX_CUSTOM_QUESTIONS = 10;
export const MAX_QUESTION_OPTIONS = 12;

export function validateCustomQuestionDefinitions(value: unknown): string | null {
  if (!Array.isArray(value) || value.length > MAX_CUSTOM_QUESTIONS) {
    return `Add no more than ${MAX_CUSTOM_QUESTIONS} custom questions.`;
  }
  const normalized = normalizeCustomQuestions(value);
  if (normalized.length !== value.length) return "Every question needs a unique title and valid choices.";
  for (let index = 0; index < value.length; index++) {
    const raw = value[index] as Record<string, unknown>;
    if (!['text', 'number', 'single', 'multiple'].includes(String(raw.type))) return "Choose a valid answer type for every question.";
    if (raw.showWhen !== undefined) {
      const condition = raw.showWhen as CustomQuestion["showWhen"];
      const parent = normalized.slice(0, index).find((question) => question.id === condition?.questionId);
      if (!parent || !parent.options.includes(condition?.answer ?? "")) return "Conditional questions must use an answer from an earlier choice question.";
    }
    if (raw.optionFees !== undefined) {
      if (!raw.optionFees || typeof raw.optionFees !== "object" || Array.isArray(raw.optionFees) ||
        Object.entries(raw.optionFees).some(([choice, fee]) => !normalized[index].options.includes(choice) || typeof fee !== "number" || !Number.isFinite(fee) || fee < 0 || fee > 100000)) {
        return "Answer fees must match a choice and be between $0 and $100,000.";
      }
    }
    if (raw.type === "text" || raw.type === "number") continue;
    if (!Array.isArray(raw.options) || raw.options.length > MAX_QUESTION_OPTIONS ||
      raw.options.length !== normalized[index].options.length) {
      return "Choice questions need two to twelve unique, named answers.";
    }
    const choices = normalized[index].options.map((option) => option.toLocaleLowerCase());
    if (new Set(choices).size !== choices.length) return "Answer choices must be unique within each question.";
  }
  return null;
}

export function normalizeCustomQuestions(value: unknown): CustomQuestion[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const questions: CustomQuestion[] = [];

  for (const raw of value.slice(0, MAX_CUSTOM_QUESTIONS)) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;
    const label = String(item.label ?? "").trim().slice(0, 120);
    if (!label) continue;
    const rawId = String(item.id ?? "").trim().slice(0, 80);
    const id = /^[a-zA-Z0-9_-]+$/.test(rawId) ? rawId : `question-${questions.length + 1}`;
    if (seen.has(id)) continue;
    seen.add(id);

    const type = item.type === "single" || item.type === "multiple" || item.type === "number" ? item.type : "text";
    const options = Array.isArray(item.options)
      ? [...new Set(item.options.map((option: unknown) => String(option ?? "").trim().slice(0, 80)).filter(Boolean))].slice(0, MAX_QUESTION_OPTIONS)
      : [];
    const isChoice = type === "single" || type === "multiple";
    if (isChoice && options.length < 2) continue;
    const question: CustomQuestion = { id, label, type, required: Boolean(item.required), options: isChoice ? options : [] };
    if (item.showWhen && typeof item.showWhen === "object") {
      const condition = item.showWhen as Record<string, unknown>;
      // Earlier parents only: no cycles, dangling dependencies, or hidden-parent answers.
      const parent = questions.find((entry) => entry.id === condition.questionId);
      if (parent?.options.includes(String(condition.answer))) question.showWhen = { questionId: parent.id, answer: String(condition.answer) };
      else continue;
    }
    if (isChoice && item.optionFees && typeof item.optionFees === "object") {
      question.optionFees = Object.fromEntries(Object.entries(item.optionFees).filter(([choice, fee]) => options.includes(choice) && typeof fee === "number" && Number.isFinite(fee) && fee >= 0 && fee <= 100000));
    }
    questions.push(question);
  }

  return questions;
}

export function visibleCustomQuestions(questions: CustomQuestion[], value: unknown): CustomQuestion[] {
  const answers = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const visible = new Set<string>();
  return questions.filter((question) => {
    const condition = question.showWhen;
    const answer = condition ? answers[condition.questionId] : undefined;
    const show = !condition || (visible.has(condition.questionId) &&
      (Array.isArray(answer) ? answer.includes(condition.answer) : answer === condition.answer));
    if (show) visible.add(question.id);
    return show;
  });
}

export function customAnswerCharges(questions: CustomQuestion[], answers: CustomAnswer[]) {
  return answers.flatMap((answer) => {
    const question = questions.find((entry) => entry.id === answer.id);
    return (Array.isArray(answer.answer) ? answer.answer : [answer.answer]).flatMap((choice) => {
      const amount = question?.optionFees?.[choice] ?? 0;
      return amount > 0 ? [{ key: `question:${answer.id}:${choice}`, label: `${answer.label}: ${choice}`, amount, detail: "Shipment handling charge" }] : [];
    });
  });
}

export function shipmentQuestionPreset(prefix: string): CustomQuestion[] {
  const id = `${prefix}-shipment`;
  const conditional = (suffix: string, label: string, type: CustomQuestion["type"], answer: string): CustomQuestion => ({
    id: `${prefix}-${suffix}`, label, type, required: true, options: type === "single" ? ["Yes", "No"] : [], showWhen: { questionId: id, answer },
  });
  return [
    { id, label: "What are you shipping?", type: "single", required: true, options: ["Documents / parcels", "Furniture", "Pallets"] },
    conditional("stairs", "Are there stairs at pickup or delivery?", "single", "Furniture"),
    conditional("elevator", "Is an elevator available?", "single", "Furniture"),
    conditional("team", "Do you need two-person handling?", "single", "Furniture"),
    conditional("furniture-size", "Furniture dimensions (L × W × H, inches)", "text", "Furniture"),
    conditional("weight", "Total pallet weight (lb)", "number", "Pallets"),
    conditional("dimensions", "Pallet dimensions (L × W × H, inches)", "text", "Pallets"),
    conditional("dock", "Is a loading dock available?", "single", "Pallets"),
  ];
}

export function validateCustomAnswers(
  questions: CustomQuestion[],
  value: unknown
): { answers: CustomAnswer[]; error?: string } {
  const submitted = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const answers: CustomAnswer[] = [];

  for (const question of visibleCustomQuestions(questions, submitted)) {
    const raw = submitted[question.id];
    if (question.type === "multiple") {
      const selected = Array.isArray(raw)
        ? [...new Set(raw.filter((item): item is string => typeof item === "string"))]
        : [];
      if (selected.some((item) => !question.options.includes(item))) {
        return { answers: [], error: `Invalid answer for ${question.label}.` };
      }
      if (question.required && selected.length === 0) {
        return { answers: [], error: `Please answer ${question.label}.` };
      }
      if (selected.length > 0) answers.push({ id: question.id, label: question.label, answer: selected });
      continue;
    }

    const answer = typeof raw === "string" ? raw.trim().slice(0, 500) : "";
    if (question.type === "single" && answer && !question.options.includes(answer)) {
      return { answers: [], error: `Invalid answer for ${question.label}.` };
    }
    if (question.required && !answer) {
      return { answers: [], error: `Please answer ${question.label}.` };
    }
    if (question.type === "number" && answer && (!Number.isFinite(Number(answer)) || Number(answer) <= 0 || Number(answer) > 1000000)) {
      return { answers: [], error: `Enter a number greater than zero for ${question.label}.` };
    }
    if (answer) answers.push({ id: question.id, label: question.label, answer });
  }

  return { answers };
}
