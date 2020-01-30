var express = require('express');
var location_service = require('../../../lib/services').location
var forecast_service = require('../../../lib/services').forecast
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/', (request, response) => {
  var api_key = request.query.api_key
  database('users').where('api_key', api_key).first()
    .then(user => {
      if (user === undefined) {
        return response.status(404).json({error: 'Invalid API key'})
      } else {
        location_service(request.query.location)
          .then(coordinates => {
            return forecast_service(coordinates)
          })
          .then(forecast_data =>{
            return response.status(200).json(forecast_data)
          })
          .catch((error) => {
            response.status(500).json({ error })
          });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;

// fetchLocationAsync(search_location)
//   .then(coordinates => {
//     return fetchForecastAsync(coordinates)
//   })
//   .then(forecast => {
//     console.log(forecast.hourly.data)
//   })
//   .catch(reason => console.log(reason.message));
