var app = app || {};

app.NoteView = Marionette.ItemView.extend({

  tagName: 'tr',

  template: _.template("<td><%= getDate() %></td><td><%= text %></td>"),

  templateHelpers: function() {
    
    var context = this;

    return {

      text: this.model.get('text'),

      getDate: function() {
        console.log("date type: ", typeof context.model.get("start_date"));
        var newDay;
        if (typeof context.model.get("start_date") === 'number') {
          newDay = new Date(context.model.get('start_date'));
        } else {
          newDay = new Date(Date.parse(context.model.get('start_date')));
        }

        var day = new Date(newDay);

        var dd = day.getDate();
        var mm = day.getMonth() + 1;
        var yyyy = day.getFullYear();

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
