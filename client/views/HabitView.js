var HabitView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template('<td>(<%= action %>)</td><td>(<%= quantity %>)</td><td>(<%= time %>)</td>'),

  render: function() {
    console.log("2 render of HabitView");
    return this.$el.html(this.template(this.model.attributes));
  }
  
});
