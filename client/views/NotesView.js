var app = app || {};

app.NotesView = Marionette.CompositeView.extend({

  template: Handlebars.compile($('#notesTemplate').html()),

  childView: app.NoteView,

  emptyView: EmptyNoteView,

  childViewContainer: 'tbody',

  childEvents: {
    render: function() {
      console.log('A childView notes has been rendered!');
      console.log("this.collection", this.collection);
    }
  },

});
