var db = require('../db');

var Note = db.Model.extend({
  tableName: 'notes',
  habit: function() {
    return this.belongsTo("Habit");
  }

});

module.exports = db.model('Note', Note);
