var Habit = require('./habitModel');
module.exports = {
  
  getHabits: function() {
    
    return new Promise(function(resolve, reject) {
      
      new Habit().fetchAll({
        withRelated: ['completions']
      })
      .then(function(habits) {
        //console.log('habits: ', habits.models);
        console.log("related: ", habits.models[0].related('completions').models[0].attributes);
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
        'timestamp': 'today',
      }).save({}, {method: 'insert'})
        .then(function(habit){
          console.log("Habit saved!", habit);
          resolve(habit);
        })
        .catch(function(error){
          reject(error);
        });

    });
  }

};
