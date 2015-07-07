var app = new Marionette.Application();

app.on('start', function() {
  Backbone.history.start();
  console.log("Marionette app instantiated and started!");
});

app.start();

/////////////////////////////////////////
///////// From Backbone Rails ///////////
/////////////////////////////////////////

app.addRegions({
  headerRegion: "#header-region",
  mainRegion: "#main-region",
  formRegion: "#form-region",
  footerRegion: "#footer-region"
});


