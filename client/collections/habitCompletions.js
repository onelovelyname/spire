var app = app || {};

app.HabitCompletions = Backbone.Collection.extend({

  model: app.HabitCompletion,

  url: "api/completions"

});
