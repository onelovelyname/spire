var app = app || {};

app.HeaderView = Marionette.ItemView.extend({

  tagName: "header",

  template: _.template("<h2>Welcome, <%= name %>!</h2>"),

  templateHelpers: function() {

    console.log("this.attributes.name: ", this.attributes.name);

    return {
      name: this.attributes.name
    };

  }

});
