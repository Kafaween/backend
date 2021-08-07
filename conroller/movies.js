const axios = require('axios');
const Movies = require('../models/Movies');
let MyMemory = {};
async function movies(req, res) {
  const searchQuery = req.query.loc;
  console.log(searchQuery);

  const urlMovies = `${process.env.MOVIES_API_URL}?api_key=${process.env.MOVIES_API_KEY}&page=1&query=${searchQuery}`;

  if (MyMemory[searchQuery] !== undefined) {
    console.log('cash hit ');
    res.send(MyMemory[searchQuery]);
  } else {
    axios
      .get(urlMovies)
      .then((result) => {
        const movieArray = [];
        result.data.results.forEach((obj) => {
          let moviesData = new Movies(obj);
          movieArray.push(moviesData);
        });

        MyMemory[searchQuery] = movieArray;
        // console.log(MyMemory[searchQuery]);
        console.log('cash miss');
        res.send(movieArray);
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
}

module.exports = movies;
