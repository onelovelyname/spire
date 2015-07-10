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

  url: "api/habits",

  updateCompletions: function (completions, today) {

    completions.forEach(function(completion){
      if(Date.parse(completion.start_date) === today) {
        completion.status++;
      }

    });
    return completions;
    
  },

  updateStatus: function(event) {
    _.extend(this.get("completions"), Backbone.Events);

    var today = Date.parse(habitsView.getDay("today"));

    console.log('event target action in HabitView: ', event.target.id);

    var completions = this.get("completions");
    var newCompletions = this.updateCompletions(completions, today);

    this.set("completions", newCompletions);

    console.log("this.model after: ", this);

    this.get("completions").trigger("change:status", this);
    //Radio.execute("day", "event:complete");
    //Day Model
    // Radio.handle("day", "event:complete", functionName);

    // update status property in Habit Completion model

    // send put request to api to update habit_completion table
  }

});
