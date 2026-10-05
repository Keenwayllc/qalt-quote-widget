// A brand-new Postgres 17 built only by `prisma migrate deploy` must match
// production's schema (tests/fixtures/production-schema-catalog.json, metadata
// only: columns, constraints, indexes, RLS). Re-running the reconcile
// migration on that production-shaped database must change nothing.
import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { execFile } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import EmbeddedPostgres from 'embedded-postgres';
import pg from 'pg';

const run = promisify(execFile);
const root = fileURLToPath(new URL('../..', import.meta.url));
const dir = mkdtempSync(join(tmpdir(), 'qalt-migrate-pg-'));
const port = 57000 + Math.floor(Math.random() * 1000);
const server = new EmbeddedPostgres({ databaseDir: dir, port, user: 'postgres', password: 'test', persistent: false });
const url = `postgresql://postgres:test@localhost:${port}/qalt_fresh`;
const catalogSql = readFileSync(new URL('./schema-catalog.sql', import.meta.url), 'utf8');
const production = JSON.parse(readFileSync(new URL('../fixtures/production-schema-catalog.json', import.meta.url), 'utf8'));
let client;

before(async () => {
  await server.initialise();
  await server.start();
  await server.createDatabase('qalt_fresh');
  // Every URL prisma.config.ts may read points at the throwaway database.
  const env = { ...process.env, DATABASE_URL: url, DIRECT_URL: url, POSTGRES_URL_NON_POOLING: url, SUPABASE_DB_URL: url };
  await run(process.execPath, [join(root, 'node_modules/prisma/build/index.js'), 'migrate', 'deploy'], { cwd: root, env });
  client = new pg.Client({ connectionString: url });
  await client.connect();
});

after(async () => {
  await client?.end();
  await server.stop();
  rmSync(dir, { recursive: true, force: true });
});

function differences(actual) {
  const out = [];
  for (const key of Object.keys(production)) {
    const want = new Set(production[key]), have = new Set(actual[key] || []);
    for (const x of want) if (!have.has(x)) out.push(`missing ${key}: ${x}`);
    for (const x of have) if (!want.has(x)) out.push(`extra ${key}: ${x}`);
  }
  return out;
}

test('a fresh database built from migrations matches the production schema', async () => {
  const { rows } = await client.query(catalogSql);
  assert.deepEqual(differences(rows[0].catalog), []);
});

test('re-running the reconcile migration on a production-shaped database is a lock-free no-op', async () => {
  const sql = readFileSync(new URL('../../prisma/migrations/20261006140000_reconcile_schema_with_production/migration.sql', import.meta.url), 'utf8');
  await client.query('BEGIN');
  try {
    await client.query(sql);
    const locks = await client.query(`SELECT c.relname, l.mode FROM pg_locks l JOIN pg_class c ON c.oid = l.relation
      WHERE l.pid = pg_backend_pid() AND c.relnamespace = 'public'::regnamespace AND l.mode <> 'AccessShareLock'`);
    assert.deepEqual(locks.rows, []);
    const { rows } = await client.query(catalogSql);
    assert.deepEqual(differences(rows[0].catalog), []);
  } finally {
    await client.query('ROLLBACK');
  }
});
