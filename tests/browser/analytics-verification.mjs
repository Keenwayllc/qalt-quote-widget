import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ reducedMotion: "reduce" });
await page.addInitScript(() =>
  localStorage.setItem(
    "cookieConsent",
    JSON.stringify({ necessary: true, analytics: false, marketing: false }),
  ),
);
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:3107/analytics-verification");
await page.getByRole("heading", { name: "Analytics", exact: true }).waitFor();
await page.evaluate(() => {
  localStorage.setItem(
    "qalt-cookie-consent",
    JSON.stringify({ analytics: false, marketing: false }),
  );
});
const reject = page.getByRole("button", { name: "Reject all" });
if (await reject.isVisible()) await reject.click();
const accept = page.getByRole("button", { name: "Accept all" });
if (await accept.isVisible()) await accept.click();
for (const heading of [
  "Quote activity",
  "Quote outcomes",
  "Service demand",
  "Pickup areas",
  "Operational snapshot",
  "Recent quote activity",
])
  assert(
    await page.getByRole("heading", { name: heading, exact: true }).isVisible(),
  );
assert.equal(
  await page
    .getByRole("link", { name: "7 days", exact: true })
    .getAttribute("href"),
  "/dashboard/analytics?days=7",
);
await page.getByRole("button", { name: "View daily data table" }).click();
assert.equal(await page.locator("#analytics-daily-table tbody tr").count(), 30);
await page.getByLabel("Compare previous period").uncheck();
assert.equal(await page.locator("#analytics-daily-table thead th").count(), 2);
await page.getByLabel("Compare previous period").check();
await page.getByRole("button", { name: "Hide daily data table" }).click();
await page.getByLabel("Sort by").selectOption("value");
// Four-column cells follow the row-header; estimate is third td.
const estimates = await page
  .locator("table tbody tr td:nth-child(4)")
  .allTextContents();
assert(estimates.length === 6);
const numeric = estimates.map((v) => Number(v.replace(/[^0-9.]/g, "")));
assert(
  numeric.every((v, i) => i === 0 || numeric[i - 1] >= v),
  "recent estimates must sort descending",
);
const quoteLinks = page.locator("table tbody tr th a");
assert((await quoteLinks.first().getAttribute("href")).includes("quoteId="));
await page.getByRole("button", { name: "Refresh data" }).click();
await page.getByRole("button", { name: "Refresh data" }).waitFor();
const download = page.waitForEvent("download");
await page.getByRole("button", { name: "Export summary" }).click();
const file = await download;
const csv = fs.readFileSync(await file.path(), "utf8");
assert(csv.includes("Quote requests"));
assert(csv.includes("Previous period aligned by day"));
assert(!csv.includes("customerEmail"));
await page.getByText("How to read these numbers", { exact: true }).click();
assert(await page.getByText("Data scope:", { exact: true }).isVisible());
for (const width of [375, 768, 1080, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    `overflow ${width}`,
  );
  await page.screenshot({ path: `../analytics-${width}.png`, fullPage: true });
}
await page.evaluate(() => document.documentElement.classList.add("dark"));
await page.screenshot({ path: "../analytics-dark.png", fullPage: true });
for (const days of [7, 90]) {
  await page.goto(`http://localhost:3107/analytics-verification?days=${days}`);
  await page.getByRole("button", { name: "View daily data table" }).click();
  assert.equal(
    await page.locator("#analytics-daily-table tbody tr").count(),
    days,
  );
}
await page.goto("http://localhost:3107/analytics-verification?empty=1");
assert(
  await page
    .getByRole("heading", { name: "No quote requests in this period" })
    .isVisible(),
);
assert(
  await page
    .getByText("Your activity trend will appear here", { exact: true })
    .isVisible(),
);
assert(!(await page.getByText("12.5%", { exact: true }).count()));
await page.getByRole("button", { name: "View daily data table" }).focus();
assert(
  await page
    .getByRole("button", { name: "View daily data table" })
    .evaluate((el) => el === document.activeElement),
);
await page.screenshot({ path: "../analytics-empty.png", fullPage: true });
for (const plan of ["STARTER", "PRO", "ENTERPRISE"]) {
  await page.goto(
    `http://localhost:3107/analytics-verification?shell=1&plan=${plan}`,
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  const nav = page
    .locator("aside nav")
    .getByRole("link", { name: "Analytics", exact: true });
  assert(!(await nav.getAttribute("class")).includes("cursor-not-allowed"));
  await page.locator(".recharts-area-area").waitFor({ state: "visible" });
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
}
await page.locator(".recharts-area-area").waitFor({ state: "visible" });
await page.screenshot({
  path: "../analytics-dashboard-shell.png",
  fullPage: true,
});
await page.setViewportSize({ width: 375, height: 900 });
assert(
  await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
);
assert.deepEqual(errors, []);
console.log(
  "PASS: all sections, comparisons, 7/30/90 windows, daily table, sorting control, quote links, refresh, CSV download, empty state, keyboard focus, mobile/tablet/desktop, dark theme, no browser exceptions",
);
await browser.close();
