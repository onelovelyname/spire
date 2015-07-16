app.Router = Backbone.Router.extend({

  initialize: function() {
    console.log("router initialized!");
  },

  routes: {

    "": "login",
    "home": "home"

  },

  login: function() {
    app.getRegion("mainRegion").show(new app.LoginView());
  },

  home: function() {
    app.getRegion("formRegion").show(new app.FormView());
    app.getRegion("mainRegion").show(habitsView);
  },

  execute: function(callback, args, name) {
   
    var context = this;

    $.get('/api/auth/user', function(session) {

      if(!session.passport.user) {
        context.login();
        return false;

      } else {
        if (callback) {
          callback.apply(this, args);
         }
      }

    });
  },

});

app.on('start', function() {
  var router = new app.Router();
  Backbone.history.start();
  console.log("Marionette app instantiated and started!");
});

app.start();
