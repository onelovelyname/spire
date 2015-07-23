var app = app || {},
  width = 1200,
  height = 150,
  cellSize = 20;

app.Chart = {

  processData: function(data) {

    return new Promise(function(resolve, reject) {

      var unProcessedData = data.get("completions");

      var processedData = {};

      unProcessedData.forEach(function(completion) {
      
          var day = new Date(completion.get("start_date"));
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

          processedData[day] = completion.get("status") / data.get("quantity");
        
      });

      console.log("processedData: ", processedData);

      resolve(processedData);

    });

  },

  createChart: function(processedData, selection) {

      var cellSize = 15; // cell size
      var width = cellSize * 32,
        height = (width * 0.25);

      var today = new Date();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      var year = today.getFullYear();

      var monthLibrary = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var dayLibrary = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

      var percent = d3.format(".1%"),
        format = d3.time.format("%Y-%m-%d");

      var color = d3.scale.quantize()
        .domain([0.0, 1.0])
        .range(d3.range(6).map(function(d) {
          return "q" + d;
        }));

      var svg = d3.select(selection).selectAll("svg")
          .data(d3.range(2015, 2016))
        .enter().append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "rgb-color")
        .append("g")
          .attr("transform", "translate(" + 20 + "," + (height - cellSize * 7 - 1) / 2 + ")");

        dayLibrary.forEach(function(day, index){
          var yPosition = 13 + cellSize * index;
          svg.append("text")
            .attr("transform", "translate(-10," + yPosition +")")
            .attr("class", "labelText")
            .style("text-anchor", "middle")
            .text(day);
        });

      var rect = svg.selectAll(".day")
        .data(function(d) {
            // d is 2015, as set in svg data method
            // this method returns all days in range of 2015
            return d3.time.days(new Date(year, 0, 1), new Date(year, month, 1));
          })
        .enter().append("rect")
          .attr("class", "day")
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("x", function(d) {
            return d3.time.weekOfYear(d) * cellSize;
          })
          .attr("y", function(d) {
            return d.getDay() * cellSize;
          })
          .datum(format)
          .attr("data-date", function(d) {
            return d;
          });


        rect.filter(function(d) {
          return d in processedData;
        })
        .attr("data-status", function(d){
          return processedData[d];
        })
        .attr("class", function(d) {
            return "day " + color(processedData[d]);
          });

      rect.append("title")
          .text(function(d) {
            if(processedData[d] !== undefined) {
              return d + ": " + processedData[d];
            } else {
              return d;
            }
          });

      var monthRect = svg.selectAll(".month")
          .data(function(d) {
            // d is 2015, as set in svg data method
            // this method returns all months in range of 2015
            return d3.time.months(new Date(year, 0, 1), new Date(year, month, 1));
          });


      monthRect.enter().append("text")
          .attr("transform", function(d) {
            var xPosition = d.getMonth() * cellSize * 4.5;
            return "translate(" + xPosition + ", -6)";
          })
          .style("text-anchor", "middle")
          .attr("class", "labelText")
          .text(function(d) {
            return monthLibrary[d.getMonth()];
          });

      // monthRect.enter().append("path")
      //     .attr("class", "month")
      //     .attr("d", monthPath);


      // function monthPath(t0) {
      //   var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      //       d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
      //       d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
      //   return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      //     + "H" + w0 * cellSize + "V" + 7 * cellSize
      //     + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      //     + "H" + (w1 + 1) * cellSize + "V" + 0
      //     + "H" + (w0 + 1) * cellSize + "Z";
      // }

  },

  updateChart: function (processedData, selection) {
   
    var color = d3.scale.quantize()
      .domain([0.0, 1.0])
      .range(d3.range(6).map(function(d) {
        return "q" + d;
      }));

    var rects = d3.selectAll('svg').selectAll('.day')
    .filter(function(d) {
      return d in processedData;
    });

    rects.attr("class", function(d) {
        console.log("color(processedData[d])", color(processedData[d]));
        return "day " + color(processedData[d]);
      });

  }

};

// Attribution: http://bl.ocks.org/mbostock/4063318

