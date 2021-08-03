const { request, response } = require('express');
const express = require('express');
const weather = require('./data/weather.json');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
app.use(cors());

app.get('/', (request, response) => {
  response.send('root');
});

app.get('/weather', (request, response) => {
  console.log(request.query);
  let a = request.query.loc;
  console.log(a);
  let b = a.split(',');

  let loc = b[0];
  console.log(loc);
  var data = weather.map((e) => {
    console.log(e.data);
    if (e.city_name == loc) {
      console.log(e.data[0].valid_date);
      console.log(e.data[0].weather.description);
      return [
        {
          date1: e.data[0].valid_date,
          date2: e.data[1].valid_date,
          date3: e.data[2].valid_date,

          weatherstate1: e.data[0].weather.description,
          weatherstate2: e.data[1].weather.description,
          weatherstate3: e.data[2].weather.description,
        },
      ];
    }
  });
  console.log(data);
  response.send(data);
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
