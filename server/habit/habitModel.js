var db = require('../db');

var Habit = db.Model.extend({
  tableName: 'habits'

});

module.exports = Habit;