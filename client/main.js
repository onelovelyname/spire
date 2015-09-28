var app = app || {};

app.on("before:start", function() {
 
  this.habitsCollection = new app.Habits();

});

app.on('start', function() {

  this.router = new app.Router();
  Backbone.history.start();

});

app.start();
