var app = app || {};

app.HabitCompletion = Backbone.Model.extend({

  defaults: {
    start_date: Date.now(),
    end_date: Date.now(),
    status: 0
  }

  //url: "api/habitCompletion"

});
