class Daily {
  constructor(forecastData) {
    this.summary = forecastData.summary
    this.icon    = forecastData.icon
    this.data    = forecastData.data
  }

  formatDailyForecast(forecastData){
    const dailyForecast = forecastData.map(function(data) {
      let dayForecast   = {}
      dayForecast.time                   = data.time
      dayForecast.summary                = data.summary
      dayForecast.icon                   = data.icon
      dayForecast.sunriseTime            = data.sunriseTime
      dayForecast.sunsetTime             = data.sunsetTime
      dayForecast.precipIntensity        = data.precipIntensity
      dayForecast.precipIntensityMax     = data.precipIntensityMax
      dayForecast.precipIntensityMaxTime = data.precipIntensityMaxTime
      dayForecast.precipProbability      = data.precipProbability
      dayForecast.precipType             = data.precipType
      dayForecast.temperatureHigh        = data.temperatureHigh
      dayForecast.temperatureLow         = data.temperatureLow
      dayForecast.humidity               = data.humidity
      dayForecast.pressure               = data.pressure
      dayForecast.windSpeed              = data.windSpeed
      dayForecast.windGust               = data.windGust
      dayForecast.cloudCover             = data.cloudCover
      dayForecast.visibility             = data.visibility
      dayForecast.temperatureMin         = data.temperatureMin
      dayForecast.temperatureMax         = data.temperatureMax
      return dayForecast;
    })
    this.data = dailyForecast;
  }
}

module.exports = Daily;
