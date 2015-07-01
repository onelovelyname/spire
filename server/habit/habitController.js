var Habit = require('./habitModel');
module.exports = {
  
  saveHabit: function(habit) {
    return new Promise(function(resolve, reject) {
      // save habit
      new Habit({
        'action': habit.action,
        'quantity': habit.quantity,
        'time': habit.time
      }).save({}, {method: 'insert'})
        .then(function(habit){
          resolve(habit);
        })
        .catch(function(error){
          reject(error);
        });
    });
  }

};