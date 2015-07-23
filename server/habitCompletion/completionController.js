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
<<<<<<< HEAD

    });

  },

  saveCompletions: function (request, habit) {

    var context = this;


    var habitCompletionsCollection = request.completions.models;
    // console.log("habitCompletionsCollection in saveCompletions: ", habitCompletionsCollection);
    debugger;

    var mappedHabitCompletions = habitCompletionsCollection.map(function(habitCompletionModel) {
          return context.saveCompletion(habitCompletionModel.status, habit);
        });

    return new Promise(function(resolve, reject) {

      Promise.all(mappedHabitCompletions).then(function(results){
        //console.log("results in saveCompletions: ", results);
        resolve(results);
      })
      .catch(function(error) {
        console.log("error in saveCompletions: ", error);
        reject(error);
      });
=======
>>>>>>> fix/updateHabitCreation
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
