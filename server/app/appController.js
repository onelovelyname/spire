var habitController = require('../habit/habitController.js');

module.exports = {
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