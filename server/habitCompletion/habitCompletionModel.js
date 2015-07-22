var db = require('../db');
require('../habit/habitModel.js');

var Completion = db.Model.extend({
  tableName: 'completions',
  habit: function() {
    return this.belongsTo("Habit");
  }

});

module.exports = db.model('Completion', Completion);
