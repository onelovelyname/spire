module.exports = {

  getDay: function(date) {
 
    var day = new Date();

    if (date === "tomorrow") {
      day.setDate(day.getDate() + 1);
    }

    var dd = day.getDate();
    var mm = day.getMonth() + 1;
    var yyyy = day.getFullYear();

    if(dd<10) {
      dd ='0'+ dd;
    }

    if(mm<10) {
      mm='0'+mm;
    }

    day = yyyy + '-' + mm + '-' + dd;
    console.log("day in Helper: ", day);

    return day;

  }

};
