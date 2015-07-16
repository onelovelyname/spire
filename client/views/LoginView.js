var app = app || {};

app.LoginView = Marionette.ItemView.extend({

  tagName: "form",

  template: Handlebars.compile($('#loginTemplate').html()),

  events: {

    "submit": "signin"

  },

  signin: function() {
    event.preventDefault();
    console.log("showing signin");
  }

});

