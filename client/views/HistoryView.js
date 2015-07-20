var app = app || {};

app.HistoryView = Marionette.ItemView.extend({

  //template: Handlebars.compile($('#historyTemplate').html())

  template: _.template("<h2>History of: <%= action %></h2>"),

  initialize: function() {

  },


  onShow: function() {

    this.chart = new app.Chart();
    this.chart(this.model, '#history-region');

  },

  templateHelpers: function () {

    var context = this;

    return {

      action: this.model.get('action'),

      createList: function() {
        var completions = context.model.get("completions");
        console.log("completions: ", completions);
        var list = "";
        for (var i = 0; i < completions.length; i++) {
          list += "<tr>"+"<td>"+completions[i].start_date+"</td>"+"<td>"+completions[i].end_date+"</td>"+"<td>"+completions[i].status+"</td>"+"</tr>";
        }
        return list;
      }

    };

  }

});
