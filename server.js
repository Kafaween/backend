const { request, response } = require('express');
const express = require('express');
const weather = require('./data/weather.json');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
app.use(cors());
const weathersatus = require('./models/weatherclass');

app.get('/', (request, response) => {
  response.send('root');
});

app.get('/weather', (request, response) => {
  let a = request.query.loc;

  let b = a.split(',');

  let loc = b[0];

  var data = weather.find((element) => {
    return element.city_name.toLowerCase() === loc.toLowerCase();
  });
  let status = data.data.map((e) => new weathersatus(e));
  console.log(status);
  response.send(status);
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
