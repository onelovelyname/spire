app.Router = Backbone.Router.extend({
  initialize: function() {
    console.log("router!");
  },

  routes: {
    "":             "home",
    "habit/:query":  "habit"
  },

  home: function() {
    app.getRegion("formRegion").show(new app.FormView());

    habitsView = new app.HabitsView();
    app.getRegion("mainRegion").show(habitsView);
  },

  habit: function() {

  }

});

// start application

app.on('start', function() {
  router = new app.Router();
  Backbone.history.start();
  console.log("Marionette app instantiated and started!");
});

app.start();



