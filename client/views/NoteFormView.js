var app = app || {};

app.NoteFormView = Marionette.ItemView.extend({

  tagName: "form",

  template: Handlebars.compile($('#noteFormTemplate').html()),

  events: {
    "submit": "handleSubmit"
  },

  // handleSubmit: function() {
  //   console.log("note submitted!");
  // }

  addNote: function(notes, noteText, today, modelId) {

    var newNote = {
      text: noteText,
      start_date: today,
      habit_id: modelId
    };

    var found = false;

    if (notes.length > 0) {
      
      notes.forEach(function(note) {
        if (note.start_date === today && note.habit_id === modelId) {
          found = true;
        }
      });
      
      if (!found) {
        notes.push(newNote);
      }

    } else {
      notes.push(newNote);
    }

    return notes;

  },

  handleSubmit: function (event) {
    // get input from form
    event.preventDefault();
    
    //debugger;
    var notes = this.model.get("notes");
    var noteText = this.$('#noteText').val();
    var today = Date.parse(habitsView.getDay("today"));
    var modelId = this.model.get("id");

    var newNotes = this.addNote(notes, noteText, today, modelId);
    //var NotesCollection = new app.Notes();
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
