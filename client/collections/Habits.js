var app = app || {};

app.Habits = Backbone.Collection.extend({
  
  model: app.Habit,

  url: "api/habits"

});

var habitsCollection = new app.Habits();
