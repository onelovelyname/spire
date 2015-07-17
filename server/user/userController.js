var Promise = require('bluebird');
var User = require('./userModel');

module.exports = {

  createUser: function(user) {

    return new Promise(function(resolve, reject){

      new User({ 'github_id': user.github_id })
      .fetch().then(function(found) {
        if (!found) {
          new User({
            github_id: user.github_id,
            name: user.name,
            email: user.email
          }).save({}, {method: 'insert'})
          .then(function(user) {
            console.log("User saved!", user);
            resolve(user);
          })
          .catch(function(error) {
            reject({ 'Error saving new user to database': error });
          });
        }
      });
    });
  }

};
