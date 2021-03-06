var bodyParser = require('body-parser');
var appController = require('../app/appController.js');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var UserController = require('../user/userController.js');
var CompletionController = require('../habitCompletion/completionController.js');
var GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CALLBACK_URL;

try {
  GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || require('./utility.js').GITHUB_CLIENT_ID;
  GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || require('./utility.js').GITHUB_CLIENT_SECRET;
  CALLBACK_URL = process.env.CALLBACK_URL || "http://127.0.0.1:3000/api/auth/github/callback";
}
catch(e) {
  GITHUB_CLIENT_ID = '';
  GITHUB_CLIENT_SECRET = '';
  CALLBACK_URL = "http://127.0.0.1:3000/api/auth/github/callback";
}

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
    callbackURL: CALLBACK_URL
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
      response.redirect('/#home');

    });

  router.get('/logout', function(request, response) {
    request.logout();
    console.log("request.passport.user after logout: ", request.passport);
    response.redirect("/");
  });

  router.get('/auth/user', function(request, response) {
    response.status(200).send(request.session);
  });

  router.put('/completions/:id', appController.updateCompletion);

  router.get('/habits', appController.fetchHabits);
  router.post('/habits', appController.createInitialHabit);
  router.post('/completions', appController.createCompletion);
  router.patch('/habits', appController.createNote);
  router.get('/habitCompletion', appController.fetchHabitCompletion);

  app.use('/api', router);

};
