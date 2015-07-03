var HabitsView = Backbone.View.extend({
  
  tagName: "table",

  initialize: function () {
    //this.render();
    this.listenTo(this.collection, 'add', this.render);
  },

  render: function() {
    //return this.$el.html(this.template()).appendTo($('body'));
    console.log("1 render of HabitsView");
    return this.$el.html('<h2>View Habits</h2>').append(
      this.collection.map(function(habit){
        return new HabitView({model: habit}).render();
      })
    ).appendTo($('body'));
  }
});

new HabitsView({collection: habitsCollection});
