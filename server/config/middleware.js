var bodyParser = require('body-parser');
var appController = require('../app/appController.js');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var GITHUB_CLIENT_ID = '8482186f19648d881478';
var GITHUB_CLIENT_SECRET = 'ed4ba6d32892d75b86486f38d03ec56dc9157005';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/api/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));


module.exports = function(app, express) {

  var router = express.Router();

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  router.get('/habits', appController.fetchHabits);
  router.post('/habits', appController.createInitialHabit);
  router.put('/habits', appController.updateHabitStatus);

  router.get('/habitCompletion', appController.fetchHabitCompletion);

  app.use('/api', router);


};
