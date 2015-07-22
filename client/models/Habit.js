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

  updateCompletions: function (completions, quantity, today) {

    completions.forEach(function(completion){
      completion = completion.attributes || completion;
      if(Date.parse(completion.start_date) === today) {
        completion.status++;
      }

    });

    return completions;
    
  },

  updateStatus: function(event) {

    console.log("inside of updateStatus");

    var completions = this.get("completions");
    var quantity = this.get("quantity");
    var today = Date.parse(habitsView.getDay("today"));
    
    console.log("completions in updateStatus: ", completions);
    
    debugger;
    
    var newCompletions = this.updateCompletions(completions, quantity, today);
    //console.log("newCompletions in updateStatus:", newCompletions);

    this.set("completions", newCompletions);

    _.extend(completions, Backbone.Events);
    completions.trigger("change:status", completions);

    var model = this;

    this.save({}, {
      success: function(model) {
        console.log("Status of habit updated in db! ", model);
      },
      error: function(error) {
        console.log("Status of habit unable to update in db: ", error);
      }
    });

    //Radio.execute("day", "event:complete");
    //Day Model
    // Radio.handle("day", "event:complete", functionName);
    completions.forEach(function(completion) {
      if(Date.parse(completion.start_date) === today) {
        if(completion.status === quantity) {
          completions.trigger("complete", model);
        }
      }
    });


  }

});
