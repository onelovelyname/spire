var app = app || {};

app.HeaderView = Marionette.ItemView.extend({

  tagName: "section",

  template: Handlebars.compile($('#headerTemplate').html()),

  //template: _.template("<img src='../assets/spire_logo.png' class='greeting'></img><ul class='greeting'><li class='greeting'><h3>Welcome, <%= name %>!</h3></li><li class='greeting'></li><h3>Logout </h3></ul>"),

  templateHelpers: function() {

    return {
      name: this.attributes.name
    };

  }

});
