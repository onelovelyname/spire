var bodyParser = require('body-parser');

module.exports = function(app, express) {

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.get('/', function(request, response) {
    response.send("hello!");
  });

};