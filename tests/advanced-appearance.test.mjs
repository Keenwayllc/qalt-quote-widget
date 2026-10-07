import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import * as color from '../src/lib/color.ts';
import * as plans from '../src/lib/plans.ts';

function load(path, modules) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const mod = { exports: {} };
  new Function('require', 'module', 'exports', compiled)((name) => {
    if (name in modules) return modules[name];
    throw new Error(`unexpected import ${name}`);
  }, mod, mod.exports);
  return mod.exports;
}

const lib = load('src/lib/advanced-appearance.ts', { '@/lib/color': color, '@/lib/plans': plans });
const { parseAdvancedAppearance, readStoredAppearance, effectiveAppearance, resolveAppearance, appearanceFromPreset, auditContrast, PRESET_IDS } = lib;
const base = () => appearanceFromPreset('clean', '#1E40AF');

test('only Enterprise includes advanced appearance; basic branding stays on Pro', () => {
  assert.equal(plans.getEntitlements('STARTER').isAdvancedAppearanceEnabled, false);
  assert.equal(plans.getEntitlements('PRO').isAdvancedAppearanceEnabled, false);
  assert.equal(plans.getEntitlements('ENTERPRISE').isAdvancedAppearanceEnabled, true);
  assert.equal(plans.getEntitlements('PRO').isAdvancedCustomizationEnabled, true);
  assert.equal(plans.getEntitlements(null).isAdvancedAppearanceEnabled, false);
});

test('every preset is valid and readable in light, dark and auto with common brand colors', () => {
  for (const id of PRESET_IDS) {
    for (const primary of ['#1E40AF', '#DC2626', '#0F172A', '#047857']) {
      const appearance = { ...appearanceFromPreset(id, primary), scheme: 'auto' };
      const parsed = parseAdvancedAppearance(appearance);
      assert.equal(parsed.ok, true, `${id} with ${primary}: ${parsed.errors}`);
      const blocking = auditContrast(appearance).filter((issue) => issue.level === 'error' || issue.token !== 'primary');
      assert.deepEqual(blocking.map((issue) => issue.message), [], `${id} with ${primary}`);
    }
  }
});

test('unknown keys, unsafe strings and out-of-range values are rejected', () => {
  const cases = [
    (a) => { a.customCss = 'body{display:none}'; },
    (a) => { a.light.surface = '#fff;background:url(https://evil.example)'; },
    (a) => { a.light.text = 'red'; },
    (a) => { a.light.text = '#FFF'; },
    (a) => { a.dark.extra = '#000000'; },
    (a) => { delete a.dark.error; },
    (a) => { a.primary = 'var(--x)'; },
    (a) => { a.typography.body = "Comic Sans'; } body { color: red"; },
    (a) => { a.typography.scale = 140; },
    (a) => { a.layout.radius = 25; },
    (a) => { a.layout.radius = -1; },
    (a) => { a.layout.radius = 3.5; },
    (a) => { a.layout.contentWidth = 300; },
    (a) => { a.layout.contentWidth = 1000; },
    (a) => { a.layout.contentWidth = '100vw'; },
    (a) => { a.layout.density = 'tiny'; },
    (a) => { a.surfaces.shadow = '0 0 9999px red'; },
    (a) => { a.surfaces.buttonStyle = 'hidden'; },
    (a) => { a.scheme = 'sepia'; },
    (a) => { a.version = 2; },
    (a) => { a.presetId = '__proto__'; },
  ];
  for (const mutate of cases) {
    const appearance = structuredClone(base());
    mutate(appearance);
    assert.equal(parseAdvancedAppearance(appearance).ok, false, JSON.stringify(appearance).slice(0, 80));
  }
  for (const value of [null, [], 'x', 1]) assert.equal(parseAdvancedAppearance(value).ok, false);
  assert.equal(parseAdvancedAppearance({ ...base(), layout: { ...base().layout, contentWidth: 640 } }).ok, true);
});

