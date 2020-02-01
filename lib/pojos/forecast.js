var Current = require('./current')
var Daily = require('./daily')
var Hourly = require('./hourly')

class Forecast {
  constructor(forecastData, location) {
    this.location        = location
    this.currentForecast = new Current(forecastData.currently)
    this.hourlyForecast  = new Hourly(forecastData.hourly)
    this.dailyForecast   = new Daily(forecastData.daily)
  }

  formatData(){
    this.dailyForecast.formatDailyForecast(this.dailyForecast.data);
    this.hourlyForecast.formatHourlyForecast(this.hourlyForecast.data);
  }
}

module.exports = Forecast;
