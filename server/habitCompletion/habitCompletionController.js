var HabitCompletion = require('./habitCompletionModel');

module.exports = {

  saveHabitCompletion: function(habitId, habitStatus) {

    return new Promise(function(resolve, reject) {

      new HabitCompletion({
        'habit_id': habitId,
        'start_date': "today",
        'end_date': "tomorrow",
        'status': habitStatus
      }).save({}, {method: 'insert'})

      .then(function(habitCompletion) {
        console.log("success in saveHabitCompletion", habitCompletion);
        resolve(habitCompletion);
      })

      .catch(function(error) {
        console.log("error in saveHabitCompletion: ", error);
        reject(error);
      });

    });

  },

  saveCompletions: function (habit, request) {

    var context = this;

    console.log("this", this);

    var habitCompletionsCollection = request.habitCompletions;

    return new Promise(function(resolve, reject) {

      Promise.all([
        habitCompletionsCollection.map(function(habitCompletionModel) {
          return context.saveHabitCompletion(habit.id, habitCompletionModel.status);
        })

      ]).then(function(results){
        console.log("results in saveCompletions: ", results);
        resolve(results);
      })
      .catch(function(error) {
        console.log("error in saveCompletions: ", error);
        reject(error);
      });
    });
  },


  getHabitCompletion: function(query) {

    return new Promise(function(resolve, reject) {

      new HabitCompletion().query({ where: { habit_id: query.habit_id } })
        .fetch()
        .then(function(habitCompletion) {
          resolve(habitCompletion);
        })
        .catch(function(error) {
          console.error("Could not fetch habitCompletion for that habit id");
        });

    });

  }

};
