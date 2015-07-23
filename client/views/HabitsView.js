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
      //console.log('A childView has been rendered!');
    }
  },

  initialize: function() {

  },

  onBeforeRender: function() {

    // this.collection.fetch({
    //   success: function(collection) {

    //     collection.forEach(function(habit){
    //       var habitCompletionsCollection = new app.HabitCompletions(habit.get("completions"));
    //       var notesCollection = new app.Notes(habit.get("notes"));
    //       habit.set("completions", habitCompletionsCollection);
    //       habit.set("notes", notesCollection);

    //     });
    //     debugger;

    //     console.log("collection fetched!", collection);
    //   },
    //   error: function(error) {
    //     console.error("There was an error fetching your habits: ", error);
    //   }
    // });

  },

  getDay: function(date) {
 
    var day = new Date();
    var dd = 0;

    if (date === "today") {
      dd = day.getDate();
    } else if (date === "tomorrow") {
      dd = day.getDate() + 1;
    }

    var mm = day.getMonth() + 1;
    var yyyy = day.getFullYear();

    if(dd<10) {
      dd ='0'+ dd;
    }

    if(mm<10) {
      mm='0'+mm;
    }

    day = mm + '/' + dd + '/' + yyyy;

    return day;

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
