var app = app || {};

//////////////////////////////////////////////////////////
////////////    Marionette Implementation     ////////////
//////////////////////////////////////////////////////////

app.HabitView = Marionette.ItemView.extend({

  //template: Handlebars.compile($('#habitTemplate').html()),
  template: _.template("<td><button id='<%= modelId %>'>Complete</button></td><td><%= action %></td><td><%= quantity %></td><td><%= getStatusFromModel() %></td>"),

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

    var model = this.model;

    var millisecondsInDay = 86400000;
    
    return {

      getStatusFromModel: function() {

        console.log('inside of getStatusFromModel!');

        var today = Date.parse(new Date());
        //console.log("this.model completions in getStatus: ", model.get("completions"));

        var completions = model.get("completions");

        for (var i = 0; i < completions.length; i++) {
          //if( Date.parse(completions[i].start_date) + millisecondsInDay > today ) {
            if (completions[i].attributes) {
              return completions[i].attributes.status;
            } else {
              return completions[i].status;
            }
          //}
        }
      },

      action: this.model.get('action'),
      quantity: this.model.get('quantity'),
      modelId: this.model.get('id')
    };
  },

  updateStatus: function(event) {
    console.log('event target action in HabitView: ', event.target.id);

    //Radio.execute("day", "event:complete");
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
