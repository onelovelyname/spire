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
    $('body').prepend(this.render().el);
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
      //time: habitTime,
    }, {
      success: function (habit) {
        console.log("habit in FormView", habit);
        var newHabitCompletion = {
          "habit_id": habit.get("id"),
          "quantity": Number(habit.get("quantity")),
          "status": 0
        };
        new app.HabitCompletion(newHabitCompletion).save({}, {
          success: function(habitCompletion) {
            console.log("habitCompletion in FormView: ", habitCompletion);
          },
          error: function(error) {
            console.error("error", error);
          }
        });
      },
      error: function (error) {
        console.error("error", error);
      }
    });
  }

});

new app.FormView();

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
