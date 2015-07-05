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
      time: this.model.get('time')
    };
  },

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
