var app = app || {};

app.HabitView = Marionette.ItemView.extend({

  template: _.template("<td><button id='<%= modelId %>' class='button-success pure-button'>Complete</button></td><td data-id='<%= modelId %>' class='habitAction'><%= action %></td><td><%= quantity %></td><td><%= calculateStatus(getStatusFromModel()) %></td>"),

  tagName: 'tr',

  completionEvents: {
    "change:status": "render",
    "complete": "createNoteForm"
  },

  events: {

    "click button": function(event) {
      this.model.updateStatus(event);
      console.log("button click heard and updateStatus called");
    },

    "click .habitAction": function(event) {

      if (!_.contains(event.target.parentElement.classList, 'highlighted')) {
        $('.highlighted').removeClass('highlighted');
        event.target.parentElement.classList.add('highlighted');

        this.showAside(this.model);

      }

    }

  },

  
  initialize: function() {

    this.bindEntityEvents(this.model.get("completions"), this.completionEvents);
    
  },

  showAside: function(model) {

    layoutView.getRegion('history').show(new app.HistoryView({model: model}));

    var notesArray = model.get("notes");
    if(Array.isArray(notesArray)) {
      var notesCollection = new app.Notes();
      notesCollection.add(notesArray);
      model.set("notes", notesCollection);
    }

    var newView = new app.NotesView({collection: model.get("notes")});
    layoutView.getRegion("notes").show(newView);

    $('#history-region').addClass('history-home-ui');
    $('#notes-region').addClass('notes-home-ui');


  },

  createNoteForm: function() {

    layoutView.getRegion('noteForm').show(new app.NoteFormView({ model: this.model }));
    $('#note-form-region').addClass('note-form-ui');

  },
  
  templateHelpers: function() {

    var model = this.model;

    var millisecondsInDay = 86400000;
    
    return {

      action: this.model.get('action'),
      quantity: this.model.get('quantity'),
      modelId: this.model.get('id'),

      calculateStatus: function (status) {
        console.log("status: ", status);
        var percent = status / this.quantity;
        if (status === undefined) {
          return "0%";
        } else if (percent <= 1) {
          return Math.round((status / this.quantity).toFixed(2) * 100) + "%";
        } else {
          return "100%";
        }

      },

      getStatusFromModel: function() {

        var today = Date.parse(habitsView.getDay("today"));
        
        var completionsCollection = model.get("completions");

        for (var i = 0; i < completionsCollection.length; i++) {
          if(completionsCollection.at(i).attributes) {
            if(Date.parse(completionsCollection.at(i).attributes.start_date) === today) {
              return completionsCollection.at(i).attributes.status;
            }
          } else {
            if(Date.parse(completionsCollection[i].start_date) === today) {
              return completionsCollection[i].status;
            }
          }
        }
      }
    };
  }


});
