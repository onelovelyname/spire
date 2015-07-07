var app = app || {};

//////////////////////////////////////////////////////////
////////////    Marionette Implementation     ////////////
//////////////////////////////////////////////////////////

app.HabitView = Marionette.ItemView.extend({

  //template: Handlebars.compile($('#habitTemplate').html()),
  template: _.template("<td><button id='<%= action %>'>Complete</button></td><td><%= action %></td><td><%= quantity %></td><td><%= getStatusFromModel() %></td>"),

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
    var model = this.model;

    console.log('this.model', this.model);
    var today = Date.parse(new Date());
    var millisecondsInDay = 86400000;
    
    return {

      getStatusFromModel: function() {

        console.log("this.model completions in getStatus: ", model.get("completions"));

        var completions = model.get("completions");

        for (var key in completions) {
          console.log("completions[key]", completions[key]);
          if(Date.parse(completions[key].start_date.toString()) + millisecondsInDay > today) {
            return completions[key].status;
          }
        }
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
