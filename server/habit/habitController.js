var Habit = require('./habitModel');
module.exports = {
  
  getHabits: function(user) {
      
    console.log("user in getHabits: ", user);

    return new Promise(function(resolve, reject) {
      
      if (user) {

        new Habit().query({ where: { user_github_id: user.github_id } })
        .fetchAll({ withRelated: ['completions'] })
        .then(function(habits) {

          habits.forEach(function(habit) {
            var completions = habit.related('completions').models;
          });

          resolve(habits);
        
        }).catch(function(error) {
          reject(error);
        });

      } else {

        new Habit().fetchAll({ withRelated: ['completions'] })
        .then(function(habits) {

          habits.forEach(function(habit) {
            var completions = habit.related('completions').models;
          });

          resolve(habits);
        
        }).catch(function(error) {
          reject(error);
        });

      }

    });
  
  },

  saveHabit: function(habit, user) {

    return new Promise(function(resolve, reject) {

      if (habit[0] === undefined) {

        new Habit({
          'user_github_id': user.github_id,
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
            'user_github_id': user.github_id,
            'action': habit.action,
            'quantity': habit.quantity,
            'id': habit[0].habit_id
          },
          'id': habit[0].habit_id
        };

        resolve(editedHabit);
      
      }
    });
  }

};
