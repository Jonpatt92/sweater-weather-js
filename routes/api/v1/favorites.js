var FavoriteForecast = require('../../../lib/pojos/favoriteForecast')
var locationService  = require('../../../lib/services/services').location
var forecastService  = require('../../../lib/services/services').forecast
var express          = require('express');
var router           = express.Router();

const environment    = process.env.NODE_ENV || 'development';
const configuration  = require('../../../knexfile')[environment];
const database       = require('knex')(configuration);

router.post('/', (request, response) => {
  var api_key = request.query.api_key
  var location = request.query.location
  database('users').where('api_key', api_key).first()
    .then(user => {
      if (user === undefined) {
        return response.status(404).json({error: 'Invalid API key'})
      } else {
        locationService(location)
          .then(coordinates => {
            database('favorites')
              .returning('location')
              .insert({ user_id: user.id,
                       location: location,
                            lat: coordinates.lat,
                            lng: coordinates.lng })
                .then(favoriteLocation => {
                  return response.status(200).json({message: `${favoriteLocation[0]} has been added to your favorites`})
                })
                .catch((error) => {
                  response.status(500).json({ error: error });
                });
          })
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

router.get('/', (request, response) => {
  var api_key = request.query.api_key

  database('users').where('api_key', api_key).first()
    .then(user => {
      if (user === undefined) {
        return response.status(404).json({error: 'Invalid API key'})
      } else {
        database('favorites')
          .where({user_id: user.id})
            .then(favoriteLocations => {
              const favoritesForecast = []
              locationsToReturn       = favoriteLocations.length
              locationsCompleted      = 0
              favoriteLocations.forEach(function(location) {
                let coords = { lat: location.lat, lng: location.lng }
                forecastService(coords)
                  .then(forecastData => {
                    var forecast = new FavoriteForecast(forecastData, location.location)
                    favoritesForecast.push(forecast);
                    locationsCompleted++
                    return favoritesForecast
                  })
                  .then(favoritesForecast => {
                    if (locationsCompleted === locationsToReturn) {
                      return response.status(200).json(favoritesForecast)
                      // Couldn't get favoritesForecast.push(forecast) to carry over
                      // outside of this promise loop, used a counter to return
                      // json object inside forEach loop instead
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                    response.status(500).json({ error })
                  });
              })
            })
            .catch((error) => {
              console.log(error)
              response.status(500).json({ error });
            });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;
