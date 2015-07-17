var db = require('../db');

var User = db.Model.extend({

  tableName: 'users',
  idAttribute: 'github_id'

});

module.exports = db.model('User', User);
