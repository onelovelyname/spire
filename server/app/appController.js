var habitController = require('../habit/habitController.js');
var completionController = require('../habitCompletion/completionController.js');
var _ = require('underscore');

module.exports = {

  createRecurringHabitCompletion: function() {
    // first, fetch habits 
    habitController.getHabits().then(function(habits){

      var mappedHabits = habits.map(function(habit){
        console.log("habit: ", habit.attributes);
        return completionController.saveCompletion(0, habit.attributes);
      });

      Promise.all(mappedHabits).then(function(results){
        console.log("results in createRecurringHabitCompletion: ", results);
      })
      .catch(function(error) {
        console.log("error in createRecurringHabitCompletion", error);
      });

    })
    .catch(function(error) {
      console.log("Did not fetch habits from db in createRecurringHabitCompletion: ", error);
    });
  },
  
  fetchHabits: function(request, response) {
    habitController.getHabits().then(function(habits) {
      console.log("Fetched habits!");
      response.status(200).send(habits);
    })
    .catch(function(error) {
      console.log("Did not fetch habits from db, check for errors", error);
    });
  },

  createInitialHabit: function(request, response) {
    console.log('createHabits request.body', request.body);

    var habit = request.body;
    habitController.saveHabit(habit).then(function(habit){
      completionController.saveCompletions(request.body, habit).then(function(habitCompletion){
        console.log("saved habit and habitCompletion to db!!", habitCompletion);
        response.status(200).send(habitCompletion);
      })
      .catch(function(error){
        console.log("Did not save habit or habitCompletion to db, check for errors: ", error);
      });
    });
  },

  fetchHabitCompletion: function(request, response) {
    console.log("request to getHabitCompletion heard!", request.query);
    var query = request.query;
    completionController.getHabitCompletion(query).then(function(habitCompletion){
      response.status(200).send(habitCompletion);
    });
  }
};
