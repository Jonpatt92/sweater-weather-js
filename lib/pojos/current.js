class Current {
  constructor(forecastData) {
    this.summary           = forecastData.summary
    this.icon              = forecastData.icon
    this.precipIntensity   = forecastData.precipIntensity
    this.precipProbability = forecastData.precipProbability
    this.temperature       = forecastData.temperature
    this.humidity          = forecastData.humidity
    this.pressure          = forecastData.pressure
    this.windSpeed         = forecastData.windSpeed
    this.windGust          = forecastData.windGust
    this.windBearing       = forecastData.windBearing
    this.cloudCover        = forecastData.cloudCover
    this.visibility        = forecastData.visibility
  }
}

module.exports = Current;
