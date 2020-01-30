// Build node-fetch service object here
const fetch = require('node-fetch');
const dotenv = require('dotenv');
var keys = dotenv.config()['parsed'];
var search_location = 'denver,co';

// var google_url =`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${keys['GOOGLE_API_KEY']}`;

async function fetchLocationAsync(location) {
  try {
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${keys['GOOGLE_API_KEY']}`);
    let location_data = await response.json();
    return location_data.results[0].geometry.location;
  } catch(err) {
    console.log(err);
  }
}

async function fetchForecastAsync(coordinates) {
  try {
    let response = await fetch(`https://api.darksky.net/forecast/${keys['FORECAST_API_KEY']}/${coordinates.lat},${coordinates.lng}?exclude=minutely,alerts,flags`);
    let forecast_data = await response.json();
    return forecast_data;
  } catch(err) {
    console.log(err);
  }
}

fetchLocationAsync(search_location)
  .then(coordinates => {
    return fetchForecastAsync(coordinates)
  })
  .then(forecast => {
    console.log(forecast.hourly.data)
  })
  .catch(reason => console.log(reason.message));
