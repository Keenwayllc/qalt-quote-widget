// Row-level security against a real Postgres 17 that mirrors Supabase roles:
// the app owns the tables as a non-superuser BYPASSRLS role (like "postgres"
// on Supabase), and "anon" holds the Data API's default table grants.
import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import EmbeddedPostgres from 'embedded-postgres';
import pg from 'pg';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { loadMonitor } from './load-monitor.mjs';

const EXPOSED = ['AbandonedQuote', 'DocumentSequence', 'CustomerDocument', 'QuoteFollowUp', 'QuoteBooking', 'PricingRule',
  'VehicleRequest', 'AppError', 'IntegrationAuditLog', 'WidgetInstallation', 'IntegrationConnection'];

const dir = mkdtempSync(join(tmpdir(), 'qalt-rls-pg-'));
const port = 55000 + Math.floor(Math.random() * 1000);
const server = new EmbeddedPostgres({ databaseDir: dir, port, user: 'postgres', password: 'test', persistent: false });
const appUrl = `postgresql://qalt_app:test@localhost:${port}/qalt_rls`;
let app;
const RLS_MIGRATION = '20261006130000_enable_rls_exposed_tables';
const require = createRequire(import.meta.url);

// Runs the app's own runtime CREATE TABLE code, as production did before the RLS migration.
async function runRuntimeDdl(client) {
  const prisma = { $executeRawUnsafe: (sql) => client.query(sql) };
  for (const [file, fn] of [['growth-engine', 'ensureGrowthTables'], ['integration-auth', 'ensureIntegrationSchema'], ['abandoned-quotes', 'ensureAbandonedQuoteTable']]) {
    const source = readFileSync(new URL(`../../src/lib/${file}.ts`, import.meta.url), 'utf8');
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const mod = { exports: {} };
    new Function('require', 'module', 'exports', compiled)((name) => {
      if (name === '@/lib/prisma') return { default: prisma, __esModule: true };
      if (name === 'crypto' || name === 'node:crypto') return require('node:crypto');
      if (name === 'server-only') return {};
      return {};
    }, mod, mod.exports);
    await mod.exports[fn]();
  }
}

before(async () => {
  await server.initialise();
  await server.start();
  const su = new pg.Client({ connectionString: `postgresql://postgres:test@localhost:${port}/postgres` });
  await su.connect();
  await su.query(`CREATE ROLE qalt_app LOGIN PASSWORD 'test' NOSUPERUSER BYPASSRLS`);
  await su.query('CREATE ROLE anon NOLOGIN NOBYPASSRLS');
  await su.query('GRANT anon TO qalt_app');
  await su.query('CREATE DATABASE qalt_rls OWNER qalt_app');
  await su.end();

  app = new pg.Client({ connectionString: appUrl });
  await app.connect();
  const migrations = new URL('../../prisma/migrations/', import.meta.url);
  const names = readdirSync(migrations).filter((n) => /^\d{14}_/.test(n)).sort();
  for (const name of names.filter((n) => n !== RLS_MIGRATION)) {
    await app.query(readFileSync(new URL(`${name}/migration.sql`, migrations), 'utf8'));
  }
  await runRuntimeDdl(app);
  await app.query(readFileSync(new URL(`${RLS_MIGRATION}/migration.sql`, migrations), 'utf8'));
  // Supabase's default privileges give anon full table grants in public.
  await app.query('GRANT USAGE ON SCHEMA public TO anon; GRANT ALL ON ALL TABLES IN SCHEMA public TO anon');
});

after(async () => {
  await app?.end();
  await server.stop();
  rmSync(dir, { recursive: true, force: true });
});

test('every previously exposed table has RLS enabled, not forced', async () => {
  const { rows } = await app.query(
    `SELECT relname, relrowsecurity, relforcerowsecurity FROM pg_class
     WHERE relnamespace = 'public'::regnamespace AND relname = ANY($1) ORDER BY relname`, [EXPOSED]);
  assert.equal(rows.length, EXPOSED.length);
  for (const row of rows) assert.deepEqual([row.relname, row.relrowsecurity, row.relforcerowsecurity], [row.relname, true, false]);
});

test('the app role still records errors through Prisma; anon sees and writes nothing', async () => {
  const monitor = loadMonitor(appUrl);
  try {
    await monitor.recordAppError({ source: 'server', message: 'RLS fixture bug', stack: 'Error\n    at fixture (a.js:1:1)', path: '/x' });
    assert.equal(monitor.emails.length, 1);
    assert.equal(await monitor.prisma.appError.count(), 1);
  } finally {
    await monitor.close();
  }

  await app.query('BEGIN');
  try {
    await app.query('SET LOCAL ROLE anon');
    for (const table of EXPOSED) {
      const { rows } = await app.query(`SELECT count(*)::int AS n FROM "${table}"`);
      assert.equal(rows[0].n, 0, `${table} visible to anon`);
    }
    await assert.rejects(
      app.query(`INSERT INTO "AppError" (id, fingerprint, source, message) VALUES ('x', 'y', 'client', 'anon write')`),
      /row-level security/);
  } finally {
    await app.query('ROLLBACK');
  }
});
