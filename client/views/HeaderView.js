var app = app || {};

app.HeaderView = Marionette.ItemView.extend({

  tagName: "section",

  template: Handlebars.compile($('#headerTemplate').html()),

  templateHelpers: function() {

    return {
      name: this.attributes.name
    };

  }

});
