import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { widgetRequestAllowed } from '../src/lib/widget-rate-limit.ts';
import { externalWidgetHost } from '../src/lib/widget-installations.ts';

function endpoint(owned = true) {
  const calls = [];
  const prisma = {
    widgetSettings: { findFirst: async (query) => { calls.push(query); return owned ? { id: 'form1' } : null; } },
    $executeRaw: async (...values) => { calls.push(values); return 1; },
  };
  const source = readFileSync(new URL('../src/app/api/widget/install-ping/route.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const cjsModule = { exports: {} };
  new Function('require', 'module', 'exports', compiled)((name) => {
    if (name === 'next/server') return { NextResponse: Response };
    if (name === '@/lib/widget-rate-limit') return { widgetRequestAllowed };
    if (name === '@/lib/prisma') return { default: prisma };
    if (name === '@/lib/widget-installations') return { externalWidgetHost };
    throw new Error(name);
  }, cjsModule, cjsModule.exports);
  return { post: cjsModule.exports.POST, calls };
}
function request(body, origin = 'https://www.qalt.site') {
  return new Request('https://www.qalt.site/api/widget/install-ping', {
    method: 'POST', headers: { origin }, body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}
const valid = { companyId: 'company1', formId: 'form1', domain: 'merchant.com' };
test('external host cannot write directly into widget telemetry', async () => {
  const { post, calls } = endpoint();
  assert.equal((await post(request(valid, 'https://merchant.com'))).status, 403);
  assert.equal(calls.length, 0);
});
test('form ownership must match before any installation is recorded', async () => {
  const { post, calls } = endpoint(false);
  assert.equal((await post(request(valid))).status, 204);
  assert.deepEqual(calls[0].where, { id: 'form1', companyId: 'company1' });
  assert.equal(calls.length, 1);
});
test('valid embed uses an atomic upsert for its account, form and domain', async () => {
  const { post, calls } = endpoint();
  assert.equal((await post(request(valid))).status, 204);
  assert.equal(calls.length, 2);
  assert.ok(calls[1][0].join('').includes('ON CONFLICT ("companyId", "formId", "domain")'));
  assert.deepEqual(calls[1].slice(2), ['company1', 'form1', 'merchant.com']);
});
test('invalid bodies and internal hosts never reach the database', async () => {
  for (const value of ['null', '{', { ...valid, domain: 'www.qalt.site' }, { ...valid, domain: 'localhost' },
    { ...valid, domain: 'merchant.com/path' }, { ...valid, formId: '' }]) {
    const { post, calls } = endpoint();
    assert.equal((await post(request(value))).status, 400);
    assert.equal(calls.length, 0);
  }
  const { post, calls } = endpoint();
  assert.equal((await post(request('x'.repeat(5000)))).status, 413);
  assert.equal(calls.length, 0);
});