test('unreadable essential states block saving but can still be previewed', () => {
  const unreadable = base();
  unreadable.light.text = unreadable.light.surface;
  unreadable.light.error = '#FFDDDD';
  const strict = parseAdvancedAppearance(unreadable);
  assert.equal(strict.ok, false);
  assert.ok(strict.errors.some((message) => message.includes('text on the form surface')));
  assert.ok(strict.errors.some((message) => message.includes('error messages')));
  assert.equal(parseAdvancedAppearance(unreadable, { enforceContrast: false }).ok, true);

  // A hidden dark palette only matters once the form can show it.
  const darkBroken = base();
  darkBroken.dark.text = darkBroken.dark.surface;
  assert.equal(parseAdvancedAppearance(darkBroken).ok, true);
  assert.equal(parseAdvancedAppearance({ ...darkBroken, scheme: 'auto' }).ok, false);

  const outline = base();
  outline.surfaces.buttonStyle = 'outline';
  outline.primary = '#E5E7EB';
  assert.equal(parseAdvancedAppearance(outline).ok, false);
});

test('legacy, corrupt and future rows render the basic theme; valid rows round-trip', () => {
  assert.equal(readStoredAppearance(null), null);
  assert.equal(readStoredAppearance(undefined), null);
  assert.equal(readStoredAppearance({ version: 2 }), null);
  assert.equal(readStoredAppearance('{"version":1}'), null);
  const saved = base();
  assert.deepEqual(readStoredAppearance(JSON.parse(JSON.stringify(saved))), saved);
});

test('downgrade keeps saved tokens but renders basic; re-upgrade restores them', () => {
  const saved = JSON.parse(JSON.stringify(base()));
  assert.deepEqual(effectiveAppearance(saved, 'ENTERPRISE'), base());
  assert.equal(effectiveAppearance(saved, 'PRO'), null);
  assert.equal(effectiveAppearance(saved, 'STARTER'), null);
  assert.deepEqual(saved, JSON.parse(JSON.stringify(base())), 'stored value untouched');
  assert.deepEqual(effectiveAppearance(saved, 'ENTERPRISE'), base());
  assert.equal(effectiveAppearance(null, 'ENTERPRISE'), null);
});

test('preview drafts and saved embeds resolve to identical tokens in light and dark', () => {
  for (const scheme of ['light', 'dark', 'auto']) {
    const saved = JSON.parse(JSON.stringify({ ...appearanceFromPreset('soft', '#7C3AED'), scheme }));
    const embed = resolveAppearance(effectiveAppearance(saved, 'ENTERPRISE'));
    const draft = parseAdvancedAppearance(saved, { enforceContrast: false });
    assert.deepEqual(resolveAppearance(draft.value), embed);
    assert.equal(embed.attrs['data-qa-scheme'], scheme);
  }
});

