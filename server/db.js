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
      habit.timestamp('timestamp', 30);
    }).then(function(table) {
      console.log("Created Habits Table", table);

      db.knex.schema.hasTable('habits_completion').then(function(exists){
        if(!exists) {
          db.knex.schema.createTable('habits_completion', function(habitCompletion){
            habitCompletion.increments('id').primary();
            habitCompletion.integer('habit_id');
            habitCompletion.date('start_date');
            habitCompletion.date('end_date');
            habitCompletion.float('status');
          }).then(function(table){
            console.log('Created Habits Completion Table', table);
          });
        }
      });
    });
  }
});

module.exports = db;
