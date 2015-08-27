var app = app || {};

app.NotesView = Marionette.CompositeView.extend({

  template: Handlebars.compile($('#notesTemplate').html()),

  childView: app.NoteView,

  childViewContainer: 'tbody',

  childEvents: {
    render: function() {
    }
  },

});
