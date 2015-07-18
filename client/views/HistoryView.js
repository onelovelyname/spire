var app = app || {};

app.HistoryView = Marionette.ItemView.extend({

  //template: Handlebars.compile($('#historyTemplate').html())

  template: _.template("<p>HistoryView</p><p><%= action %></p>"),

  templateHelpers: function () {

    return {

      action: this.model.get('action')

    };

  }

});
