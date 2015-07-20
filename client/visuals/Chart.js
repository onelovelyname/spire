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
      
          var day = new Date(completion.start_date);
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

          processedData[day] = completion.status / data.get("quantity");
        
      });

      resolve(processedData);

    });

  },

  createChart: function(processedData, selection) {

      var width = 960,
        height = 136,
        cellSize = 17; // cell size

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
          .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

       svg.append("text")
          .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
          .style("text-anchor", "middle")
          .text(function(d) {
            // this d refers to the range of years set above in the data method
            return d;
          });

      var rect = svg.selectAll(".day")
        .data(function(d) {
            // d is 2015, as set in svg data method
            // this method returns all days in range of 2015
            return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
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
          .datum(format);


        rect.filter(function(d) {
          return d in processedData;
        })
        .attr("class", function(d) {
            console.log("color(processedData[d])", color(processedData[d]));
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

      svg.selectAll(".month")
          .data(function(d) {
            // d is 2015, as set in svg data method
            // this method returns all months in range of 2015
            return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1));
          })
        .enter().append("path")
          .attr("class", "month")
          .attr("d", monthPath);


      function monthPath(t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
            d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
        return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
          + "H" + w0 * cellSize + "V" + 7 * cellSize
          + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
          + "H" + (w1 + 1) * cellSize + "V" + 0
          + "H" + (w0 + 1) * cellSize + "Z";
      }

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

