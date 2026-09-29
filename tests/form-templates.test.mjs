import assert from "node:assert/strict";
import test from "node:test";
import { normalizeCustomQuestions, validateCustomQuestionDefinitions, validateCustomAnswers } from "../src/lib/form-questions.ts";
import { normalizeVehicles, validateVehicleDefinitions } from "../src/lib/form-vehicles.ts";

const questions = [
  { id: "dock", label: "Loading dock?", type: "single", required: true, options: ["Yes", "No"] },
  { id: "instructions", label: "Special instructions", type: "text", required: false, options: [] },
  { id: "equipment", label: "Equipment", type: "multiple", required: false, options: ["Liftgate", "Pallet jack"] },
];

test("extended form questions and answer choices are retained", () => {
  assert.equal(validateCustomQuestionDefinitions(questions), null);
  const saved = normalizeCustomQuestions(questions);
  assert.deepEqual(saved, questions);
  assert.deepEqual(validateCustomAnswers(saved, {
    dock: "Yes", instructions: "Call ahead", equipment: ["Liftgate"],
  }).answers, [
    { id: "dock", label: "Loading dock?", answer: "Yes" },
    { id: "instructions", label: "Special instructions", answer: "Call ahead" },
    { id: "equipment", label: "Equipment", answer: ["Liftgate"] },
  ]);
});

test("required answers and choice membership are enforced", () => {
  assert.match(validateCustomAnswers(questions, {}).error, /Loading dock/);
  assert.match(validateCustomAnswers(questions, { dock: "Maybe" }).error, /Invalid answer/);
  assert.match(validateCustomAnswers(questions, { dock: "Yes", equipment: ["Crane"] }).error, /Invalid answer/);
});

test("invalid question definitions are rejected before saving", () => {
  assert.ok(validateCustomQuestionDefinitions(null));
  assert.ok(validateCustomQuestionDefinitions([{ ...questions[0], options: ["Yes", "yes"] }]));
  assert.ok(validateCustomQuestionDefinitions([{ ...questions[0], id: "", label: "" }]));
  assert.ok(validateCustomQuestionDefinitions(Array.from({ length: 11 }, (_, i) => ({ ...questions[0], id: `q${i}` }))));
});

test("vehicle choices preserve charges and reject duplicates or invalid fees", () => {
  const vehicles = [{ name: "Sedan", fee: 0 }, { name: "Cargo Van", fee: 35 }];
  assert.equal(validateVehicleDefinitions(vehicles), null);
  assert.deepEqual(normalizeVehicles(vehicles), vehicles);
  assert.ok(validateVehicleDefinitions([{ name: "Sedan", fee: 0 }, { name: "sedan", fee: 10 }]));
  assert.ok(validateVehicleDefinitions([{ name: "Sedan", fee: -1 }]));
  assert.ok(validateVehicleDefinitions([]));
});
