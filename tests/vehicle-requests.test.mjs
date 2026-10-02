import assert from 'node:assert/strict';
import test from 'node:test';
import { parseVehicleRequest } from '../src/lib/vehicle-requests.ts';

test('vehicle requests need a name and a real description', () => {
  assert.ok('error' in parseVehicleRequest({ vehicleName: 'X', description: 'A long enough description' }));
  assert.ok('error' in parseVehicleRequest({ vehicleName: 'Hotshot', description: 'short' }));
  assert.deepEqual(parseVehicleRequest({ vehicleName: '  Hotshot   pickup ', description: 'Dually pickup pulling a 40 ft gooseneck flatbed.' }),
    { vehicleName: 'Hotshot pickup', description: 'Dually pickup pulling a 40 ft gooseneck flatbed.', referenceUrl: null });
});

test('reference links must be http(s)', () => {
  const base = { vehicleName: 'Hotshot', description: 'Dually pickup with a gooseneck trailer.' };
  assert.ok('error' in parseVehicleRequest({ ...base, referenceUrl: 'javascript:alert(1)' }));
  assert.ok('error' in parseVehicleRequest({ ...base, referenceUrl: 'not a url' }));
  assert.equal(parseVehicleRequest({ ...base, referenceUrl: 'https://example.com/truck' }).referenceUrl, 'https://example.com/truck');
});
