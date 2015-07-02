var HabitsView = Backbone.View.extend({
  
  tagName: "section",

  initialize: function () {
    //this.render();
    this.listenTo(this.collection, 'all', this.render);
  },

  template: _.template("<p>Hello HabitsView!</p>"),

  render: function() {
    return this.$el.html(this.template()).appendTo($('body'));
  }

});

new HabitsView({collection: habitsCollection});
