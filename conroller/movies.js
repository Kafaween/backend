const axios = require('axios');
const Movies = require('../models/Movies');
async function movies(req, res) {
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
}

module.exports = movies;
