// Builds the quote form's vehicle artwork from full-size transparent renders.
//
//   node scripts/build-vehicle-artwork.mjs ["<source folder>"]
//
// Writes public/images/vehicles/{light,dark}/<name>.webp. Light files keep the
// render as-is; dark files lift the near-black tones (tires, glass, grille) so
// they don't sink into a dark card. Both stay fully transparent: the card is the
// background. Baked-in shadows are recolored to black so they never glow on dark.
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = process.argv[2] ?? path.resolve(process.cwd(), "..", "Qalt Vehicle Artwork");
const OUT_DIR = path.resolve("public/images/vehicles");

// Output name -> source file. Motor vehicles face left and bikes face right,
// matching the reference catalog. Any "<name>.png|webp|jpg" in the folder is
// picked up too, so new renders only need the right file name.
const SOURCES = {
  bicycle: { file: "Modern White Hybrid Bicycle on White Background.png" },
  "cargo-bike": { file: "Modern White Cargo E-Bike Profile (1).png" },
  sedan: { file: "Modern White Sedan Side Profile.png", flip: true },
  "box-truck": { file: "Modern White Box Truck Cutout.png" },
  "straight-truck": { file: "White Box Truck Studio Profile.png", flip: true },
};

const MAX_W = 640;
const MAX_H = 340;
const PAD = 0.025;

function findSource(name) {
  const known = SOURCES[name];
  if (known && existsSync(path.join(SOURCE_DIR, known.file))) return { ...known, file: path.join(SOURCE_DIR, known.file) };
  const hit = readdirSync(SOURCE_DIR).find((f) => /\.(png|webp|jpe?g)$/i.test(f) && path.parse(f).name.toLowerCase() === name);
  return hit ? { file: path.join(SOURCE_DIR, hit), flip: false } : null;
}

/** Binary mask dilated by r pixels (square kernel), via two running-window passes. */
function dilate(mask, w, h, r) {
  const tmp = new Uint8Array(w * h);
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    let count = 0;
    for (let x = -r; x < w; x++) {
      if (x + r < w && mask[y * w + x + r]) count++;
      if (x - r - 1 >= 0 && mask[y * w + x - r - 1]) count--;
      if (x >= 0) tmp[y * w + x] = count > 0 ? 1 : 0;
    }
  }
  for (let x = 0; x < w; x++) {
    let count = 0;
    for (let y = -r; y < h; y++) {
      if (y + r < h && tmp[(y + r) * w + x]) count++;
      if (y - r - 1 >= 0 && tmp[(y - r - 1) * w + x]) count--;
      if (y >= 0) out[y * w + x] = count > 0 ? 1 : 0;
    }
  }
  return out;
}

async function build(name, src) {
  let img = sharp(src.file).ensureAlpha();
  if (src.flip) img = img.flop();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const px = w * h;

  const solid = new Uint8Array(px);
  for (let i = 0; i < px; i++) {
    if (data[i * 4 + 3] <= 4) data[i * 4 + 3] = 0;
    if (data[i * 4 + 3] >= 250) solid[i] = 1;
  }
  // Partly transparent pixels away from the body are shadow or haze, not edges.
  const nearBody = dilate(solid, w, h, Math.max(3, Math.round(w / 450)));
  const shadow = new Uint8Array(px);
  for (let i = 0; i < px; i++) {
    const a = data[i * 4 + 3];
    if (a > 0 && a < 250 && !nearBody[i]) {
      shadow[i] = 1;
      data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = 0;
      data[i * 4 + 3] = Math.round(a * 0.8);
    }
  }

  // Trim to the visible vehicle plus a little air.
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (data[(y * w + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  const pad = Math.round((x1 - x0) * PAD);
  const crop = { left: Math.max(0, x0 - pad), top: Math.max(0, y0 - pad) };
  crop.width = Math.min(w, x1 + pad + 1) - crop.left;
  crop.height = Math.min(h, y1 + pad + 1) - crop.top;

  const dark = Buffer.from(data);
  for (let i = 0; i < px; i++) {
    const o = i * 4;
    if (dark[o + 3] === 0) continue;
    if (shadow[i]) { dark[o + 3] = Math.round(dark[o + 3] * 0.75); continue; }
    for (let c = 0; c < 3; c++) {
      const v = dark[o + c];
      if (v < 120) dark[o + c] = Math.round(v + 38 * (1 - v / 120));
    }
  }

  const encode = (buf, theme) => sharp(buf, { raw: { width: w, height: h, channels: 4 } })
    .extract(crop)
    .resize({ width: MAX_W, height: MAX_H, fit: "inside", kernel: "lanczos3" })
    .webp({ quality: 88, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(path.join(OUT_DIR, theme, `${name}.webp`));

  const [light] = await Promise.all([encode(data, "light"), encode(dark, "dark")]);
  return `${name}: ${light.width}x${light.height}, ${(light.size / 1024).toFixed(1)} KB`;
}

mkdirSync(path.join(OUT_DIR, "light"), { recursive: true });
mkdirSync(path.join(OUT_DIR, "dark"), { recursive: true });

const names = new Set([
  ...Object.keys(SOURCES),
  ...readdirSync(SOURCE_DIR).filter((f) => /\.(png|webp|jpe?g)$/i.test(f)).map((f) => path.parse(f).name.toLowerCase())
    .filter((n) => /^[a-z0-9-]+$/.test(n)),
]);
for (const name of names) {
  const src = findSource(name);
  if (!src) { console.warn(`skip ${name}: no source file`); continue; }
  console.log(await build(name, src));
}
