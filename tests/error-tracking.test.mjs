import assert from 'node:assert/strict';
import test from 'node:test';
import { errorFingerprint, isNoiseError, normalizeErrorMessage, normalizeErrorPath, topStackFunction } from '../src/lib/error-tracking.ts';

test('the same bug with different ids groups together', () => {
  const a = { source: 'client', message: 'Quote cmtjk5po0000004jzgud1ar9o not found (42)', path: '/quote/abc123', stack: 'Error\n    at loadQuote (https://www.qalt.site/_next/static/chunks/aa11.js:1:200)' };
  const b = { source: 'client', message: 'Quote cmo27bgcc000004kwhn1oyui2 not found (7)', path: '/quote/zz98', stack: 'Error\n    at loadQuote (https://www.qalt.site/_next/static/chunks/bb22.js:9:900)' };
  assert.equal(errorFingerprint(a), errorFingerprint(b));
  assert.notEqual(errorFingerprint(a), errorFingerprint({ ...a, source: 'server' }));
});

test('normalizes messages, paths and stack frames', () => {
  assert.equal(normalizeErrorMessage('Price "abc" is 12.5 at https://x.com/a'), 'Price <str> is <n> at <url>');
  assert.equal(normalizeErrorPath('/widget/cmtjk5po0000004jzgud1ar9o?x=1'), '/widget/:id');
  assert.equal(topStackFunction('Error: x\n    at node_modules/foo.js:1:1\n    at async submitQuote (app.js:3:4)'), 'submitQuote');
  assert.equal(topStackFunction('submitQuote@https://a.js:1:2\n'), 'submitQuote');
  assert.equal(topStackFunction('Error: bad user@x.com\n    at render (a.js:1:1)'), 'render');
});

test('filters browser noise', () => {
  assert.ok(isNoiseError('ResizeObserver loop completed with undelivered notifications.'));
  assert.ok(isNoiseError('Script error.'));
  assert.ok(isNoiseError('TypeError: Failed to fetch'));
  assert.ok(isNoiseError('x', 'at foo (chrome-extension://abc/content.js:1:1)'));
  assert.ok(!isNoiseError("Cannot read properties of undefined (reading 'price')"));
});
