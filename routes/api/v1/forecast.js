var Forecast        = require('../../../lib/pojos/forecast')
var locationService = require('../../../lib/services/services').location
var forecastService = require('../../../lib/services/services').forecast
var express         = require('express');
var router          = express.Router();

const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database      = require('knex')(configuration);

router.get('/', (request, response) => {
  var api_key = request.query.api_key
  database('users').where('api_key', api_key).first()
    .then(user => {
      if (user === undefined) {
        return response.status(404).json({error: 'Invalid API key'})
      } else {
        locationService(request.query.location)
          .then(coordinates => {
            return forecastService(coordinates)
          })
          .then(forecastData => {
            var formattedForecast = new Forecast(forecastData, request.query.location);
            formattedForecast.formatData();
            return response.status(200).json(formattedForecast)
          })
          .catch((error) => {
            console.log(error)
            response.status(500).json({ error })
          });
      }
    })
    .catch((error) => {
      console.log(error)
      response.status(500).json({ error });
    });
});

module.exports = router;
