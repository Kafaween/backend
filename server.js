const { request, response } = require('express');
const express = require('express');
const weather = require('./data/weather.json');
const cors = require('cors');
const app = express();
const axios = require('axios');
require('dotenv').config();
const PORT = process.env.PORT;
app.use(cors());
const weathersatus = require('./models/weatherclass');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = process.env.WEATHER_API_URL;

app.get('/', (request, response) => {
  response.send('root');
});

app.get('/weather', async (request, response) => {
  let a = request.query.loc;
  console.log(request.query.lat);
  console.log(request.query.lon);
  const queryParams = {
    params: {
      lat: request.query.lat,
      lon: request.query.lon,
      key: WEATHER_API_KEY,
    },
  };
  console.log(queryParams);
  let whatever = await axios.get(
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=31.9515694&lon=35.92396`
  );
  console.log(whatever);
  // let b = a.split(',');

  // let loc = b[0];

  // var data = weather.find((element) => {
  //   return element.city_name.toLowerCase() === loc.toLowerCase();
  // });
  let status = res.data.map((e) => new weathersatus(e));
  console.log(status);
  // response.send(status);
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
