var app = app || {};

app.FormView = Marionette.ItemView.extend({

  tagName: "form",

  template: Handlebars.compile($('#formTemplate').html()),

  events: {
    "submit": "handleSubmit",
  },

  handleSubmit: function (event) {

    event.preventDefault();
    var habitAction = this.$('#action').val();
    var habitQuantity = this.$('#quantity').val();
    var habitTime = this.$('#time').val();

    var habitCompletionsCollection = new app.HabitCompletions();

    var notesCollection = new app.Notes();

    // create new Habit model inside of HabitsCollection

    habitsCollection.create({
      action: habitAction,
      quantity: Number(habitQuantity),
      completions: habitCompletionsCollection,
      notes: notesCollection
    }, {
      success: function (habit) {
        console.log("habit created: ", habit);
        habit.get("completions").create({
          start_date: habitsView.getDay("today"),
          end_date: habitsView.getDay("tomorrow"),
          status: 0 / Number(habitQuantity),
          habit_id: habit.id
        }, {
          success: function(completion) {
            console.log("completion created: ", completion);
            $('#action').val('');
            $('#quantity').val('');
            $('#time').val('');
          },
          error: function(error) {
            console.log("Error saving completion to db: ", error);
          }
        });
      },
      error: function (error) {
        console.error("error", error);
      }
    });
  }

});
