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

    }

  },

  initialize: function() {
    this.bindEntityEvents(app, this.appEvents);
  },

  onBeforeRender: function() {

  },

  onRender: function() {
    var startingView = Object.keys(this.children._views)[0];
    var startingModel = this.children._views[startingView].model;
    this.children._views[startingView].showAside(startingModel);
    this.children._views[startingView].$el.addClass('highlighted');
  },

  appEvents: {
    "resize": "resizeAside"
  },

  resizeAside: function() {

    for (var viewName in this.children._views) {
      var view = this.children._views[viewName];
      if (_.contains(view.el.classList, "highlighted")) {
        view.showAside(view.model);
      }
    }
  },

  getDay: function(date) {
 
    var day = new Date();

    if (date === "tomorrow") {
      day.setDate(day.getDate() + 1);
    }

    var dd = day.getDate();
    var mm = day.getMonth() + 1;
    var yyyy = day.getFullYear();

    if(dd<10) {
      dd ='0'+ dd;
    }

    if(mm<10) {
      mm='0'+mm;
    }

    //day = mm + '/' + dd + '/' + yyyy;
    day = yyyy + '-' + mm + '-' + dd + "GMT";

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
