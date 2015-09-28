var app = app || {};

app.Habit = Backbone.Model.extend({

  defaults: {
    action: "",
    quantity: 0
  },

  url: "api/habits",

  updateCompletions: function (model, quantity, today) {

    var completions = model.get("completions");
    completions.forEach(function(completion, index, completions){

      var date = Date.parse(completion.get('start_date'));
      
      if(Date.parse(completion.get('start_date')) === today) {

        completion.set('status', completion.get('status') + 1);

        console.log("completion in updateCompletions: ", completion);

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

    var model = this;
    var quantity = this.get("quantity");
    var today = Date.parse(app.habitsView.getDay("today"));

    this.updateCompletions(model, quantity, today);

    this.get("completions").trigger("change:status", this.get("completions"));

  }

});
