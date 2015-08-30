app.Router = Backbone.Router.extend({

  initialize: function() {
    console.log("router initialized!");
    app.getRegion('appRegion').show(layoutView);
  },

  routes: {

    "": "login",
    "home": "home"

  },

  login: function() {
    layoutView.getRegion('content').show(new app.LoginView());
  },

  home: function(arg) {

    layoutView.getRegion('form').show(new app.FormView());

    $('html').addClass("home-ui");
    $('#header-region').addClass("header-ui");
    $('#form-region').addClass("form-ui");

    habitsView.collection.fetch({

      success: function(collection) {

        collection.attachCollectionstoHabit(collection).then(function() {
          console.log("collection in home: ", collection);
          layoutView.getRegion('main').show(habitsView);

        });
        
      },
      error: function(error) {
        console.error("There was an error fetching your habits");
      }
    });

    layoutView.getRegion('header').show(new app.HeaderView({
      attributes: {
        name: arg.passport.user.name
      }
    }));

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

app.on('start', function() {
  var router = new app.Router();
  Backbone.history.start();
  console.log("Marionette app instantiated and started!");
});

app.start();
