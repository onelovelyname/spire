var app = app || {};

app.Habits = Backbone.Collection.extend({
  
  model: app.Habit,

  url: "api/habits",

  attachCollectionstoHabit: function(habitsCollection) {
    
    return new Promise(function(resolve, reject) {

        habitsCollection.forEach(function(habit){
          var habitCompletionsCollection = new app.HabitCompletions(habit.get("completions"));
          var notesCollection = new app.Notes(habit.get("notes"));
          habit.set("completions", habitCompletionsCollection);
          habit.set("notes", notesCollection);
        });

        resolve();

    });

  },

});

var habitsCollection = new app.Habits();
