export type CustomQuestion = {
  id: string;
  label: string;
  type: "text" | "single" | "multiple";
  required: boolean;
  options: string[];
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
    if (!['text', 'single', 'multiple'].includes(String(raw.type))) return "Choose a valid answer type for every question.";
    if (raw.type === "text") continue;
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

    const type = item.type === "single" || item.type === "multiple" ? item.type : "text";
    const options = Array.isArray(item.options)
      ? [...new Set(item.options.map((option: unknown) => String(option ?? "").trim().slice(0, 80)).filter(Boolean))].slice(0, MAX_QUESTION_OPTIONS)
      : [];
    if (type !== "text" && options.length < 2) continue;
    questions.push({ id, label, type, required: Boolean(item.required), options: type === "text" ? [] : options });
  }

  return questions;
}

export function validateCustomAnswers(
  questions: CustomQuestion[],
  value: unknown
): { answers: CustomAnswer[]; error?: string } {
  const submitted = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const answers: CustomAnswer[] = [];

  for (const question of questions) {
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
    if (answer) answers.push({ id: question.id, label: question.label, answer });
  }

  return { answers };
}
