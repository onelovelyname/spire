var HabitCompletion = require('./habitCompletionModel');
var Habit = require('../habit/habitModel.js');
var Helper = require('../config/helpers.js');

module.exports = {

  saveCompletion: function(completion) {

    console.log("completion in saveCompletion: ", completion);
    return new Promise(function(resolve, reject) {

      new HabitCompletion({'habit_id': completion.habit_id, 'start_date': Helper.getDay("today")})
        .fetch().then(function(found){

          if (!found) {

            new HabitCompletion({
              'habit_id': completion.habit_id,
              'start_date': Helper.getDay("today"),
              'end_date': Helper.getDay("tomorrow"),
              'status': completion.status
            }).save({}, {method: 'insert'})
            .then(function(completion) {
              console.log('completion in saveCompletion', completion);
              resolve(completion);
            })
            .catch(function(error) {
              console.log("error in saveCompletion: ", error);
              reject(error);
            });

          }
        });
    });
  },


  getHabitCompletion: function(query) {

    return new Promise(function(resolve, reject) {

      new HabitCompletion().query({ where: { habit_id: query.habit_id } })
        .fetch()
        .then(function(habitCompletion) {
          resolve(habitCompletion);
        })
        .catch(function(error) {
          console.error("Could not fetch habitCompletion for that habit id");
        });

    });

  },

  saveExistingCompletion: function(completion) {
    console.log("inside of saveExistingCompletion");

    return new Promise(function(resolve, reject) {

      new HabitCompletion({
        'habit_id': completion.habit_id,
        'id': completion.id
      }).save({ status: completion.status }, { method: 'update', patch: true }).then(function(model) {
        console.log("Saved completion to the db from saveExistingCompletion!!! ", model);
        resolve(model);
      })
      .catch(function(error) {
        console.error("Could not update completion for that habit in the db");
      });
    });
  }

};
