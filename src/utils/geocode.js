const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.API_TOKEN}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search.", undefined);
    } else {
      const data = {
        long: body.features[0].geometry.coordinates[0],
        lat: body.features[0].geometry.coordinates[1],
        location: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
