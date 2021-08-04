class Movies {
  constructor(obj) {
    (this.title = obj.title),
      (this.overview = obj.overview),
      (this.vote_average = obj.vote_average),
      (this.vote_count = obj.vote_count),
      (this.poster_path = obj.poster_path),
      (this.popularity = obj.popularity),
      (this.release_date = obj.release_date);
  }
}
module.exports = Movies;
