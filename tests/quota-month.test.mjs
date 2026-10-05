import assert from 'node:assert/strict';
import test from 'node:test';
import { quotaMonthStart } from '../src/lib/plans.ts';

test('Starter quota month starts at 00:00 UTC on the 1st, whatever the server time zone', () => {
  // 5:30 PM Pacific on Sept 30 is already Oct 1 in UTC: the new month has begun.
  assert.equal(quotaMonthStart(new Date('2026-10-01T00:30:00Z')).toISOString(), '2026-10-01T00:00:00.000Z');
  assert.equal(quotaMonthStart(new Date('2026-09-30T23:59:59Z')).toISOString(), '2026-09-01T00:00:00.000Z');
  assert.equal(quotaMonthStart(new Date('2026-01-15T12:00:00Z'), 1).toISOString(), '2025-12-01T00:00:00.000Z');
});
