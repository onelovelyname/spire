var moment = require('moment');

module.exports = {

  getDay: function(date) {

    if (date === "today") {
      return moment.utc().local().format('YYYY-MM-DD');
    } else if (date === "tomorrow") {
      return moment.utc().add(1, 'day').local().format('YYYY-MM-DD');
    }

    return;

  }

};
