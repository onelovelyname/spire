var bodyParser = require('body-parser');
var appController = require('../app/appController.js');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var UserController = require('../user/UserController.js');

var GITHUB_CLIENT_ID = '8482186f19648d881478';
var GITHUB_CLIENT_SECRET = 'ed4ba6d32892d75b86486f38d03ec56dc9157005';

passport.serializeUser(function(user, done) {

  var sessionUser = {
    github_id: user.id,
    name: user.displayName,
    email: user.emails[0].value
  };

  done(null, sessionUser);

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

  app.use(cookieParser('banana pancakes'));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'banana pancakes',
    saveUninitialized: true,
    resave: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(__dirname + '/../../client'));

  router.get('/auth/github', passport.authenticate('github', {scope: [ 'user:email' ]}));

  router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    function(request, response) {

      UserController.createUser(request.session.passport.user)
      .then(function(user) {
        console.log("user in middleware: ", user);
      })
      .catch(function(error) {
        console.dir(error);
      });
      // check if User is already saved in db
        // if not yet saved, add User to db with github id, name, and a Spire id
      response.redirect('/#home');

    });

  router.get('/auth/user', function(request, response) {
    response.status(200).send(request.session);
  });

  router.get('/habits', appController.fetchHabits);
  router.post('/habits', appController.createInitialHabit);
  router.put('/habits', appController.updateHabitStatus);
  router.patch('/habits', appController.createNote);
  router.get('/habitCompletion', appController.fetchHabitCompletion);

  app.use('/api', router);

};
