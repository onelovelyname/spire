var app = app || {};

app.NoteFormView = Marionette.ItemView.extend({

  tagName: "form",

  className: "pure-form",

  template: Handlebars.compile($('#noteFormTemplate').html()),

  events: {
    "submit": "handleSubmit"
  },

  initialize: function() {
    _.bindAll(this, "saveSuccess", "saveError");
  },

  addNote: function(model, noteText, noteLocation, today) {

    var notes = model.get('notes');
    var newNote = {
      text: noteText,
      location: noteLocation,
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
    var noteLocation = this.$('#noteLocation').val();
   
    var today = Date.parse(habitsView.getDay("today"));

    var newNotes = this.addNote(this.model, noteText, noteLocation, today);
    
    this.model.set("notes", newNotes);

    this.model.save({"notes": newNotes}, {
      patch: true,
      success: this.saveSuccess,
      error: this.saveError
    });

  },

  saveSuccess: function(model) {
    console.log("Note saved in db!", model);
    this.destroy();
  },

  saveError: function(error) {
    console.log('Note unable to save in db', error);
  }

});
