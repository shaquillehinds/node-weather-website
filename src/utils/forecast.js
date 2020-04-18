const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1e4f8e9e418ff17e564327dd1161d6de`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service.", undefined);
    } else if (!(body.cod === 200)) {
      callback(
        `Unable to gather weather info for those coordinates. Error Code: ${body.cod}`
      );
    } else {
      const data = {
        location: body.name,
        summary() {
          return `${body.weather[0].description} & it is currently ${this.temp} degrees celsius. It feels like ${this.feelsLike} degrees.`;
        },
      };
      data.temp = Math.round(body.main.temp - 273.15);
      data.maxTemp = Math.round(body.main.temp_max - 273.15);
      data.minTemp = Math.round(body.main.temp_min - 273.15);
      data.feelsLike = Math.round(body.main.feels_like - 275.15);
      callback(undefined, data);
    }
  });
};
module.exports = forecast;
