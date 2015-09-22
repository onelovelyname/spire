var app = app || {};

app.HeaderView = Marionette.ItemView.extend({

  tagName: "section",

  template: Handlebars.compile($('#headerTemplate').html()),

  templateHelpers: function() {

    console.log("this.attributes.name: ", this.attributes.name);

    return {
      name: this.attributes.name
    };

  }

});
