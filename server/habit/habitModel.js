var db = require('../db');
var Completion = ('../habitCompletion/habitCompletionModel.js');

var Habit = db.Model.extend({
  tableName: 'habits',
  completions: function() {
    return this.hasMany(Completion);
  }

});

module.exports = Habit;
