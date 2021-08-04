const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const weather = require('./data/weather.json');

const weathersatus = require('./models/weatherclass');
const Movies = require('./models/Movies');
app.use(cors());
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/weather', async (req, res) => {
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
});

app.get('/movies', async (req, res) => {
  let searchQuery = req.query.loc;
  const urlMovies = `${process.env.MOVIES_API_URL}?api_key=${process.env.MOVIES_API_KEY}&page=1&query=${searchQuery}`;

  axios
    .get(urlMovies)
    .then((result) => {
      const movieArray = [];
      result.data.results.forEach((obj) => {
        let moviesData = new Movies(obj);
        movieArray.push(moviesData);
      });
      res.send(movieArray);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.listen(process.env.PORT, () => {});
