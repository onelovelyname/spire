var HabitCompletion = require('./habitCompletionModel');
var Habit = require('../habit/habitModel.js');
var Helper = require('../config/helpers.js');

module.exports = {

  saveCompletion: function(habitStatus, habitModel) {

    return new Promise(function(resolve, reject) {

      new HabitCompletion({
        'habit_id': habitModel.id,
        'start_date': Helper.getDay("today"),
        'end_date': Helper.getDay("tomorrow"),
        'status': habitStatus
      }).save({}, {method: 'insert'})

      .then(function(completion) {
        console.log('completion in saveCompletion', completion);
        resolve(completion);
      })

      .catch(function(error) {
        console.log("error in saveCompletion: ", error);
        reject(error);
      });

    });

  },

  saveCompletions: function (request, habit) {

    var context = this;

    var habitCompletionsCollection = request.completions;
    console.log("habitCompletionsCollection in saveCompletions: ", habitCompletionsCollection);

    var mappedHabitCompletions = habitCompletionsCollection.map(function(habitCompletionModel) {
          return context.saveCompletion(habitCompletionModel.status, habit);
        });

    return new Promise(function(resolve, reject) {

      Promise.all(mappedHabitCompletions).then(function(results){
        console.log("results in saveCompletions: ", results);
        resolve(results);
      })
      .catch(function(error) {
        console.log("error in saveCompletions: ", error);
        reject(error);
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

  }

};
