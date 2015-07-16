app.Router = Backbone.Router.extend({

  initialize: function() {
    console.log("router initialized!");

  },

  routes: {

    "": "login",
    "home": "home"

  },

  login: function() {
    console.log("inside of login function!");
    app.getRegion("mainRegion").show(new app.LoginView());
  },

  home: function() {
    console.log("inside of home function");
    app.getRegion("formRegion").show(new app.FormView());
    app.getRegion("mainRegion").show(habitsView);
  }

});

app.on('start', function() {
  var router = new app.Router();
  Backbone.history.start();
  console.log("Marionette app instantiated and started!");
});

app.start();
