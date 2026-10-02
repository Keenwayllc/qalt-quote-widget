import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { WHATS_NEW } from '../src/lib/whats-new.ts';

test('every What\'s New update has a card image', () => {
  for (const item of WHATS_NEW) {
    assert.ok(item.image, `${item.id} needs an image in public/images/whats-new/`);
    for (const src of [item.image, item.imageDark].filter(Boolean)) {
      assert.ok(existsSync(`public${src}`), `public${src} exists`);
    }
  }
});

test('update ids are unique', () => {
  assert.equal(new Set(WHATS_NEW.map((item) => item.id)).size, WHATS_NEW.length);
});
