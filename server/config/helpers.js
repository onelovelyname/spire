module.exports = {

  getDay: function(date) {
 
    var day = new Date();

    if (date === "tomorrow") {
      day.setDate(day.getDate() + 1);
    }

    var dd = day.getUTCDate();
    var mm = day.getUTCMonth() + 1;
    var yyyy = day.getUTCFullYear();

    if(dd<10) {
      dd ='0'+ dd;
    }

    if(mm<10) {
      mm='0'+mm;
    }

    //day = mm + '/' + dd + '/' + yyyy;
    day = yyyy + '-' + mm + '-' + dd;

    return day;

  }

};
