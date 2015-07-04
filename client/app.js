var app = new Marionette.Application();

app.on('start', function() {
  Backbone.history.start();
  console.log("Marionette app instantiated and started!");
});

app.start();
