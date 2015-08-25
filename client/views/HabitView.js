var app = app || {};

//////////////////////////////////////////////////////////
////////////    Marionette Implementation     ////////////
//////////////////////////////////////////////////////////

app.HabitView = Marionette.ItemView.extend({

  template: _.template("<td><button id='<%= modelId %>' class='button-success pure-button'>Complete</button></td><td data-id='<%= modelId %>' class='habitAction'><%= action %></td><td><%= quantity %></td><td><%= calculateStatus(getStatusFromModel()) %></td>"),

  tagName: 'tr',

  completionEvents: {
    "change:status": "render",
    "complete": "createNoteForm"
  },

  test: function() {
    console.log("Change in status heard in HabitView");
  },

  events: {

    "click button": function(event) {
      this.model.updateStatus(event);
      console.log("button click heard and updateStatus called");
    },

    "click .habitAction": function(event) {

      layoutView.getRegion('history').show(new app.HistoryView({model: this.model}));

      var notesArray = this.model.get("notes");
      if(Array.isArray(notesArray)) {
        var notesCollection = new app.Notes();
        notesCollection.add(notesArray);
        this.model.set("notes", notesCollection);
      }
 
      console.log("this.model.get(notes)", this.model.get("notes"));
      var newView = new app.NotesView({collection: this.model.get("notes")});
      layoutView.getRegion("notes").show(newView);

    }

  },

  initialize: function() {

    this.bindEntityEvents(this.model.get("completions"), this.completionEvents);
    
  },

  createNoteForm: function() {
    console.log("Completed habit for the day (inside createNote)!!");

    layoutView.getRegion('noteForm').show(new app.NoteFormView({ model: this.model }));
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

//////////////////////////////////////////////////////////
////////////    Backbone Implementation     //////////////
//////////////////////////////////////////////////////////

// app.HabitView = Backbone.View.extend({

//   tagName: 'tr',

//   template: Handlebars.compile($('#habitTemplate').html()),

//   render: function() {
//     return this.$el.html(this.template(this.model.attributes));
//   }
  
// });
