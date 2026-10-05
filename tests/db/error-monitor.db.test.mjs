// Error monitoring against a real, throwaway Postgres 17 (embedded-postgres).
// Each loadMonitor() is a separate server instance with its own pool and
// module state; workers run as separate OS processes. Email and Claude are
// fakes, so these tests never send mail or spend API credits.
import assert from 'node:assert/strict';
import { after, before, beforeEach, test } from 'node:test';
import { execFile } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import EmbeddedPostgres from 'embedded-postgres';
import pg from 'pg';
import { loadMonitor } from './load-monitor.mjs';

const run = promisify(execFile);
const dir = mkdtempSync(join(tmpdir(), 'qalt-monitor-pg-'));
const port = 54000 + Math.floor(Math.random() * 1000);
const server = new EmbeddedPostgres({ databaseDir: dir, port, user: 'postgres', password: 'test', persistent: false });
const url = `postgresql://postgres:test@localhost:${port}/qalt_test`;
let admin;
const open = [];

function instance(options) {
  const monitor = loadMonitor(url, options);
  open.push(monitor);
  return monitor;
}

const bug = (name, extra = {}) => ({
  source: 'server',
  message: `Checkout broke in ${name}`,
  stack: `Error\n    at ${name} (app.js:1:1)`,
  path: '/dashboard/quotes',
  ...extra,
});

before(async () => {
  await server.initialise();
  await server.start();
  await server.createDatabase('qalt_test');
  admin = new pg.Client({ connectionString: url });
  await admin.connect();
  for (const migration of ['20261004120000_app_errors', '20261006120000_monitor_events']) {
    await admin.query(readFileSync(new URL(`../../prisma/migrations/${migration}/migration.sql`, import.meta.url), 'utf8'));
  }
});

after(async () => {
  for (const monitor of open) await monitor.close().catch(() => {});
  await admin?.end();
  await server.stop();
  rmSync(dir, { recursive: true, force: true });
});

beforeEach(async () => {
  await admin.query('TRUNCATE "AppError", "MonitorEvent"');
  delete process.env.ANTHROPIC_API_KEY;
  delete process.env.ERROR_TRIAGE_AI_DAILY_ATTEMPTS;
});

test('simultaneous reports of one new bug across instances send one alert', async () => {
  const a = instance();
  const b = instance();
  await Promise.all(Array.from({ length: 30 }, (_, i) => (i % 2 ? a : b).recordAppError(bug('payQuote'))));
  assert.equal(a.emails.length + b.emails.length, 1);
  const { rows } = await admin.query('SELECT count, status FROM "AppError"');
  assert.deepEqual(rows, [{ count: 30, status: 'NEW' }]);
});

test('a Fixed bug that recurs concurrently reopens and alerts exactly once', async () => {
  const a = instance();
  const b = instance();
  await a.recordAppError(bug('renderPdf'));
  await admin.query(`UPDATE "AppError" SET status = 'FIXED'`);
  const before = a.emails.length;

  await Promise.all(Array.from({ length: 12 }, (_, i) => (i % 2 ? a : b).recordAppError(bug('renderPdf'))));
  const back = [...a.emails, ...b.emails].slice(before).filter((m) => m.subject.includes('A fixed bug came back'));
  assert.equal(a.emails.length + b.emails.length - before, 1);
  assert.equal(back.length, 1);
  let { rows } = await admin.query('SELECT count, status FROM "AppError"');
  assert.deepEqual(rows, [{ count: 13, status: 'NEW' }]);

  // Still open: repeats only count. Fixed again: the next recurrence alerts again.
  await b.recordAppError(bug('renderPdf'));
  assert.equal(a.emails.length + b.emails.length - before, 1);
  await admin.query(`UPDATE "AppError" SET status = 'FIXED'`);
  await b.recordAppError(bug('renderPdf'));
  assert.equal(a.emails.length + b.emails.length - before, 2);
  ({ rows } = await admin.query('SELECT count, status FROM "AppError"'));
  assert.deepEqual(rows, [{ count: 15, status: 'NEW' }]);
});

test('separate processes share one 20 per hour cap, and recording continues past it', async () => {
  const workers = ['alpha', 'bravo', 'charlie', 'delta'].map((prefix) =>
    run(process.execPath, [fileURLToPath(new URL('./monitor-worker.mjs', import.meta.url)), url, prefix, '10']));
  const results = (await Promise.all(workers)).map(({ stdout }) => JSON.parse(stdout).emails);
  assert.equal(results.reduce((sum, n) => sum + n, 0), 20, `per-process emails ${results}`);
  const errors = await admin.query('SELECT count(*)::int AS n FROM "AppError"');
  assert.equal(errors.rows[0].n, 40);
  const alerts = await admin.query(`SELECT count(*)::int AS n FROM "MonitorEvent" WHERE kind = 'alert'`);
  assert.equal(alerts.rows[0].n, 20);
});

