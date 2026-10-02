import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { WHATS_NEW } from '../src/lib/whats-new.ts';

// Updates still waiting on a card image. Remove an id once its image ships;
// never add to this list: every new update needs its image.
const AWAITING_IMAGE = new Set(['customer-documents', 'white-label-email', 'kanban-crm', 'geo-fencing', 'transit-time', 'payments']);

test('every What\'s New update has a card image', () => {
  for (const item of WHATS_NEW) {
    if (AWAITING_IMAGE.has(item.id) && !item.image) continue;
    assert.ok(item.image, `${item.id} needs an image in public/images/whats-new/`);
    for (const src of [item.image, item.imageDark].filter(Boolean)) {
      assert.ok(existsSync(`public${src}`), `public${src} exists`);
    }
  }
});

test('update ids are unique', () => {
  assert.equal(new Set(WHATS_NEW.map((item) => item.id)).size, WHATS_NEW.length);
});
