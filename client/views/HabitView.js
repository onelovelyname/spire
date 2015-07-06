var app = app || {};

//////////////////////////////////////////////////////////
////////////    Marionette Implementation     ////////////
//////////////////////////////////////////////////////////

app.HabitView = Marionette.ItemView.extend({

  //template: Handlebars.compile($('#habitTemplate').html()),
  template: _.template("<td><button id='<%= action %>'>Complete</button></td><td><%= action %></td><td><%= quantity %></td><td><%= getStatus() %></td>"),

  tagName: 'tr',
  
  templateHelpers: function() {

    var modelId = this.model.get("id");
    
    return {

      getStatus: function() {

        // send ajax request to server looking for status in habits_completion table given habit id 

        return this.getHabitCompletion().then(function(habitCompletion) {
          console.log("habitCompletion: ", habitCompletion);
          return habitCompletion.status;
        });

      },

      getHabitCompletion: function() {
        
        return new Promise(function(resolve, reject) {
          $.get("/api/habitCompletion", { "habit_id": modelId }).then(function(data){
            resolve(data);
          });
        });

      },

      action: this.model.get('action'),
      quantity: this.model.get('quantity')
    };
  },

  events: {
    "click button": "updateStatus"
  },

  updateStatus: function(event) {
    console.log('event target action in HabitView: ', event.target.id);
    // update status property in Habit Completion model

    // send put request to api to update habit_completion table
  }

});

//////////////////////////////////////////////////////////
////////////    Backbone Implementation     //////////////
//////////////////////////////////////////////////////////

// app.HabitView = Backbone.View.extend({

//   tagName: 'tr',

//   template: Handlebars.compile($('#habitTemplate').html()),

//   render: function() {
//     return this.$el.html(this.template(this.model.attributes));
//   }
  
// });
