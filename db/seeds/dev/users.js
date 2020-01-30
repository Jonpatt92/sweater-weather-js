
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'example@gmail.com', api_key: 'abcd1234efgh56789ijklmno'},
      ]);
    })
    .then(() => console.log('Seeding complete!' ))
    .catch(error => console.log(`Error seeding data: ${error}`));
};
