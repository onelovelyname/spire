var app = app || {};

//////////////////////////////////////////////////////////
////////////    Marionette Implementation     ////////////
//////////////////////////////////////////////////////////

app.HabitView = Marionette.ItemView.extend({

  template: Handlebars.compile($('#habitTemplate').html()),

  tagName: 'tr',
  
  templateHelpers: function() {

    return {
      action: this.model.get('action'),
      quantity: this.model.get('quantity'),
      status: this.model.get('status')
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
