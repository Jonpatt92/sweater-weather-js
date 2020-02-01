class Hourly {
  constructor(forecastData) {
    this.summary = forecastData.summary
    this.icon    = forecastData.icon
    this.data    = forecastData.data
  }

  formatHourlyForecast(forecastData){
    const hourlyForecast = forecastData.map(function(data) {
      let hourForecast   = {}
      hourForecast.time                   = data.time
      hourForecast.summary                = data.summary
      hourForecast.icon                   = data.icon
      hourForecast.sunriseTime            = data.sunriseTime
      hourForecast.sunsetTime             = data.sunsetTime
      hourForecast.precipIntensity        = data.precipIntensity
      hourForecast.precipIntensityMax     = data.precipIntensityMax
      hourForecast.precipIntensityMaxTime = data.precipIntensityMaxTime
      hourForecast.precipProbability      = data.precipProbability
      hourForecast.precipType             = data.precipType
      hourForecast.temperatureHigh        = data.temperatureHigh
      hourForecast.temperatureLow         = data.temperatureLow
      hourForecast.humidity               = data.humidity
      hourForecast.pressure               = data.pressure
      hourForecast.windSpeed              = data.windSpeed
      hourForecast.windGust               = data.windGust
      hourForecast.cloudCover             = data.cloudCover
      hourForecast.visibility             = data.visibility
      hourForecast.temperatureMin         = data.temperatureMin
      hourForecast.temperatureMax         = data.temperatureMax
      return hourForecast;
    })
    this.data = hourlyForecast;
  }
}

module.exports = Hourly;
