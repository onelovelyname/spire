var app = app || {};

app.LoginView = Marionette.ItemView.extend({

  tagName: "form",

  template: Handlebars.compile($('#loginTemplate').html()),

  events: {

    //"submit": "signin"

  },

  // signin: function() {

  //   event.preventDefault();

  //   console.log("Signed in!");

  //   $.ajax({
  //     url: "api/auth/github",
  //     type: 'GET',
  //     headers: {
  //       "Access-Control-Allow-Origin": "http://localhost:3000/"
  //     }
  //   })
  //   .done(function() {
  //     console.log("success from signin!");
  //   })
  //   .fail(function(error) {
  //     console.log("Error from signin: ", error);
  //   });
  // }

});

