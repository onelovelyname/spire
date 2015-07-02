var pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING || {
    host: '127.0.0.1',
    port: 5432,
    user: "",
    password: "",
    database: "spire_db",
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('habits').then(function(exists){
  if(!exists) {
    db.knex.schema.createTable('habits', function(habit){
      habit.increments('id').primary();
      habit.string('action', 100);
      habit.integer('quantity', 10);
      habit.string('time', 10);
    }).then(function(table) {
      console.log("Created Habits Table", table);
    });
  }
});

module.exports = db;