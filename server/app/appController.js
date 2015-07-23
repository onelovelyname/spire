var habitController = require('../habit/habitController.js');
var completionController = require('../habitCompletion/completionController.js');
var _ = require('underscore');
var Helper = require('../config/helpers.js');
var noteController = require('../note/noteController.js');


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
    // console.log('createHabits request.session', request.session);
    var habit = request.body;
    var user = request.session.passport.user;
    habitController.saveHabit(habit, user).then(function(habit){
      console.log("habit in createInitialHabit: ", habit);
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
//    completionController.saveExistingCompletion(habitModelId, completion.id, completion.status)
    .then(function(results){
      console.log("completion results: ", results.attributes);
      response.status(200).send(results);
    });
  }
};
