import assert from 'node:assert/strict';
import test from 'node:test';
import { inferVehicleArtwork, normalizeVehicles, parseVehicleArtworkKey } from '../src/lib/form-vehicles.ts';

test('built-in vehicle names map to matching silhouettes', () => {
  const examples = {
    'Cargo Bike': 'cargo-bike',
    'Electric Bicycle': 'e-bike',
    Motorcycle: 'motorcycle',
    Sedan: 'sedan',
    'Cargo Van': 'cargo-van',
    'High-Roof Cargo Van': 'high-roof-van',
    'Sprinter Van': 'sprinter-van',
    'Pickup Truck': 'pickup',
    'Box Truck - 26 ft': 'box-truck',
    'Flatbed / Stake Bed': 'flatbed',
    'Refrigerated Van / Truck': 'refrigerated',
    'Tractor Trailer - 53 ft': 'tractor-trailer',
    Doubles: 'multi-trailer',
  };
  for (const [name, artwork] of Object.entries(examples)) {
    assert.equal(inferVehicleArtwork(name), artwork, name);
  }
});

test('every built-in preset maps to its own silhouette', () => {
  const presets = {
    Bicycle: 'bicycle', 'Cargo Bike': 'cargo-bike', 'Electric Bicycle': 'e-bike', Scooter: 'scooter',
    'Electric Scooter': 'e-scooter', Motorcycle: 'motorcycle', Sedan: 'sedan', Hatchback: 'hatchback', SUV: 'suv',
    Minivan: 'minivan', 'Pickup Truck': 'pickup', 'Cargo Van': 'cargo-van', 'High-Roof Cargo Van': 'high-roof-van',
    'Sprinter Van': 'sprinter-van', 'Straight Truck': 'box-truck', 'Box Truck - 16 ft': 'box-truck',
    'Box Truck - 20 ft': 'box-truck', 'Box Truck - 24 ft': 'box-truck', 'Box Truck - 26 ft': 'box-truck',
    'Flatbed / Stake Bed': 'flatbed', 'Refrigerated Van / Truck': 'refrigerated',
    'Tractor Trailer - 28 ft': 'tractor-trailer', 'Tractor Trailer - 45 ft': 'tractor-trailer',
    'Tractor Trailer - 47 ft': 'tractor-trailer', 'Tractor Trailer - 48 ft': 'tractor-trailer',
    'Tractor Trailer - 53 ft': 'tractor-trailer', Doubles: 'multi-trailer', Triples: 'multi-trailer',
  };
  for (const [name, artwork] of Object.entries(presets)) {
    assert.equal(inferVehicleArtwork(name), artwork, name);
  }
});

test('common merchant names resolve sensibly and "cargo" never reads as "car"', () => {
  const names = {
    Truck: 'box-truck', '26ft truck': 'box-truck', 'Liftgate truck': 'box-truck', 'Box van': 'box-truck',
    'Pick-up': 'pickup', Moped: 'scooter', 'Hot shot': 'flatbed', '18 wheeler': 'tractor-trailer',
    'E-bike': 'e-bike', 'Electric cargo bike': 'cargo-bike', 'Kick scooter': 'e-scooter',
    'Small car': 'sedan', 'Cargo bike': 'cargo-bike', 'Cargo van': 'cargo-van', 'Mystery rig': 'cargo-van',
  };
  for (const [name, artwork] of Object.entries(names)) {
    assert.equal(inferVehicleArtwork(name), artwork, name);
  }
});

test('merchant-selected artwork survives normalization for custom vehicle names', () => {
  assert.deepEqual(normalizeVehicles([{ name: 'Local delivery rig', fee: 25, artwork: 'pickup' }]),
    [{ name: 'Local delivery rig', fee: 25, artwork: 'pickup' }]);
  assert.equal(parseVehicleArtworkKey('unknown'), undefined);
  assert.deepEqual(normalizeVehicles([{ name: 'Cargo Van', fee: 0, artwork: 'unknown' }]),
    [{ name: 'Cargo Van', fee: 0 }]);
});
