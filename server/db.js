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

db.plugin('registry');

db.knex.schema.hasTable('users').then(function(exists) {
  if(!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.integer('github_id', 20);
      user.string('name', 30);
      user.string('email', 30);
    }).then(function(table) {
      console.log("Created Users Table");
      
      db.knex.schema.hasTable('habits').then(function(exists){
        if(!exists) {
          db.knex.schema.createTable('habits', function(habit){
            habit.increments('id').primary();
            habit.string('action', 100);
            habit.integer('quantity', 10);
            habit.timestamp('timestamp', 30);
          }).then(function(table) {
            console.log("Created Habits Table", table);

            db.knex.schema.hasTable('completions').then(function(exists){
              if(!exists) {
                db.knex.schema.createTable('completions', function(habitCompletion){
                  habitCompletion.increments('id').primary();
                  habitCompletion.integer('habit_id').references('habits.id');
                  habitCompletion.date('start_date');
                  habitCompletion.date('end_date');
                  habitCompletion.float('status');
                }).then(function(table){
                  console.log('Created Completions Table', table);
                });
              }
            });
          });
        }
      });
    });
  }
});


module.exports = db;
