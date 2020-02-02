// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_weather_js_development',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_weather_js_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://rvtohahmsrnbst:8f9576c9644891527e4d4ada5b0b8a21314a9976ea268724b6f47087ccc214de@ec2-54-174-221-35.compute-1.amazonaws.com:5432/dolu803c50o4b',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
