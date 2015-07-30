var pg = require('pg');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
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
      //user.increments('id');
      user.integer('github_id', 20).primary();
      user.string('name', 30);
      user.string('email', 30);
    }).then(function(table) {
      console.log("Created Users Table");
      
      db.knex.schema.hasTable('habits').then(function(exists){
        if(!exists) {
          db.knex.schema.createTable('habits', function(habit){
            habit.increments('id').primary();
            habit.integer('user_github_id', 20).references('users.github_id');
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
                  habitCompletion.timestamp('start_date', 30);
                  habitCompletion.timestamp('end_date', 30);
                  habitCompletion.float('status');
                }).then(function(table){
                  console.log('Created Completions Table', table);

                  db.knex.schema.hasTable('notes').then(function(exists){
                    if(!exists) {
                      db.knex.schema.createTable('notes', function(note){
                        note.increments('id').primary();
                        note.integer('habit_id').references('habits.id');
                        note.string('text');
                        note.timestamp('start_date', 30);
                      }).then(function(table){
                        console.log('Created Notes Table', table);
                      });
                    }
                  });

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
