var app = app || {};

app.LoginView = Marionette.ItemView.extend({

  onBeforeShow: function() {
    $('html').addClass("login-bg");
  },

  tagName: "div",

  className: "login",

  template: Handlebars.compile($('#loginTemplate').html()),

});

