var app = app || {};

app.LoginView = Marionette.ItemView.extend({

  onBeforeShow: function() {
    $('html').addClass("login-ui");
  },

  tagName: "div",

  className: "login",

  template: Handlebars.compile($('#loginTemplate').html()),

});

