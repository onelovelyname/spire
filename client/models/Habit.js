var app = app || {};

app.Habit = Backbone.Model.extend({
  
  // initialize: function() {
  //   this.completion = new HabitCompletion();
  // },

  defaults: {
    action: "",
    quantity: 0
    //time: "days"
  },

  url: "api/habits"

});
