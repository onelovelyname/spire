var habitController = require('../habit/habitController.js');

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

  createHabits: function(request, response) {
    console.log('createHabits request.body', request.body);
    var habit = request.body;
    habitController.saveHabit(habit).then(function(habit) {
      console.log("Saved habit!");
      response.status(200).send(habit);
    })
    .catch(function(error){
      console.log("Did not save habit, check for errors", error);
    });
  }

};
