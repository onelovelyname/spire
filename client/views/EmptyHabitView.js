var EmptyHabitView = Marionette.ItemView.extend({

  template: _.template("<td class='empty-habit-ui'>Looks like you aren't tracking any habits yet! Get started to your right.</td><td></td><td></td><td></td>"),

  tagName: 'tr'

});
