var Habit = Backbone.Model.extend({
  
  defaults: {
    action: "",
    quantity: 0,
    time: "days"
  },

  url: "api/habits"

});
