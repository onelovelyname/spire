var app = app || {};

app.NoteView = Marionette.ItemView.extend({

  tagName: 'tr',

  template: _.template("<h4><%= getDate() %> - <%= location %></h4><p><%= text %></p>"),

  templateHelpers: function() {
    
    var context = this;

    return {

      text: this.model.get('text'),

      location: this.model.get('location') || "San Francisco",

      getDate: function() {

        var newDay;

        if (typeof context.model.get("start_date") === 'number') {
          newDay = new Date(context.model.get('start_date'));
        } else {
          newDay = new Date(Date.parse(context.model.get('start_date')));
        }
        var day = new Date(newDay);

        var dd = day.getUTCDate();
        var mm = day.getUTCMonth() + 1;
        var yyyy = day.getUTCFullYear();

        if(dd<10) {
          dd ='0'+ dd;
        }

        if(mm<10) {
          mm='0'+mm;
        }

        day = mm + '/' + dd + '/' + yyyy;

        return day;
      }

    };

  }

});
