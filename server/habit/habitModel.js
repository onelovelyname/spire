var db = require('../db');
require('../habitCompletion/habitCompletionModel.js');
require('../note/noteModel.js');


var Habit = db.Model.extend({
  tableName: 'habits',
  completions: function() {
    return this.hasMany("Completion");
  },
  notes: function() {
    return this.hasMany("Note");
  }

});

//module.exports = Habit;

module.exports = db.model('Habit', Habit);
