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
      const array = [...body.weather[0].description];
      array[0] = array[0].toUpperCase();
      const string = array.join("");
      const data = {
        location: body.name,
        summary() {
          return `${this.description} & it is currently ${this.temp}° celsius. It feels like ${this.feelsLike}°. The minimum temperature today is ${this.minTemp}° and the maximum temperature today is ${this.maxTemp}°.`;
        },
      };
      data.temp = Math.round(body.main.temp - 273.15);
      data.maxTemp = Math.round(body.main.temp_max - 273.15);
      data.minTemp = Math.round(body.main.temp_min - 273.15);
      data.feelsLike = Math.round(body.main.feels_like - 275.15);
      data.description = string;
      callback(undefined, data);
    }
  });
};
module.exports = forecast;
