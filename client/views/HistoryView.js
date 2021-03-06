var app = app || {};

app.HistoryView = Marionette.ItemView.extend({

  template: _.template("<h2>History of: <%= action %></h2>"),

  completionEvents: {
    "change:status": "render updateChart"
  },

  showChart: function() {
    
    app.Chart.processData(this.model).then(function(processedData) {
      app.Chart.createChart(processedData, '#history-region');
    });

  },

  initialize: function() {
    var context = this;

    $(window).on("resize", function() {
      console.log("resizing heard!");
      context.showChart();
    });

    _.extend(this.model.get("completions"), Backbone.Events);
    this.bindEntityEvents(this.model.get("completions"), this.completionEvents);

  },

  updateChart: function() {
    
    app.Chart.processData(this.model).then(function(processedData){
      app.Chart.updateChart(processedData, '#history-region');
    });
  
  },

  onShow: function() {

    this.showChart();

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