test('the cap survives a restart and frees up on a rolling hour', async () => {
  const first = instance();
  for (let i = 0; i < 20; i++) await first.recordAppError(bug(`fill_${String.fromCharCode(97 + i)}`));
  assert.equal(first.emails.length, 20);
  await first.close();

  const restarted = instance();
  await restarted.recordAppError(bug('afterRestart'));
  assert.equal(restarted.emails.length, 0, 'fresh process memory must not reset the cap');

  // Age 5 alerts past the hour: exactly 5 more may go out.
  await admin.query(`UPDATE "MonitorEvent" SET "createdAt" = "createdAt" - interval '61 minutes'
    WHERE id IN (SELECT id FROM "MonitorEvent" WHERE kind = 'alert' ORDER BY "createdAt" LIMIT 5)`);
  for (let i = 0; i < 8; i++) await restarted.recordAppError(bug(`later_${String.fromCharCode(97 + i)}`));
  assert.equal(restarted.emails.length, 5);
  const errors = await admin.query('SELECT count(*)::int AS n FROM "AppError"');
  assert.equal(errors.rows[0].n, 29);
});

test('concurrent slot claims never exceed the limit', async () => {
  const a = instance();
  const b = instance();
  const claims = await Promise.all(Array.from({ length: 40 }, (_, i) =>
    (i % 2 ? a : b).reserveMonitorSlot('ai_attempt', 7, 86_400_000, null, 'race')));
  assert.equal(claims.filter(Boolean).length, 7);
});

test('AI stays off by default even with an API key, and alerts still go out', async () => {
  process.env.ANTHROPIC_API_KEY = 'test-key-not-real';
  const monitor = instance({ claude: async () => { throw new Error('must not be called'); } });
  await monitor.recordAppError(bug('noBudget'));
  assert.equal(monitor.claudeCalls.length, 0);
  assert.equal(monitor.emails.length, 1);
  assert.match(monitor.emails[0].subject, /^\[UNRATED\] New bug on Qalt/);
});

test('retries count against the AI budget; exhausted or failing AI still emails', async () => {
  process.env.ANTHROPIC_API_KEY = 'test-key-not-real';
  process.env.ERROR_TRIAGE_AI_DAILY_ATTEMPTS = '3';
  const monitor = instance({ claude: async () => { throw new monitor.APIError(529, 'overloaded'); } });

  await monitor.recordAppError(bug('budgetOne'));
  assert.equal(monitor.claudeCalls.length, 2, 'first call plus one retry');
  assert.equal(monitor.claudeCalls[0].options.maxRetries, 0, 'SDK retries would bypass the budget');
  await monitor.recordAppError(bug('budgetTwo'));
  assert.equal(monitor.claudeCalls.length, 3, 'only one attempt left in the budget');
  await monitor.recordAppError(bug('budgetThree'));
  assert.equal(monitor.claudeCalls.length, 3, 'budget exhausted');

  assert.equal(monitor.emails.length, 3);
  assert.ok(monitor.emails.every((m) => m.subject.startsWith('[UNRATED]')));
  const { rows } = await admin.query(`SELECT detail FROM "MonitorEvent" WHERE kind = 'ai_attempt' ORDER BY detail`);
  assert.deepEqual(rows.map((r) => r.detail), ['attempt 1: failed 529', 'attempt 1: failed 529', 'attempt 2: failed 529']);
});

test('a non-retryable AI error is not retried', async () => {
  process.env.ANTHROPIC_API_KEY = 'test-key-not-real';
  process.env.ERROR_TRIAGE_AI_DAILY_ATTEMPTS = '10';
  const monitor = instance({ claude: async () => { throw new monitor.APIError(400, 'bad request'); } });
  await monitor.recordAppError(bug('badRequest'));
  assert.equal(monitor.claudeCalls.length, 1);
  assert.equal(monitor.emails.length, 1);
});

test('successful triage is stored, emailed, and its measured tokens recorded', async () => {
  process.env.ANTHROPIC_API_KEY = 'test-key-not-real';
  process.env.ERROR_TRIAGE_AI_DAILY_ATTEMPTS = '10';
  const monitor = instance({
    claude: async (n) => {
      if (n === 1) throw new monitor.APIConnectionError();
      return {
        stop_reason: 'end_turn',
        usage: { input_tokens: 812, output_tokens: 96 },
        parsed_output: { summary: 'Customers cannot pay.', likelyCause: 'payQuote reads a missing price.', severity: 'critical' },
      };
    },
  });
  await monitor.recordAppError(bug('triaged'));
  assert.equal(monitor.claudeCalls.length, 2);
  assert.match(monitor.emails[0].subject, /^\[CRITICAL\]/);
  const row = await admin.query('SELECT "aiSummary", severity FROM "AppError"');
  assert.deepEqual(row.rows[0], { aiSummary: 'Customers cannot pay.', severity: 'critical' });
  const usage = await admin.query(`SELECT detail, "inputTokens", "outputTokens" FROM "MonitorEvent" WHERE kind = 'ai_attempt' ORDER BY detail`);
  assert.deepEqual(usage.rows, [
    { detail: 'attempt 1: failed network', inputTokens: null, outputTokens: null },
    { detail: 'attempt 2: end_turn', inputTokens: 812, outputTokens: 96 },
  ]);
});
