var app = app || {};

app.LayoutView = Marionette.LayoutView.extend({

  template: Handlebars.compile($('#layoutTemplate').html()),

  regions: {
    'header': '#header-region',
    'form': '#form-region',
    'main': '#main-region',
    'history': '#history-region',
    'footer': '#footer-region'
  }

});

var layoutView = new app.LayoutView();
