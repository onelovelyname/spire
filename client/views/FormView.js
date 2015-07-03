var FormView = Backbone.View.extend({

  tagName: "form",

  events: {
    "submit": "handleSubmit",
  },

  initialize: function () {
    this.render();
  },

  template: _.template("<h2>Create Habit</h2><p>I want to build a habit by <input type='text' id='action' placeholder='Enter action' autofocus/> <input type='text' id='quantity' placeholder='Enter quantity'/> times per <input type='text' id='time' placeholder='Enter time'/></p><button action='submit'>Submit</button>"),

  render: function () {
    return this.$el.html(this.template()).prependTo($('body'));
  },

  handleSubmit: function (event) {
    // get input from form
    event.preventDefault();
    var habitAction = this.$('#action').val();
    var habitQuantity = this.$('#quantity').val();
    var habitTime = this.$('#time').val();

    // create new Habit model inside of HabitsCollection

    habitsCollection.create({
      action: habitAction,
      quantity: habitQuantity,
      time: habitTime
    }, {
      success: function (habit) {
        console.log("habit: ", habit);
      },
      error: function (error) {
        console.error("error", error);
      }
    });
  }

});

new FormView();
