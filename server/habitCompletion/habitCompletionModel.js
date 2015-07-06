var db = require('../db');

var HabitCompletion = db.Model.extend({
  tableName: 'habits_completion'

});

module.exports = HabitCompletion;
