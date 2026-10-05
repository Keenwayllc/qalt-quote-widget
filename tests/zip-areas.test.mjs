import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { censusZipAreaUrl, normalizeZipAreas, parseZipAreaQuery, zipAreaBounds } from '../src/lib/zip-areas.ts';
const polygon={type:'Polygon',coordinates:[[[-118,34],[-117,34],[-117,35],[-118,34]]]};
const collection=(zip,geometry=polygon)=>({type:'FeatureCollection',features:[{properties:{ZCTA5:zip},geometry}]});
test('ZIP query preserves leading zeros, sorts and deduplicates',()=>assert.deepEqual(parseZipAreaQuery('91601,00501,91601'),['00501','91601']));
test('ZIP query rejects malformed input, injection and excessive requests',()=>{for(const value of ['',"91601' OR 1=1",'1234','123456','91601,',Array(21).fill('91601').join(',')])assert.throws(()=>parseZipAreaQuery(value))});
test('boundary query uses fixed Census origin and geographic coordinates',()=>{const u=new URL(censusZipAreaUrl(['91601','90024']));assert.equal(u.hostname,'tigerweb.geo.census.gov');assert.equal(u.searchParams.get('outSR'),'4326');assert.equal(u.searchParams.get('where'),"ZCTA5 IN ('90024','91601')")});
test('mapped polygons retain all rings, including holes and islands',()=>{const geometry={type:'MultiPolygon',coordinates:[[polygon.coordinates[0],polygon.coordinates[0]],polygon.coordinates]};const a=normalizeZipAreas(collection('91601',geometry),['91601']);assert.deepEqual(a.features[0].geometry,geometry);assert.equal(a.features[0].properties.zip,'91601')});
test('missing ZIP shapes are returned empty, never fabricated',()=>{assert.deepEqual(normalizeZipAreas({type:'FeatureCollection',features:[]},['00000']).features,[]);assert.deepEqual(normalizeZipAreas(collection('90024'),['91601']).features,[])});
test('invalid and unclosed geometries and provider errors fail clearly',()=>{for(const value of [{error:{message:'Failure'}},collection('91601',{type:'Point',coordinates:[-118,34]}),collection('91601',{type:'Polygon',coordinates:[[[NaN,34],[-117,34],[-117,35],[-118,34]]]}),collection('91601',{type:'Polygon',coordinates:[[[0,0],[1,0],[1,1],[0,1]]]})])assert.throws(()=>normalizeZipAreas(value,['91601']))});

test('bounds fit mainland and Hawaii without state restrictions',()=>{const a=normalizeZipAreas(collection('96813',{type:'Polygon',coordinates:[[[-157.9,21.2],[-157.8,21.2],[-157.8,21.4],[-157.9,21.2]]]}),['96813']);assert.deepEqual(zipAreaBounds(a),{south:21.2,north:21.4,west:-157.9,east:-157.8})});
test('date-line bounds use the short arc for Alaska instead of the whole globe',()=>{const a=normalizeZipAreas(collection('99546',{type:'Polygon',coordinates:[[[179,52],[-179,52],[-179,53],[179,52]]]}),['99546']);const b=zipAreaBounds(a);assert.equal(b.west,179);assert.equal(b.east,-179);assert.equal((b.east-b.west+360)%360,2);assert.equal(zipAreaBounds({type:'FeatureCollection',features:[]}),null)});

test('real Census polygons validate for Alaska, Hawaii, Northeast, Texas and Florida',()=>{const fixture=JSON.parse(readFileSync(new URL('./fixtures/zip-areas-national.json',import.meta.url)));for(const zip of ['99701','99546','96720','96813','02108','10001','77002','33131']){const areas=normalizeZipAreas(fixture,[zip]);assert.equal(areas.features.length,1,zip);const bounds=zipAreaBounds(areas);assert.ok(bounds && bounds.north>=bounds.south,zip);if(zip==='99701')assert.ok(bounds.south>60);if(zip==='96813')assert.ok(bounds.west<-150 && bounds.north<23)}});
