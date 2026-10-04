// Server-side external HTTP boundary only. Actual Qalt routes/calculator stay intact.
const nativeFetch = global.fetch;
global.fetch = async (input, options) => {
  const url = String(input.url || input);
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
