var App = Marionette.Application.extend({

  initialize: function() {

    $(window).on('resize', this.emitResize.bind(this));

  },

  emitResize: function() {
    this.trigger('resize', this);
  }

});

var app = new App();

app.addRegions({
  appRegion: "#app-region"

});
