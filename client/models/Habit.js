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

  updateCompletions: function (model, quantity, today) {

    var completions = model.get("completions");
    completions.forEach(function(completion, index, completions){

      if(Date.parse(completion.get('start_date')) === today) {

        completion.set('status', completion.get('status') + 1);

        completion.save({}, {
          success: function(completion) {
            console.log("completion saved successfully!", completion);
          },
          error: function(error) {
            console.log("Error saving completion in db: ", error);
          }
        });

        if(completion.get('status') === quantity) {
          model.get("completions").trigger('complete', completions);
        }
      
      }

    });

    return completions;
    
  },

  updateStatus: function(event) {

    console.log("inside of updateStatus");


    //var completions = this.get("completions");
    var model = this;
    var quantity = this.get("quantity");
    var today = Date.parse(habitsView.getDay("today"));

    this.updateCompletions(model, quantity, today);

    //_.extend(this.get("completions"), Backbone.Events);

    this.get("completions").trigger("change:status", this.get("completions"));
    //this.get("completions").trigger("change:status", this.get('completions'));
    //this.trigger("change", this);

    // completions.forEach(function(completion) {
    //   if(Date.parse(completion.get('start_date')) === today) {
    //     if(completion.get('status') === quantity) {
    //       completions.trigger("complete", completions);
    //     }
    //   }
    // });

    //var model = this;


    // this.save({}, {
    //   success: function(model) {
    //     console.log("Status of habit updated in db! ", model);


    //     // model.completions.start_date
    //   },
    //   error: function(error) {
    //     console.log("Status of habit unable to update in db: ", error);
    //   }
    // });

    //Radio.execute("day", "event:complete");
    //Day Model
    // Radio.handle("day", "event:complete", functionName);
    // completions.forEach(function(completion) {
    //   if(Date.parse(completion.start_date) === today) {
    //     if(completion.status === quantity) {
    //       completions.trigger("complete", model);
    //     }
    //   }
    // });


  }

});
