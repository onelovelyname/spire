var app = app || {};

app.NoteFormView = Marionette.ItemView.extend({

  tagName: "form",

  template: Handlebars.compile($('#noteFormTemplate').html()),

  events: {
    "submit": "handleSubmit"
  },

  addNote: function(model, noteText, today) {

    var notes = model.get('notes');
    var newNote = {
      text: noteText,
      start_date: today,
      habit_id: model.get('id')
    };

    var found = false;

    if (notes.length > 0) {
      
      notes.forEach(function(note) {
        if (note.get('start_date') === today && note.get('habit_id') === model.get('id')) {
          found = true;
        }
      });
      
      if (!found) {
        notes.add(newNote);
      }

    } else {
      notes.add(newNote);
    }

    return notes;

  },

  handleSubmit: function (event) {

    event.preventDefault();
    
    var noteText = this.$('#noteText').val();
    var today = Date.parse(habitsView.getDay("today"));

    var newNotes = this.addNote(this.model, noteText, today);
    
    this.model.set("notes", newNotes);

    this.model.save({"notes": newNotes}, {
      patch: true,
      success: function(model) {
        console.log("Note saved in db!", model);
      },
      error: function(error) {
        console.log("Note unable to save in db", error);
      }
    });

  }

});