test('resolved CSS values are fixed-format strings, never merchant text', () => {
  const resolved = resolveAppearance({ ...appearanceFromPreset('editorial', '#B91C1C'), scheme: 'auto' });
  assert.equal(resolved.vars['--qa-l-surface'], '#FFFDF9');
  assert.equal(resolved.vars['--qa-d-surface'], '#1E1B18');
  assert.equal(resolved.tone.light, 'light');
  assert.equal(resolved.tone.dark, 'dark');
  assert.equal(resolved.rootFontPx, 16.8);
  assert.equal(resolved.vars['--qa-radius'], '6px');
  for (const [name, value] of Object.entries(resolved.vars)) {
    assert.match(name, /^--qa-[a-z-]+$/);
    assert.doesNotMatch(value, /[;{}<>]|url\(|expression|@import/i, name);
  }
  const pill = resolveAppearance({ ...base(), surfaces: { ...base().surfaces, buttonShape: 'pill' }, layout: { ...base().layout, contentWidth: 520 } });
  assert.equal(pill.vars['--qa-radius-button'], '999px');
  assert.equal(pill.vars['--qa-max-width'], '520px');
  assert.equal(pill.attrs['data-qa-width'], 'fixed');
});

// --- API route: auth, ownership, entitlement ---------------------------------

function route({ plan = 'ENTERPRISE', ownerId = 'company1', stored = null, session = 'company1' } = {}) {
  const updates = [];
  const queries = [];
  const prisma = {
    widgetSettings: {
      findFirst: async (query) => {
        queries.push(query);
        return query.where.id === 'form1' && query.where.companyId === ownerId
          ? { id: 'form1', advancedAppearance: stored, company: { subscriptionPlan: plan } }
          : null;
      },
      update: async (args) => { updates.push(args); return {}; },
    },
  };
  const mod = load('src/app/api/dashboard/widget-appearance/route.ts', {
    'next/server': { NextResponse: { json: (body, init) => Response.json(body, init) } },
    'next/headers': { cookies: async () => ({ get: () => (session ? { value: 'token' } : undefined) }) },
    '@/lib/auth': { verifyToken: async () => (session ? { companyId: session } : null) },
    '@/lib/prisma': { default: prisma },
    '@/generated/prisma/client': { Prisma: { DbNull: 'DB_NULL' } },
    '@/lib/plans': plans,
    '@/lib/advanced-appearance': lib,
  });
  return { ...mod, updates, queries };
}
const req = (method, body) => new Request('https://www.qalt.site/api/dashboard/widget-appearance', { method, body: JSON.stringify(body) });

test('Enterprise owner saves a validated appearance', async () => {
  const api = route();
  const res = await api.PUT(req('PUT', { formId: 'form1', appearance: base() }));
  assert.equal(res.status, 200);
  assert.deepEqual(api.updates[0].data.advancedAppearance, base());
  assert.deepEqual(api.queries[0].where, { id: 'form1', companyId: 'company1' });
});

test('Starter and Pro cannot write advanced appearance, even with a valid payload', async () => {
  for (const plan of ['STARTER', 'PRO']) {
    const api = route({ plan });
    const res = await api.PUT(req('PUT', { formId: 'form1', appearance: base() }));
    assert.equal(res.status, 403);
    assert.equal(api.updates.length, 0);
  }
});

test('another company cannot read or write this form', async () => {
  const api = route({ session: 'attacker' });
  assert.equal((await api.PUT(req('PUT', { formId: 'form1', appearance: base() }))).status, 404);
  assert.equal((await api.DELETE(req('DELETE', { formId: 'form1' }))).status, 404);
  assert.equal((await api.GET(new Request('https://www.qalt.site/x?formId=form1'))).status, 404);
  assert.equal(api.updates.length, 0);
});

test('signed-out, malformed and unsafe requests change nothing', async () => {
  const signedOut = route({ session: null });
  assert.equal((await signedOut.PUT(req('PUT', { formId: 'form1', appearance: base() }))).status, 401);
  const api = route();
  assert.equal((await api.PUT(req('PUT', { formId: '../x', appearance: base() }))).status, 400);
  assert.equal((await api.PUT(req('PUT', { formId: 'form1', appearance: { ...base(), css: 'x' } }))).status, 400);
  const invalid = base(); invalid.light.text = invalid.light.surface;
  const res = await api.PUT(req('PUT', { formId: 'form1', appearance: invalid }));
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /needs at least/);
  assert.equal(api.updates.length, 0);
});

test('reset is allowed after a downgrade and clears only the advanced column', async () => {
  const api = route({ plan: 'PRO', stored: base() });
  const got = await (await api.GET(new Request('https://www.qalt.site/x?formId=form1'))).json();
  assert.equal(got.active, false);
  assert.deepEqual(got.appearance, base());
  assert.equal((await api.DELETE(req('DELETE', { formId: 'form1' }))).status, 200);
  assert.deepEqual(api.updates[0], { where: { id: 'form1' }, data: { advancedAppearance: 'DB_NULL' } });
});
