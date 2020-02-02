var Current = require('./current')
class FavoriteForecast {
  constructor(forecastData, location) {
    this.location        = location
    this.currentForecast = new Current(forecastData.currently)
  }

}

module.exports = FavoriteForecast;
