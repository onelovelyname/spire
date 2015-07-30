module.exports = {

  getDay: function(date) {
 
    var day = new Date();
    var dd = 0;

    if (date === "today") {
      dd = day.getDate();
    } else if (date === "tomorrow") {
      dd = day.getDate() + 1;
    }

    var mm = day.getMonth() + 1;
    var yyyy = day.getFullYear();

    if(dd<10) {
      dd ='0'+ dd;
    }

    if(mm<10) {
      mm='0'+mm;
    }

    day = yyyy + '-' + mm + '-' + dd + ' 00:00:00+07';
    console.log("day in getDay: ", day);

    return day;

  }

};
