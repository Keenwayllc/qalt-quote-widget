import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_QUICK_SUBTITLE, normalizeQuickSubtitle } from '../src/lib/quick-subtitle.ts';

test('existing vehicle forms retain the current subtitle by default', () => {
  assert.equal(DEFAULT_QUICK_SUBTITLE, 'Enter the route, choose a vehicle, and see your price.');
});

test('merchants can write or remove the vehicle form subtitle', () => {
  assert.equal(normalizeQuickSubtitle('  Same-day delivery in minutes.  '), 'Same-day delivery in minutes.');
  assert.equal(normalizeQuickSubtitle('   '), '');
  assert.equal(normalizeQuickSubtitle('x'.repeat(210)).length, 200);
});
