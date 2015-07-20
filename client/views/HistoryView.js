var app = app || {};

app.HistoryView = Marionette.ItemView.extend({

  //template: Handlebars.compile($('#historyTemplate').html())

  template: _.template("<h2>History of: <%= action %></h2><table><%= createList() %> </table>"),

  completionEvents: {
    "change:status": "render updateChart"
  },

  initialize: function() {

    _.extend(this.model.get("completions"), Backbone.Events);
    this.bindEntityEvents(this.model.get("completions"), this.completionEvents);

  },

  onShow: function() {

    var context = this;
    this.chart = app.Chart;
    this.chart.processData(this.model).then(function(processedData) {
      context.chart.createChart(processedData, '#history-region');
    });

  },

  updateChart: function() {
    var context = this;
    this.chart.processData(this.model).then(function(processedData){
      context.chart.updateChart(processedData, '#history-region');
    });
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
