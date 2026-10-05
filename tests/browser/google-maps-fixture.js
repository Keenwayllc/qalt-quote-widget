// Served in place of Google's JS at the network boundary. No Qalt UI is mocked.
(() => {
  const result = address => ({formatted_address:address,address_components:[{types:['postal_code'],long_name:address.includes('Outside')?'99999':address.includes('Dropoff')?'90002':'90001'}]});
  const inert = class { constructor(element) { this.map=element;this.element=element; if(element?.setAttribute){element.setAttribute('data-fixture-map','ready');element.style.background='#dce7e1';} } setOptions(){} setMap(){} setDirections(){} fitBounds(bounds){this.element?.setAttribute?.("data-fixture-bounds",JSON.stringify(bounds.points || bounds))} setCenter(){} setZoom(){} setPosition(){} setIcon(){} setLabel(){} setVisible(){} setClickable(){} setDraggable(){} setAnimation(){} setCursor(){} setOpacity(){} setTitle(){} setZIndex(){} getMap(){return this.map} addListener(){return {remove(){}}} };
  const maps = {
    version:'fixture',
    LatLngBounds:class {constructor(){this.points=[]} extend(point){this.points.push(point);return this}},
    Data:class {
      constructor({map}){this.map=map;this.features=[]}
      setStyle(style){this.style=style}
      addGeoJson(areas){
        this.features=areas.features.map(feature=>({getGeometry:()=>({forEachLatLng:fn=>{const visit=c=>{if(typeof c[0]==='number')fn({lat:c[1],lng:c[0]});else c.forEach(visit)};visit(feature.geometry.coordinates)}})}));
        const el=this.map.element;el.setAttribute('data-fixture-zip-areas',areas.features.map(f=>f.properties.zip).join(','));el.setAttribute('data-fixture-fill',this.style.fillColor);el.setAttribute('data-fixture-opacity',String(this.style.fillOpacity));
        return this.features;
      }
      setMap(map){if(!map && this.map?.element)this.map.element.removeAttribute('data-fixture-zip-areas');this.map=map}
    },
    Map:inert,Marker:inert,DirectionsRenderer:inert,
    event:{addListener:()=>({remove(){}}),removeListener(){},clearInstanceListeners(){}},
    places:{AutocompleteService:class {getPlacePredictions({input},callback){callback([{description:`${input} fixture address`,place_id:input}], 'OK')}},AutocompleteSessionToken:class{}},
    Geocoder:class {geocode({address},callback){callback([result(address)],'OK')}},
    DistanceMatrixService:class {getDistanceMatrix(options,callback){callback({rows:[{elements:[{status:'OK',distance:{value:16093.44},duration:{value:1200}}]}]},'OK')}},
    DirectionsService:class {route(options,callback){callback({routes:[{legs:[{start_address:options.origin,end_address:options.destination,distance:{value:16093.44},duration:{value:1200},start_location:{lat:()=>34,lng:()=>-118},end_location:{lat:()=>34.1,lng:()=>-118.1}}]}]},'OK')}},
    TravelMode:{DRIVING:'DRIVING'},UnitSystem:{IMPERIAL:1},SymbolPath:{CIRCLE:0},ControlPosition:{RIGHT_BOTTOM:0},
    importLibrary:async()=>maps,
  };
  window.google = window.google || {};
  window.google.maps = Object.assign(window.google.maps || {}, maps);
  const callback=new URL(document.currentScript.src).searchParams.get('callback');
  const ready = callback?.split('.').reduce((object,key)=>object?.[key], window);
  if(typeof ready === 'function')ready();
})();
