var HabitCompletion = require('./habitCompletionModel');

module.exports = {

  saveHabitCompletion: function (habitCompletion) {

    return new Promise(function(resolve, reject) {

      new HabitCompletion({
        "habit_id": habitCompletion.habit_id,
        "start_date": "today",
        "end_date": "tomorrow",
        "status": 0
      }).save({}, {method: 'insert'})
        .then(function(habitCompletion) {
          resolve(habitCompletion);
        })
        .catch(function(error) {
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
