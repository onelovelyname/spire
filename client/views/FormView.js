var FormView = Backbone.View.extend({

  el: "#create-habit-container",

  events: {
    "submit #create-habit-form": "handleSubmit",
  },

  handleSubmit: function(event) {
    // get input from form
    
    event.preventDefault();
    
    var habitAction = event.target[0].value;
    var habitQuantity = event.target[1].value;
    var habitTime = event.target[2].value;

    var habitObject = {
      action: habitAction,
      quantity: habitQuantity,
      time: habitTime
    };

    console.log("habitObject", habitObject);

    // save input to Habit model

  }

});

new FormView();