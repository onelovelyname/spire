app.Router = Backbone.Router.extend({

  routes: {

    "": "login",
    "home": "home"

  },

  initialize: function() {

    app.layoutView = new app.LayoutView();
    app.getRegion('appRegion').show(app.layoutView);
  
  },

  login: function() {

    app.layoutView.getRegion('content').show(new app.LoginView());
  
  },

  // three regions in home: header, form, and main
  home: function(arg) {

    app.layoutView.getRegion('header').show(new app.HeaderView({
      attributes: { name: arg.passport.user.name }
    }));

    app.layoutView.getRegion('form').show(new app.FormView());

    app.habitsView = new app.HabitsView({collection: app.habitsCollection});

    // fetch habits with user's github id
    // attach completions and notes to habits as Backbone Collections
    app.habitsCollection.fetch({

      success: function(collection) {
        collection.attachCollectionstoHabit(collection).then(function() {
          app.layoutView.getRegion('main').show(app.habitsView);
        });
      },

      error: function(error) {
        console.error("There was an error fetching your habits");
      }

    });

    // add classes for styling
    $('html').addClass("home-ui");
    $('#header-region').addClass("header-ui");
    $('#form-region').addClass("form-ui");

  },

  execute: function(callback, args, name) {
   
    var context = this;

    $.get('/api/auth/user', function(session) {
      if(!session.passport.user) {
        context.login();
        return false;

      } else {
        if (callback) {
          var arg = [session];
          callback.apply(this, arg);
         }
      }

    });
  },

});
