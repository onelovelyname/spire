var app = app || {};

//////////////////////////////////////////////////////////
////////////    Marionette Implementation     ////////////
//////////////////////////////////////////////////////////

app.FormView = Marionette.ItemView.extend({

  tagName: "form",

  template: Handlebars.compile($('#formTemplate').html()),

  events: {
    "submit": "handleSubmit",
  },

  initialize: function() {
    //$('body').prepend(this.render().el);
  },

  handleSubmit: function (event) {
    // get input from form
    event.preventDefault();
    var habitAction = this.$('#action').val();
    var habitQuantity = this.$('#quantity').val();
    var habitTime = this.$('#time').val();

    // create new HabitCompletions Collection to save as a property of Habit Model below

    var habitCompletionsCollection = new app.HabitCompletions();
    habitCompletionsCollection.add({
      start_date: null,
      end_date: null,
      status: 0 / Number(habitQuantity)
    });

    // create new Habit model inside of HabitsCollection

    habitsCollection.create({
      action: habitAction,
      quantity: Number(habitQuantity),
      habitCompletions: habitCompletionsCollection.models
    }, {
      success: function (habit) {
        console.log("habit created: ", habit);
      },
      error: function (error) {
        console.error("error", error);
      }
    });
  }

});

app.getRegion("formRegion").show(new app.FormView());

//////////////////////////////////////////////////////////
////////////    Backbone Implementation     //////////////
//////////////////////////////////////////////////////////

// app.FormView = Backbone.View.extend({

//   tagName: "form",

//   events: {
//     "submit": "handleSubmit",
//   },

//   initialize: function () {
//     this.render();
//   },

//   template: Handlebars.compile($('#formTemplate').html()),

//   render: function () {
//     return this.$el.html(this.template()).prependTo($('body'));
//   },

//   handleSubmit: function (event) {
//     // get input from form
//     event.preventDefault();
//     var habitAction = this.$('#action').val();
//     var habitQuantity = this.$('#quantity').val();
//     var habitTime = this.$('#time').val();

//     // create new Habit model inside of HabitsCollection

//     habitsCollection.create({
//       action: habitAction,
//       quantity: habitQuantity,
//       time: habitTime
//     }, {
//       success: function (habit) {
//         console.log("habit: ", habit);
//       },
//       error: function (error) {
//         console.error("error", error);
//       }
//     });
//   }

// });

// new app.FormView();
