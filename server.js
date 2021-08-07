const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const weather = require('./conroller/Forcast');
const movies = require('./conroller/movies');

app.use(cors());
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('hi developer');
});

app.get('/weather', weather);

//http://localhost:8000/movies?loc=amman
app.get('/movies', movies);

app.listen(process.env.PORT, () => {});
