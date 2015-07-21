var app = app || {};

app.HeaderView = Marionette.ItemView.extend({

  tagName: "section",

  template: _.template("<img src='../assets/spire_logo.png' class='greeting'></img><h3 class='greeting'>Welcome, <%= name %>!</h3>"),

  templateHelpers: function() {

    console.log("this.attributes.name: ", this.attributes.name);

    return {
      name: this.attributes.name
    };

  }

});
