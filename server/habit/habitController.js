var Habit = require('./habitModel');
module.exports = {
  
  getHabits: function() {
    
    return new Promise(function(resolve, reject) {
      
      new Habit().fetchAll({
        withRelated: ['completions']
      })
      .then(function(habits) {

        habits.forEach(function(habit) {
          var completions = habit.related('completions').models;
        });

        resolve(habits);
      
      }).catch(function(error) {
        reject(error);
      });

    });
  
  },

  saveHabit: function(habit) {

    return new Promise(function(resolve, reject) {

      if (habit[0] === undefined) {

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
        
      } else {

        var editedHabit = {
          attributes: {
            action: habit.action,
            quantity: habit.quantity,
            id: habit[0].habit_id
          },
          id: habit[0].habit_id
        };

        resolve(editedHabit);
      
      }
    });
  }

};
