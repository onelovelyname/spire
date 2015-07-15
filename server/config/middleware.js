var bodyParser = require('body-parser');
var appController = require('../app/appController.js');

module.exports = function(app, express) {

  var router = express.Router();

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  router.get('/habits', appController.fetchHabits);
  router.post('/habits', appController.createInitialHabit);
  router.put('/habits', appController.updateHabitStatus);

  router.get('/habitCompletion', appController.fetchHabitCompletion);
  //app.post('/api/habitCompletion', appController.createHabitCompletion);

  app.use('/api', router);


};
