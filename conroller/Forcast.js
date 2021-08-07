const axios = require('axios');
const weathersatus = require('../models/weatherclass');
async function weather(req, res) {
  let latitude = req.query.lat;
  let longitude = req.query.lon;
  const urlForecast = `${process.env.WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}`;
  axios
    .get(urlForecast)
    .then((result) => {
      const arrOfDays = [];
      result.data.data.forEach((obj) => {
        let weatherDay = new weathersatus(obj);
        arrOfDays.push(weatherDay);
      });
      res.send(arrOfDays);
    })
    .catch((err) => {
      res.send(err.message);
    });
}

module.exports = weather;
