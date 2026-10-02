import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import sharp from 'sharp';
import {
  VEHICLE_ARTWORK_CHOICES, inferVehicleArtwork, normalizeVehicles, parseVehicleArtworkKey, resolveVehicleArtwork,
} from '../src/lib/form-vehicles.ts';
import { VEHICLE_ARTWORK_ASSETS } from '../src/lib/vehicle-artwork-assets.ts';

test('every built-in preset maps to its own artwork', () => {
  const presets = {
    Bicycle: 'bicycle', 'Cargo Bike': 'cargo-bike', 'Electric Bicycle': 'e-bike', Scooter: 'e-scooter',
    'Electric Scooter': 'e-scooter', Moped: 'moped', Motorcycle: 'motorcycle', Sedan: 'sedan', Hatchback: 'hatchback',
    SUV: 'suv', Minivan: 'minivan', 'Pickup Truck': 'pickup', 'Cargo Van': 'cargo-van',
    'High-Roof Cargo Van': 'high-roof-van', 'Sprinter Van': 'sprinter-van', 'Straight Truck': 'straight-truck',
    'Box Truck - 16 ft': 'box-truck-16', 'Box Truck - 20 ft': 'box-truck-20', 'Box Truck - 24 ft': 'box-truck-24',
    'Box Truck - 26 ft': 'box-truck-26', 'Flatbed / Stake Bed': 'flatbed', 'Refrigerated Van / Truck': 'refrigerated',
    'Dump Truck': 'dump-truck', 'Tanker Truck': 'tanker-truck', 'Roll-Off Truck': 'roll-off-truck',
    'Tractor Trailer - 28 ft': 'tractor-trailer-28', 'Tractor Trailer - 40 ft': 'tractor-trailer-40',
    'Tractor Trailer - 47 ft': 'tractor-trailer-47',
    'Tractor Trailer - 48 ft': 'tractor-trailer-48', 'Tractor Trailer - 53 ft': 'tractor-trailer-53',
    'Flatbed Tractor Trailer': 'flatbed-tractor-trailer', Doubles: 'doubles', Triples: 'triples',
  };
  for (const [name, artwork] of Object.entries(presets)) {
    assert.equal(inferVehicleArtwork(name), artwork, name);
    assert.ok(parseVehicleArtworkKey(artwork), `${artwork} is a pickable key`);
  }
});

test('common merchant names resolve sensibly and "cargo" never reads as "car"', () => {
  const names = {
    Truck: 'box-truck', '26ft truck': 'box-truck-26', 'Liftgate truck': 'box-truck', 'Box van': 'box-truck',
    'Pick-up': 'pickup', Vespa: 'moped', 'Hot shot': 'flatbed', '18 wheeler': 'tractor-trailer',
    'Semi - 53\'': 'tractor-trailer-53', 'Step deck trailer': 'flatbed-tractor-trailer', 'Reefer': 'refrigerated',
    'E-bike': 'e-bike', 'Electric cargo bike': 'cargo-bike', 'Kick scooter': 'e-scooter', 'Dumpster rental': 'roll-off-truck',
    'Small car': 'sedan', 'Cargo bike': 'cargo-bike', 'Cargo van': 'cargo-van', 'Mystery rig': 'cargo-van',
  };
  for (const [name, artwork] of Object.entries(names)) {
    assert.equal(inferVehicleArtwork(name), artwork, name);
  }
});

test('older saved artwork keys keep working', () => {
  // Every key the previous editor could save still parses.
  for (const key of ['bicycle', 'e-bike', 'cargo-bike', 'scooter', 'e-scooter', 'motorcycle', 'sedan', 'hatchback', 'suv',
    'minivan', 'pickup', 'cargo-van', 'high-roof-van', 'sprinter-van', 'box-truck', 'flatbed', 'refrigerated',
    'tractor-trailer', 'multi-trailer']) {
    assert.equal(parseVehicleArtworkKey(key), key, key);
  }
  // Broad keys refine by the vehicle name...
  assert.equal(resolveVehicleArtwork('Scooter', 'scooter'), 'e-scooter');
  assert.equal(resolveVehicleArtwork('Moped', 'scooter'), 'moped');
  assert.equal(resolveVehicleArtwork('Triples', 'multi-trailer'), 'triples');
  assert.equal(resolveVehicleArtwork('Doubles', 'multi-trailer'), 'doubles');
  assert.equal(resolveVehicleArtwork('Box Truck - 16 ft', 'box-truck'), 'box-truck-16');
  assert.equal(resolveVehicleArtwork('Straight Truck', 'box-truck'), 'straight-truck');
  assert.equal(resolveVehicleArtwork('Tractor Trailer - 28 ft', 'tractor-trailer'), 'tractor-trailer-28');
  // ...and otherwise keep what the merchant picked.
  assert.equal(resolveVehicleArtwork('Fast rider', 'scooter'), 'moped');
  assert.equal(resolveVehicleArtwork('Big rig', 'multi-trailer'), 'doubles');
  assert.equal(resolveVehicleArtwork('Local delivery rig', 'pickup'), 'pickup');
  assert.equal(resolveVehicleArtwork('Box Truck - 26 ft', 'sedan'), 'sedan');
  assert.equal(resolveVehicleArtwork('Cargo Van', 'unknown'), 'cargo-van');
});

test('merchant-selected artwork survives normalization for custom vehicle names', () => {
  assert.deepEqual(normalizeVehicles([{ name: 'Local delivery rig', fee: 25, artwork: 'pickup' }]),
    [{ name: 'Local delivery rig', fee: 25, artwork: 'pickup' }]);
  assert.deepEqual(normalizeVehicles([{ name: 'Triples', fee: 0, artwork: 'multi-trailer' }]),
    [{ name: 'Triples', fee: 0, artwork: 'multi-trailer' }]);
  assert.equal(parseVehicleArtworkKey('unknown'), undefined);
  assert.deepEqual(normalizeVehicles([{ name: 'Cargo Van', fee: 0, artwork: 'unknown' }]),
    [{ name: 'Cargo Van', fee: 0 }]);
});

test('rendered artwork exists for both themes and is truly transparent', async () => {
  const choices = new Set(VEHICLE_ARTWORK_CHOICES.map((c) => c.key));
  for (const [kind, asset] of Object.entries(VEHICLE_ARTWORK_ASSETS)) {
    assert.ok(choices.has(kind), `${kind} is a real artwork key`);
    for (const src of [asset.light, asset.dark]) {
      const file = `public${src}`;
      assert.ok(existsSync(file), file);
      const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      assert.equal(info.channels, 4, `${file} has alpha`);
      const w = info.width;
      const corners = [0, w - 1, (info.height - 1) * w, info.height * w - 1];
      for (const i of corners) assert.equal(data[i * 4 + 3], 0, `${file} corner is transparent`);
    }
  }
});

test('every pickable vehicle has rendered artwork', () => {
  for (const { key } of VEHICLE_ARTWORK_CHOICES) assert.ok(VEHICLE_ARTWORK_ASSETS[key], key);
});
