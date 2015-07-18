var app = app || {};

app.HistoryView = Marionette.ItemView.extend({

  //template: Handlebars.compile($('#historyTemplate').html())

  template: _.template("<p>HistoryView</p><p><%= action %></p><table> <%= createList() %> </table>"),

  templateHelpers: function () {

    console.log("model in HistoryView: ", this.model);
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
