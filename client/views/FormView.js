var FormView = Backbone.View.extend({

  el: "#create-habit-container",

  events: {
    "submit #create-habit-form": "handleSubmit",
  },

  handleSubmit: function(event) {
    // get input from form
    
    event.preventDefault();
    
    var habitAction = this.$('#action').val();
    var habitQuantity = this.$('#quantity').val();
    var habitTime = this.$('#time').val();

    var habitObject = new Habit({
      action: habitAction,
      quantity: habitQuantity,
      time: habitTime
    });

    console.log("habitObject", habitObject);

    // save input to Habit model

    habitObject.save({}, {
      success: function(habit) {
        console.log("habit: ", habit);
      },
      error: function(error) {
        console.error("error", response);
      }
    });

  }

});

new FormView();