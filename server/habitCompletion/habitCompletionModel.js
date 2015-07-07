var db = require('../db');
var Habit = ('../habit/habitModel.js');

var Completion = db.Model.extend({
  tableName: 'completions',
  habit: function() {
    return this.belongsTo(Habit);
  }

});

module.exports = Completion;
