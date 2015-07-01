var bodyParser = require('body-parser');
var appController = require('../app/appController.js');

module.exports = function(app, express) {

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.get('/', function(request, response) {
    response.send("hello!");
  });

  app.post('/api/habits', appController.createHabits);

};