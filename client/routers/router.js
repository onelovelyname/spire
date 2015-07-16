app.Router = Backbone.Router.extend({

  initialize: function() {
    console.log("router initialized!");

  },

  execute: function(callback, args, name) {


    console.log("arguments: ", arguments);
    console.log("LocalStorage: ", localStorage);
     
     // send request to get user status to see if user is authenticated
     // if (!notsignedin) {
     //  // go to login
     //  this.navigate('/');
     //  return false;
     // } else {
      if (callback) {
        callback.apply(this, args);
       }
    // }


  },

  routes: {

    "": "login",
    "home": "home"

  },

  login: function() {
    console.log("inside of login function!");
    app.getRegion("mainRegion").show(new app.LoginView());
  },

  home: function() {
    console.log("inside of home function");
    app.getRegion("formRegion").show(new app.FormView());
    app.getRegion("mainRegion").show(habitsView);
  }

});

app.on('start', function() {
  var router = new app.Router();
  Backbone.history.start();
  console.log("Marionette app instantiated and started!");
});

app.start();
