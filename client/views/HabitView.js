var app = app || {};

//////////////////////////////////////////////////////////
////////////    Marionette Implementation     ////////////
//////////////////////////////////////////////////////////

app.HabitView = Marionette.ItemView.extend({

  //template: Handlebars.compile($('#habitTemplate').html()),
  template: _.template("<td><button id='<%= modelId %>'>Complete</button></td><td><%= action %></td><td><%= quantity %></td><td><%= getStatusFromModel() %></td>"),

  tagName: 'tr',

  completionEvents: {
    "change:status": "render"
  },

  events: {
    "click button": function(event) {
      this.model.updateStatus(event);
    }
  },

  initialize: function() {
    //this.listenTo(this.model, 'change', console.log("model changed!"));
    _.extend(this.model.get("completions"), Backbone.Events);

    this.bindEntityEvents(this.model.get("completions"), this.completionEvents);
  },
  
  templateHelpers: function() {

    var model = this.model;

    var millisecondsInDay = 86400000;
    
    return {

      getStatusFromModel: function() {

        var today = Date.parse(habitsView.getDay("today"));
        
        var completions = model.get("completions");

        for (var i = 0; i < completions.length; i++) {
          if(completions[i].attributes) {
            if(Date.parse(completions[i].attributes.start_date) === today) {
              return completions[i].attributes.status;
            }
          } else {
            if(Date.parse(completions[i].start_date) === today) {
              return completions[i].status;
            }
          }
          // if( Date.parse(completions[i].start_date) === today ) {
          //   if (completions[i].attributes) {
          //     return completions[i].attributes.status;
          //   } else {
          //     return completions[i].status;
          //   }
          // }
        }
      },

      action: this.model.get('action'),
      quantity: this.model.get('quantity'),
      modelId: this.model.get('id')
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
