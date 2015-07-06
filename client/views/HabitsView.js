var app = app || {};

//////////////////////////////////////////////////////////
////////////    Marionette Implementation     ////////////
//////////////////////////////////////////////////////////

app.HabitsView = Marionette.CompositeView.extend({
  
  template: Handlebars.compile($('#habitsTemplate').html()),
      
  collection: habitsCollection,
  
  childView: app.HabitView,

  childViewContainer: "tbody",

  childEvents: {
    render: function() {
      console.log('A childView has been rendered!');
    }
  },

  initialize: function() {
    $('#view-habits').append(this.render().el);
  },

  onBeforeRender: function() {
    // send query to server for all habits in db with given user id
    // add each habit into collection prior to render
    this.collection.fetch({
      success: function(collection) {
        console.log("habits from db: ", collection);
      },
      error: function(error) {
        console.error("There was an error fetching your habits: ", error);
      }
    });
  }

});

var habitsView = new app.HabitsView();

//////////////////////////////////////////////////////////
////////////    Backbone Implementation     //////////////
//////////////////////////////////////////////////////////

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

// });

// new app.HabitsView({collection: habitsCollection});
