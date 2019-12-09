import request from 'request';

const geoCode = (address, callback) => {
  const mapBoxLocation = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${mapBoxLocation}.json?` +
    'access_token=pk.eyJ1Ijoiam9yZ2V0b3JyZXMiLCJhIjoiY2szcm9teXVwMDc3ZzNkbzRod2EzZzNxeiJ9.NsqGqJCifPbmNnNhtA2udw&' +
    'language=es&' +
    'limit=1';

    request({ url, json: true }, (error, { body }) => {
      const { message, features } = body;
      let requestError = undefined;
      let data = undefined;

      if (error) {
        requestError = error;
      } else if (message) {
        requestError = message;
      } else if (! features.length) {
        requestError = 'Ubicacion no valida';
      } else {
        data = {
          place_name: features[0].place_name_es,
          longitude: features[0].center[0],
          latitude: features[0].center[1]
        };
      }

      callback(requestError, data);
    });
};

export { geoCode };
