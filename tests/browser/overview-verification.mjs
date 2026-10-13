import { chromium } from "playwright";
import assert from "node:assert/strict";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  reducedMotion: "reduce",
  viewport: { width: 1440, height: 1080 },
});
await page.addInitScript(() =>
  localStorage.setItem(
    "cookieConsent",
    JSON.stringify({ necessary: true, analytics: false, marketing: false }),
  ),
);
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
async function load(query = "") {
  await page.goto(`http://localhost:3107/overview-verification${query}`);
  await page.getByRole("heading", { name: "Business, in view." }).waitFor();
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await page.evaluate(
    () => (document.documentElement.dataset.qaltDashboardRoute = "overview"),
  );
}
await load();
for (const name of [
  "Quote momentum",
  "Quote inbox",
  "Dispatch workspace",
  "Customer experience",
  "Workspace setup",
  "Monthly capacity",
])
  assert.equal(
    await page.getByRole("heading", { name, exact: true }).count(),
    1,
  );
await page
  .getByRole("button", { name: "View daily data", exact: true })
  .click();
assert.equal(await page.locator("#overview-daily-table tbody tr").count(), 7);
await page
  .getByRole("button", { name: "Hide daily data", exact: true })
  .click();
const setup = page.getByRole("button", { name: /Workspace setup/ });
assert.equal(await setup.getAttribute("aria-expanded"), "true");
await setup.click();
assert.equal(await setup.getAttribute("aria-expanded"), "false");
await setup.click();
await setup.focus();
assert(await setup.evaluate((el) => el === document.activeElement));
assert.equal(
  await page
    .getByRole("progressbar", { name: "Workspace setup readiness" })
    .getAttribute("aria-valuenow"),
  "3",
);
assert.equal(
  await page
    .locator('a[href="/dashboard/quotes?quoteId=example-quote-0"]')
    .count(),
  1,
);
assert.equal(
  await page.locator('a[href="/dashboard/ops/jobs/example-job-1"]').count(),
  1,
);
await page.getByRole("button", { name: "Refresh overview" }).click();
await page.getByRole("button", { name: "Refresh overview" }).waitFor();
await page.waitForFunction(
  () => !document.querySelector("main button[disabled]"),
);
for (const width of [375, 768, 1080, 1440, 2560]) {
  await page.setViewportSize({ width, height: 1080 });
  await page
    .locator(".recharts-bar-rectangle")
    .first()
    .waitFor({ state: "visible" });
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    `document overflow at ${width}`,
  );
  assert(
    await page
      .locator("#qalt-dashboard-scroll-container")
      .evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    `main overflow at ${width}`,
  );
  await page.screenshot({ path: `../overview-${width}.png`, fullPage: true });
}
await page.setViewportSize({ width: 1440, height: 1080 });
await page.evaluate(() => document.documentElement.classList.add("dark"));
await page.screenshot({ path: "../overview-dark.png", fullPage: true });
await page.evaluate(() => document.documentElement.classList.remove("dark"));
for (const plan of ["STARTER", "PRO", "ENTERPRISE"]) {
  await load(`?plan=${plan}&quota=1`);
  assert.equal(
    await page.getByRole("heading", { name: "Quote momentum" }).count(),
    1,
  );
  const text = await page.locator("main").innerText();
  assert(!text.includes("Online"));
  assert.equal(text.includes("Monthly limit reached"), plan === "STARTER");
}
await load("?empty=1");
assert.equal(await page.locator('a[href*="quoteId="]').count(), 0);
assert((await page.locator("main").innerText()).includes("Not detected"));
await page.screenshot({ path: "../overview-empty.png", fullPage: true });
await load("?partial=1");
assert(
  (await page.locator("main").innerText()).includes("Detection unavailable"),
);
assert.equal(
  await page
    .getByRole("progressbar", { name: "Monthly quote allowance used" })
    .count(),
  0,
);
await page.screenshot({ path: "../overview-partial.png", fullPage: true });
assert.deepEqual(errors, []);
console.log(
  "PASS: shell, responsive 375/768/1080/1440/2560, dark mode, keyboard focus, daily table, setup accordion, quote/job links, refresh, all plans, quota limits, empty and partial failures, no browser errors",
);
await browser.close();
