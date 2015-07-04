var app = app || {};

app.HabitView = Backbone.View.extend({

  tagName: 'tr',

  template: Handlebars.compile($('#habitTemplate').html()),

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }
  
});
