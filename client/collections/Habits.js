var Habits = Backbone.Collection.extend({
  
  model: Habit,

  url: "api/habits"

});

var habitsCollection = new Habits();
