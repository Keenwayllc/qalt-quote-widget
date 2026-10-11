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

test('dedicated demo restore creates a usable sample form and rates without a login', async () => {
  const company = (await client.query(`SELECT "email", "passwordHash", "emailVerified", "registrationSource", "stripeSubscriptionId" FROM "Company" WHERE id = 'cmtjk5po0000004jzgud1ar9o'`)).rows[0];
  assert.equal(company.email, 'showroom@demo.qalt.invalid');
  assert.equal(company.passwordHash, '!disabled-demo-account');
  assert.equal(company.emailVerified, false);
  assert.equal(company.registrationSource, 'demo');
  assert.equal(company.stripeSubscriptionId, null);
  const form = (await client.query(`SELECT "paymentsEnabled", "headerText" FROM "WidgetSettings" WHERE id = 'qalt-dedicated-demo-form'`)).rows[0];
  assert.equal(form.paymentsEnabled, false);
  assert.equal(form.headerText, 'Try an instant delivery quote');
  const pricing = (await client.query(`SELECT "baseRatePerMile", "minimumCharge" FROM "PricingProfile" WHERE "companyId" = 'cmtjk5po0000004jzgud1ar9o' AND "widgetSettingsId" IS NULL`)).rows[0];
  assert.equal(pricing.baseRatePerMile, 2.5);
  assert.equal(pricing.minimumCharge, 35);
});

test('replaying demo restore preserves existing demo customization and all customer data', async () => {
  await client.query(`INSERT INTO "Company" (id,email,"passwordHash",name) VALUES ('real-customer','real@example.invalid','private-hash','Real Courier');
    INSERT INTO "WidgetSettings" (id,"companyId","primaryColor") VALUES ('real-form','real-customer','#123456');
    INSERT INTO "PricingProfile" (id,"companyId","minimumCharge") VALUES ('real-pricing','real-customer',91);
    UPDATE "WidgetSettings" SET "primaryColor" = '#654321' WHERE "companyId" = 'cmtjk5po0000004jzgud1ar9o';
    UPDATE "PricingProfile" SET "minimumCharge" = 73 WHERE "companyId" = 'cmtjk5po0000004jzgud1ar9o'`);
  const snapshot = async () => Promise.all(['Company','WidgetSettings','PricingProfile'].map(async table => (await client.query(`SELECT * FROM "${table}" ORDER BY id`)).rows));
  const before = await snapshot();
  await client.query(readFileSync(new URL('../../prisma/migrations/20261011210000_restore_dedicated_demo/migration.sql', import.meta.url), 'utf8'));
  assert.deepEqual(await snapshot(), before);
});


test('cleanup cannot delete the demo account, form or pricing but can delete ordinary customers', async () => {
  for (const table of ['Company', 'WidgetSettings', 'PricingProfile']) {
    const column = table === 'Company' ? 'id' : 'companyId';
    await assert.rejects(client.query(`DELETE FROM "${table}" WHERE "${column}" = 'cmtjk5po0000004jzgud1ar9o'`), /dedicated Qalt public demo cannot be deleted/);
  }
  await client.query(`DELETE FROM "PricingProfile" WHERE "companyId" = 'real-customer';
    DELETE FROM "WidgetSettings" WHERE "companyId" = 'real-customer';
    DELETE FROM "Company" WHERE id = 'real-customer'`);
  assert.equal((await client.query(`SELECT count(*)::int AS count FROM "Company" WHERE id = 'real-customer'`)).rows[0].count, 0);
});


test('showroom creates all three real form styles on the demo tenant only', async () => {
  const { rows } = await client.query(`SELECT id, "formStyle", "mapLayout", "paymentsEnabled", "customQuestions", "vehicleOptions" FROM "WidgetSettings" WHERE "companyId" = 'cmtjk5po0000004jzgud1ar9o' ORDER BY id`);
  assert.equal(rows.length, 3);
  assert.deepEqual(rows.map(row => row.formStyle).sort(), ['extended', 'quick', 'standard']);
  assert.ok(rows.every(row => row.mapLayout === 'side' && row.paymentsEnabled === false));
  const extended = rows.find(row => row.formStyle === 'extended');
  assert.equal(extended.customQuestions[0].label, 'What are you delivering?');
  const quick = rows.find(row => row.formStyle === 'quick');
  assert.deepEqual(quick.vehicleOptions.map(option => [option.name, option.fee]), [['Car', 0], ['Cargo Van', 25], ['Box Truck', 60]]);
});

test('showroom migration can replay without duplicating forms or editing other tenants', async () => {
  await client.query(`INSERT INTO "Company" (id,email,"passwordHash",name) VALUES ('showroom-unrelated','unrelated@example.invalid','private','Ordinary Company');
    INSERT INTO "WidgetSettings" (id,"companyId","mapLayout") VALUES ('unrelated-showroom-form','showroom-unrelated','inline')`);
  const snapshot = async () => (await client.query(`SELECT * FROM "WidgetSettings" ORDER BY id`)).rows;
  const before = await snapshot();
  await client.query(readFileSync(new URL('../../prisma/migrations/20261011224000_demo_form_showroom/migration.sql', import.meta.url), 'utf8'));
  assert.deepEqual(await snapshot(), before);
});
