import assert from 'node:assert/strict';
import test from 'node:test';
import { externalWidgetHost, widgetInstallationStatus } from '../src/lib/widget-installations.ts';

const app = 'https://www.qalt.site';
test('external embeds retain only normalized hostnames', () => {
  assert.equal(externalWidgetHost('https://WWW.customer.com./quote?email=private#address', app), 'www.customer.com');
  assert.equal(externalWidgetHost('http://customer.com:8080/widget', app), 'customer.com');
  assert.equal(externalWidgetHost('https://quotes.customer.com', app), 'quotes.customer.com');
});
test('previews, local networks and Qalt visits are excluded', () => {
  for (const url of ['https://qalt.site', 'https://www.qalt.site/dashboard/embed', 'https://app.qalt.site',
    'https://qalt-preview.vercel.app', 'http://localhost:3000', 'http://127.0.0.1',
    'http://192.168.1.1', 'http://[::1]', 'http://printer.local', 'http://intranet']) {
    assert.equal(externalWidgetHost(url, app), null, url);
  }
  assert.equal(externalWidgetHost('https://staging.customer.com', 'https://staging.customer.com'), null);
});
test('invalid inputs and active URL schemes are rejected', () => {
  for (const value of [null, {}, '', 'customer.com', 'javascript:alert(1)', 'ftp://customer.com',
    'https://user:secret@customer.com', 'https://bad..com', 'https://-bad.com', 'https://' + 'a'.repeat(2100) + '.com']) {
    assert.equal(externalWidgetHost(value, app), null);
  }
});
test('absence of observations differs from stale installation evidence', () => {
  const now = new Date('2026-10-04T12:00:00Z');
  assert.equal(widgetInstallationStatus(null, now), 'Not detected');
  assert.equal(widgetInstallationStatus(new Date('2026-10-03'), now), 'Active embed');
  assert.equal(widgetInstallationStatus(new Date('2026-09-04T12:00:00Z'), now), 'Active embed');
  assert.equal(widgetInstallationStatus(new Date('2026-09-04T11:59:59Z'), now), 'Previously detected');
});
