import assert from 'node:assert/strict';
import test from 'node:test';
import sharp from 'sharp';
import { analyzeLogoTone } from '../src/lib/logo-tone.ts';

// A 200x80 canvas with a centered mark of the given fill; the rest is
// transparent unless `background` is set.
async function logo(fill, background) {
  const bg = background ?? { r: 0, g: 0, b: 0, alpha: 0 };
  const mark = await sharp({ create: { width: 140, height: 40, channels: 4, background: fill } }).png().toBuffer();
  return sharp({ create: { width: 200, height: 80, channels: 4, background: bg } })
    .composite([{ input: mark, left: 30, top: 20 }])
    .png()
    .toBuffer();
}

async function striped(colors) {
  const w = 40;
  const parts = await Promise.all(colors.map((c) => sharp({ create: { width: w, height: 40, channels: 4, background: c } }).png().toBuffer()));
  return sharp({ create: { width: w * colors.length + 20, height: 60, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(parts.map((input, i) => ({ input, left: 10 + i * w, top: 10 })))
    .png()
    .toBuffer();
}

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const BLACK = { r: 20, g: 20, b: 24, alpha: 1 };

test('white transparent logo is light', async () => {
  assert.equal(await analyzeLogoTone(await logo(WHITE)), 'light');
});

test('black transparent logo is dark', async () => {
  assert.equal(await analyzeLogoTone(await logo(BLACK)), 'dark');
});

test('full-color logo is balanced and renders untouched', async () => {
  const colorful = await striped([
    { r: 223, g: 23, b: 49, alpha: 1 },
    { r: 30, g: 64, b: 175, alpha: 1 },
    { r: 16, g: 185, b: 129, alpha: 1 },
    { r: 245, g: 158, b: 11, alpha: 1 },
  ]);
  assert.equal(await analyzeLogoTone(colorful), 'balanced');
});

test('mostly pale full-color logo is treated as light', async () => {
  const pale = await striped([
    { r: 255, g: 240, b: 245, alpha: 1 },
    { r: 235, g: 245, b: 255, alpha: 1 },
    { r: 240, g: 255, b: 240, alpha: 1 },
    { r: 30, g: 64, b: 175, alpha: 1 },
  ]);
  assert.equal(await analyzeLogoTone(pale), 'light');
});

test('logo with its own solid background is opaque', async () => {
  const jpgStyle = await logo(BLACK, WHITE);
  assert.equal(await analyzeLogoTone(jpgStyle), 'opaque');
});

test('fully transparent image is unknown', async () => {
  const empty = await sharp({ create: { width: 50, height: 50, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).png().toBuffer();
  assert.equal(await analyzeLogoTone(empty), 'unknown');
});

test('a confident detection beats a contradicting manual logo background', async () => {
  const { pickLogoTone } = await import('../src/lib/logo-plate.ts');
  assert.equal(pickLogoTone('dark', 'dark'), 'dark');
  assert.equal(pickLogoTone('light', 'light'), 'light');
  assert.equal(pickLogoTone('balanced', 'dark'), 'light');
  assert.equal(pickLogoTone('opaque', 'light'), 'dark');
  assert.equal(pickLogoTone('unknown', 'auto'), 'unknown');
  assert.equal(pickLogoTone(null, 'dark'), 'light');
});
