var habitController = require('../habit/habitController.js');
var completionController = require('../habitCompletion/completionController.js');
var _ = require('underscore');
var Helper = require('../config/helpers.js');
var noteController = require('../note/noteController.js');


module.exports = {

  definePatch: function(request, response) {
    console.log("request.body: ", request.body);
  },

  createRecurringHabitCompletion: function() {

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

    var user = request.session.passport.user;

    habitController.getHabits(user).then(function(habits) {
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
    var user = request.session.passport.user;

    habitController.saveHabit(habit, user).then(function(habit){
      console.log("habit in createInitialHabit: ", habit);
      response.status(200).send(habit);
    });

  },

  createCompletion: function(request, response) {
    completionController.saveCompletion(request.body).then(function(completion){
      response.status(200).send(completion);
    });

  },

  fetchHabitCompletion: function(request, response) {
    console.log("request to getHabitCompletion heard!", request.query);
    var query = request.query;
    completionController.getHabitCompletion(query).then(function(habitCompletion){
      response.status(200).send(habitCompletion);
    });
  },

  createNote: function(request,response) {
    var note = request.body;
    noteController.saveNote(note).then(function(note){
      console.log("note saved in createNote: ", note);
      response.status(200).send(note);
    });
  },

  updateCompletion: function(request, response) {
    console.log("request.body in updateHabitStatus: ", request.body);
    
    completionController.saveExistingCompletion(request.body)
    .then(function(results){
      response.status(200).send(results);
    });
  }
};
