class weather {
  constructor(d) {
    this.date = d.valid_date;
    this.description = d.weather.description;
  }
}

module.exports = weather;
