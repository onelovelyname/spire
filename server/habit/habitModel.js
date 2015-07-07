var db = require('../db');
require('../habitCompletion/habitCompletionModel.js');

var Habit = db.Model.extend({
  tableName: 'habits',
  completions: function() {
    return this.hasMany("Completion");
  }

});

//module.exports = Habit;

module.exports = db.model('Habit', Habit);
