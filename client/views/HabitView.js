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

        console.log("modelId: ", modelId);

        //return "Get Status working";

        // send ajax request to server looking for status in habits_completion table given habit id 
        var status = $.get("/api/habitCompletion", { "habit_id": modelId })
          .done(function(data) {
            console.log("data from Ajax request in HabitView: ", data);
            return data;
          });
        return status;

      },
      action: this.model.get('action'),
      quantity: this.model.get('quantity')
    };
  },

  events: {
    "click button": "updateStatus"
  },

  updateStatus: function(event) {
    console.log('event target id in HabitView: ', event.target.id);
    // update status property in model
    // send post request to server to insert into habit_completion table
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
