import assert from 'node:assert/strict';
import test from 'node:test';
import sharp from 'sharp';
import { safeWidgetFavicon, widgetPageMetadata, DEFAULT_WIDGET_FAVICON } from '../src/lib/widget-favicon.ts';
import { normalizeFaviconImage } from '../src/lib/favicon-image.ts';
const icon='https://storage.googleapis.com/qalt-site-production.firebasestorage.app/uploads/merchantA/favicon-00000000-0000-4000-8000-000000000001.png';
test('favicon accepts only normalized icons from the owning merchant',()=>{
  assert.equal(safeWidgetFavicon(icon,'merchantA'),icon);
  for(const value of [icon.replace('/merchantA/','/merchantB/'),icon+'?tracking=1',icon.replace('.png','.svg'),'javascript:alert(1)','/images/test.png',icon.replace('storage.googleapis.com','evil.example'),null])assert.equal(safeWidgetFavicon(value,'merchantA'),null);
});
test('hosted form metadata uses merchant icon and title with Qalt fallback',()=>{
  const company={id:'merchantA',name:'Merchant A'};
  assert.deepEqual(widgetPageMetadata(company,{faviconUrl:icon,companyNameText:' My Brand '}),{title:'My Brand | Delivery Quote',icons:{icon,shortcut:icon,apple:icon}});
  assert.equal(widgetPageMetadata(company,{faviconUrl:null}).icons.icon,DEFAULT_WIDGET_FAVICON);
  assert.equal(widgetPageMetadata(company,{faviconUrl:icon.replace('/merchantA/','/foreign/')}).icons.icon,DEFAULT_WIDGET_FAVICON);
});
test('favicon normalizer fits full artwork in a transparent 256px square and strips metadata',async()=>{
  const source=await sharp({create:{width:100,height:50,channels:4,background:{r:220,g:30,b:40,alpha:1}}}).withMetadata().png().toBuffer();
  const normalized=await normalizeFaviconImage(source);
  const metadata=await sharp(normalized).metadata();
  assert.equal(metadata.format,'png');assert.equal(metadata.width,256);assert.equal(metadata.height,256);assert.equal(metadata.exif,undefined);assert.equal(metadata.icc,undefined);
  const {data}=await sharp(normalized).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  assert.equal(data[3],0);assert.equal(data[(128*256+128)*4+3],255);
});
test('favicon normalizer converts JPEG and rejects corrupt images',async()=>{
  const jpeg=await sharp({create:{width:32,height:32,channels:3,background:'#123456'}}).jpeg().toBuffer();
  assert.equal((await sharp(await normalizeFaviconImage(jpeg)).metadata()).format,'png');
  await assert.rejects(normalizeFaviconImage(Buffer.from('invalid image')));
});
