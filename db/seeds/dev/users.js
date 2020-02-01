
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(() => knex('users').del())
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'example@gmail.com', api_key: 'abcd1234efgh56789ijklmno'}
      ]);
    })
    .then(user => {
      return knex('favorites').insert([
        { location: 'San Diego,CA',
           user_id: 1,
               lat: 32.715738,
               lng: -117.1610838},
        { location: 'Golden,CO',
           user_id: 1,
               lat: 39.755543,
               lng: -105.2210997 }
      ])
    })
    .then(() => console.log('Seeding complete!' ))
    .catch(error => console.log(`Error seeding data: ${error}`));
};
