var app = app || {};

app.LoginView = Marionette.ItemView.extend({

  tagName: "form",

  template: Handlebars.compile($('#loginTemplate').html()),

  events: {
    
  }

});

