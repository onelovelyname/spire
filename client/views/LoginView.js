var app = app || {};

app.LoginView = Marionette.ItemView.extend({

  tagName: "section",

  template: Handlebars.compile($('#loginTemplate').html()),

});
