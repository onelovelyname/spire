var app = app || {};

//////////////////////////////////////////////////////////
////////////    Marionette Implementation     ////////////
//////////////////////////////////////////////////////////

app.HabitView = Marionette.ItemView.extend({

  //template: Handlebars.compile($('#habitTemplate').html()),
  template: _.template("<td><button id='<%= action %>'>Complete</button></td><td><%= action %></td><td><%= quantity %></td><td><%= getStatus() %></td>"),

  tagName: 'tr',

  completionEvents: {
    "change:status": "render"
  },

  events: {
    "click button": "updateStatus"
  },

  initialize: function() {
    this.bindEntityEvents(this.model.completion, this.completionEvents);
  },

  
  templateHelpers: function() {

    var modelId = this.model.get("id");

    console.log("this.model in templateHelpers: ", this.model);
    
    return {

      getStatus: function() {

        // send ajax request to server looking for status in habits_completion table given habit id 
        console.log("this.model in getStatus: ", this.model);

        // return this.getHabitCompletion().then(function(habitCompletion) {
        //   //console.log("habitCompletion: ", habitCompletion);
        //   return habitCompletion.status;
        // });

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

  updateStatus: function(event) {
    console.log('event target action in HabitView: ', event.target.id);

    Radio.execute("day", "event:complete");
    //Day Model
    // Radio.handle("day", "event:complete", functionName);

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
