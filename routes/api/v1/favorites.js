var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/', (request, response) => {
  var api_key = request.query.api_key
  var location = request.query.location
  database('users').where('api_key', api_key).first()
    .then(user => {
      if (user === undefined) {
        return response.status(404).json({error: 'Invalid API key'})
      } else {
        database('favorites')
          .returning('location')
          .insert({user_id: user.id, location: location})
            .then(favorite_location => {
              return response.status(200).json({message: `${favorite_location[0]} has been added to your favorites`})
            })
            .catch((error) => {
              response.status(500).json({ error });
            });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;
