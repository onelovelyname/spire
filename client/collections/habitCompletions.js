var app = app || {};

app.HabitCompletions = Backbone.Collection.extend({

  model: app.HabitCompletion,

  url: "api/completions"

  // saveCompletions: function() {

  //   var context = this;
  //   return new Promise(function(resolve, reject) {
  //     context.save({}, {
  //       success: function(completion) {
  //         console.log("Completion saved!", completion);
  //         resolve(completion);
  //       },
  //       error: function(error) {
  //         console.log("Error saving completion to db: ", error);
  //       }
  //     });

  //   });
  // }

});
