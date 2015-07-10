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
      if(Date.parse(completion.start_date) === today) {
        completion.status++;
        //completion.status = completion.status / quantity;
         //<= 1 ? status / this.quantity : 1;
      }

    });
    console.log("completions: ", completions);
    return completions;
    
  },

  updateStatus: function(event) {

    // update status property in Habit Completion model

    var today = Date.parse(habitsView.getDay("today"));

    console.log('event target action in HabitView: ', event.target.id);
    console.log('event in HabitView: ', event);

    var quantity = this.get("quantity");
    console.log("quantity: ", quantity);
    var completions = this.get("completions");
    
    var newCompletions = this.updateCompletions(completions, quantity, today);

    this.set("completions", newCompletions);

    console.log("this.get(completions): ", this.get("completions"));
    this.get("completions").trigger("change:status", this);

    //send put request to api to update completions table
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


  }

});
