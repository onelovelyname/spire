var app = app || {};

app.HabitsView = Marionette.CompositeView.extend({
  
  template: Handlebars.compile($('#habitsTemplate').html()),

  collection: habitsCollection,
  
  childView: app.HabitView,

  childViewContainer: "tbody",

  emptyView: EmptyHabitView,

  appEvents: {
    "resize": function() {
      console.log("resize heard in HabitsView");

      var childViews = this.children._views;
      for (var viewName in childViews) {
        if (_.contains(childViews[viewName].el.classList, 'highlighted')) {
          var view = childViews[viewName];
          var model = view.model;
          view.showAside(model);
        }

      }
    }
  },

  initialize: function() {

    this.bindEntityEvents(app, this.appEvents);

  },

  onRender: function() {

    if (this.collection.length > 0) {
      var startingView = Object.keys(this.children._views)[0];
      var startingModel = this.children._views[startingView].model;
      this.children._views[startingView].showAside(startingModel);
      this.children._views[startingView].$el.addClass('highlighted');
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

    day = yyyy + '-' + mm + '-' + dd + "GMT";

    return day;

  }

});

var habitsView = new app.HabitsView();
