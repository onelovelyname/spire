var app = app || {};

app.HabitView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template('<td>(<%= action %>)</td><td>(<%= quantity %>)</td><td>(<%= time %>)</td>'),

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }
  
});
