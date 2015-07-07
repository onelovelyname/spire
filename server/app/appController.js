var habitController = require('../habit/habitController.js');
var habitCompletionController = require('../habitCompletion/habitCompletionController.js');

module.exports = {
  
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
      habitCompletionController.saveCompletions(request.body, habit).then(function(habitCompletion){
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
    habitCompletionController.getHabitCompletion(query).then(function(habitCompletion){
      response.status(200).send(habitCompletion);
    });
  },

  // createHabitCompletion: function(request, response) {
  //   var habitCompletion = request.body;
  //   console.log('createHabitCompletion request.body', habitCompletion);
  //   habitCompletionController.saveHabitCompletion(habitCompletion).then(function(habitCompletion) {
  //     console.log("Saved habit completion!");
  //     response.status(200).send(habitCompletion);
  //   })
  //   .catch(function(error) {
  //     console.log("Did not save habitCompletion, check for errors", error);
  //   });
  // }
};
