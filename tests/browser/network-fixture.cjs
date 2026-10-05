// Server-side external HTTP boundary only. Actual Qalt routes/calculator stay intact.
const nativeFetch = global.fetch;
const nationalAreas = require('../fixtures/zip-areas-national.json');
global.fetch = async (input, options) => {
  const url = String(input.url || input);
  if (url.startsWith('https://tigerweb.geo.census.gov/')) {
    const zips=[...new URL(url).searchParams.get('where').matchAll(/'(\d{5})'/g)].map(match=>match[1]);
    if(zips.includes('88888'))return Response.json({error:{message:'Fixture boundary outage'}},{status:503});
    return Response.json({type:'FeatureCollection',features:zips.filter(zip=>zip!=='00000').map((zip,index)=>nationalAreas.features.find(feature=>feature.properties.ZCTA5===zip) || ({type:'Feature',properties:{ZCTA5:zip},geometry:{type:'Polygon',coordinates:[[[-118.4+index*.1,34],[-118.3+index*.1,34],[-118.3+index*.1,34.1],[-118.4+index*.1,34.1],[-118.4+index*.1,34]]]}}))});
  }
  if (url.startsWith('https://maps.googleapis.com/')) {
    const parsed = new URL(url);
    if (url.includes('geocode')) {
      const address = parsed.searchParams.get('address');
      const zip = address.includes('Outside') ? '99999' : address.includes('Dropoff') ? '90002' : '90001';
      return Response.json({status:'OK',results:[{formatted_address:address,place_id:address,address_components:[{types:['postal_code'],long_name:zip,short_name:zip}]}]});
    }
    return Response.json({status:'OK',rows:[{elements:[{status:'OK',distance:{value:16093.44,text:'10 mi'},duration:{value:1200,text:'20 min'}}]}]});
  }
  if (url.startsWith('https://api.stripe.com/')) {
    const form = new URLSearchParams(options?.body || '');
    (await import('node:fs')).writeFileSync(process.env.QALT_FIXTURE_CHECKOUT, JSON.stringify(Object.fromEntries(form)));
    return Response.json({id:'cs_test_fixture',object:'checkout.session',url:'https://checkout.stripe.com/c/pay/fixture',payment_intent:'pi_fixture'});
  }
  if (url.startsWith('https://api.resend.com/')) return Response.json({id:'fixture-email'});
  return nativeFetch(input, options);
};
