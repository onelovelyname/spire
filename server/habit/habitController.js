var Habit = require('./habitModel');
module.exports = {
  
  getHabits: function() {
    
    return new Promise(function(resolve, reject) {
      
      new Habit().fetchAll()
      .then(function(habits) {
        resolve(habits);
      }).catch(function(error) {
        reject(error);
      });

    });
  
  },

  saveHabit: function(habit) {

    return new Promise(function(resolve, reject) {

      new Habit({
        'action': habit.action,
        'quantity': habit.quantity,
        'time': habit.time,
        'status': habit.status || 0,
        'timestamp': 'today'
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
