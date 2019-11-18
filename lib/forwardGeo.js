import opencage from 'opencage-api-client';

//const query = {q: location, key: oc_key}
const forwardGeo = q => opencage.geocode(q).then(data => {
  console.log(JSON.stringify(data));
  if (data.status.code == 200) {
    if (data.results.length > 0) {
      var place = data.results[0];
      // console.log(place.formatted);
      // console.log(place.geometry);
      // console.log(place.annotations.timezone.name);
      return place.geometry;
    }
  } else if (data.status.code == 402) {
    console.log('hit free-trial daily limit');
    console.log('become a customer: https://opencagedata.com/pricing');
    return null;
  } else {
    // other possible response codes:
    // https://opencagedata.com/api#codes
    console.log('error', data.status.message);
    return null;
  }
}).catch(error => {
  console.log('error', error.message);
  return null;
});

// ... prints
// Theresienhöhe 11, 80339 Munich, Germany
// { lat: 48.1341651, lng: 11.5464794 }
// Europe/Berlin
export default forwardGeo