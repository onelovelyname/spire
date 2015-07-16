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

      // if (habit[0]) {
      //   console.log("habit id in saveHabit:", habit[0].id);
      // }

      // new Habit({'id': habit[0].habit_id}).fetch().then(function(found){
      //   if(!found) {
      //     new Habit({
      //       'action': habit.action,
      //       'quantity': habit.quantity,
      //       'timestamp': 'today'
      //     }).save()
      //     .then(function(habit) {
      //       console.log("Habit saved!", habit);
      //       resolve(habit);
      //     })
      //     .catch(function(error){
      //       reject(error);
      //     });
      //   }
      // });

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
        
      }

    });
  }

};
