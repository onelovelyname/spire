var bodyParser = require('body-parser');
var appController = require('../app/appController.js');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var GITHUB_CLIENT_ID = '8482186f19648d881478';
var GITHUB_CLIENT_SECRET = 'ed4ba6d32892d75b86486f38d03ec56dc9157005';

passport.serializeUser(function(user, done) {
  done(null, user.id);
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
    //console.log("profile from GitHub: ", profile);
    return done(null, profile);
  }
));

// var ensureAuthenticated = function(request, response, next) {
//   if (request.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/');
// };

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

  // router.get('/home', ensureAuthenticated, function(request, response) {
  //   console.log("hitting server for home request");
  //   response.render('#home', { user: request.user });
  // });

  router.get('/api/auth/github', passport.authenticate('github', {scope: [ 'user:email' ]}));

  router.get('/api/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    function(request, response) {
      //console.log("request.user: ", request.user);

      // check if User is already saved in db
        // if not yet saved, add User to db with github id, name, and a Spire id
      
        // request.session.regenerate(function(error){
        //   console.log("inside of request.session.regenerate");
        //   request.session.user = request.user.id;
        //   console.log("request.session", request.session);
        //   //localStorage.setItem('spire_session', request.session.user);
        // });
        response.redirect('/#home');
      // create new session for user - not sure if this is taken care of by Passport entirely or whether we need to create a separate session using Express 
    });

  router.get('/api/auth/user', function(request, response) {
    response.status(200).send(request.session);
  });


  router.get('/api/habits', appController.fetchHabits);
  router.post('/api/habits', appController.createInitialHabit);
  router.put('/api/habits', appController.updateHabitStatus);

  router.get('/api/habitCompletion', appController.fetchHabitCompletion);

  app.use(router);

};
