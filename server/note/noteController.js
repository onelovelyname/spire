var Note = require('./noteModel.js');
var Helper = require('../config/helpers.js');

module.exports = {

  saveNote: function(note) {

    var noteData = note.notes[note.notes.length - 1];

    return new Promise(function(resolve, reject) {

      new Note({habit_id: noteData.habit_id, 'start_date': Helper.getDay("today") })
      .fetch().then(function(found) {

        if (!found) {

          new Note({
            'habit_id': noteData.habit_id,
            'text': noteData.text,
            'location': noteData.location,
            'start_date': Helper.getDay("today")
          }).save({}, {method: 'insert'})
          .then(function(note){
            console.log("note in saveNote: ", note);
            resolve(note);
          })
          .catch(function(error) {
            console.log("error in saveNote: ", error);
            reject(error);
          });

        }

      });

    });

  }

};
