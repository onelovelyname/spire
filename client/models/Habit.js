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

    // update status property in Habit Completion model

    var today = Date.parse(habitsView.getDay("today"));

    var quantity = this.get("quantity");
  
    var completions = this.get("completions");
    
    var newCompletions = this.updateCompletions(completions, quantity, today);

    this.set("completions", newCompletions);

    //_.extend(this.get("completions"), Backbone.Events);

    completions.trigger("change:status", completions);
    //this.get("completions").trigger("change:status", this.get('completions'));
    //this.trigger("change", this);

    completions.forEach(function(completion) {
      if(Date.parse(completion.start_date) === today) {
        if(completion.status === quantity) {
          completions.trigger("complete", completions);
        }
      }
    });

    //send put request to api to update completions table

    this.save({}, {
      success: function(model) {
        console.log("Status of habit updated in db! ", model);


        // model.completions.start_date
      },
      error: function(error) {
        console.log("Status of habit unable to update in db: ", error);
      }
    });

    //Radio.execute("day", "event:complete");
    //Day Model
    // Radio.handle("day", "event:complete", functionName);


  }

});
