var app = app || {};

// app.HabitsView = Backbone.View.extend({
  
//   tagName: "table",

//   initialize: function () {
//     //this.render();
//     this.listenTo(this.collection, 'add', this.render);
//   },

//   render: function() {
//     return this.$el.html('<h2>View Habits</h2>').append(
//       this.collection.map(function(habit){
//         return new app.HabitView({model: habit}).render();
//       })
//     ).appendTo($('body'));
//   }

//   // render: function() {
//   //   return this.$el.html('<h2>View Habits</h2>').append(
      
//   //     this.collection.map(function(habit){
        
//   //       var newHabitView = new app.HabitView({model: habit});

//   //       console.log('newHabitView', newHabitView);

//   //       return newHabitView.render();

//   //     })
//   //   ).appendTo($('body'));
//   // }
// });

// new app.HabitsView({collection: habitsCollection});

/////////////////

app.HabitsView = Marionette.CollectionView.extend({
  
  tagName: "tbody",
  
  childView: app.HabitView,
  
  collection: habitsCollection,

  childEvents: {
    render: function() {
      console.log('A childView has been rendered!');
    }
  },

  initialize: function() {
    console.log('Habits View initialized');
    $('table').append(this.render().el);
  }

});

var habitsView = new app.HabitsView();

