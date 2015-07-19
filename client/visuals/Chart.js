var app = app || {},
  width = 960,
  height = 150,
  cellSize = 20;

var percent = d3.format(".1%"),
  format = d3.time.format("%Y-%m-%d");

var color = d3.scale.quantize()
  .domain([-0.05, 0.05])
  .range(d3.range(11).map(function (d) { return "q" + d + "-11"; }));

app.Chart = function (data, selection) {

  this.data = data;

  return function (data, selection) {

    var svg = d3.select(selection).append("svg")
      .attr("width", width)
      .attr("height", height);

      debugger;

      // .append("g")
      // .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");
    
  };

  // var svg = d3.select(selection).selectAll("svg")
  // //   .data(d3.range(2014, 2015))
  //   .enter().append("svg")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("class", "RdYlGn");
  //   .append("g")
  //     .attr("transform",
  //       "translate(" + ((width - cellSize * 53) / 2)) + "," + (height - cellSize * 7 - 1) + ")");

  // svg.append("text")
  //   .attr("transform", "translate(-6," + (cellSize * 3.5) + ")rotate(-90)" )
  //   .style("text-anchor", "middle")
  //   .text(function(d) { return d; });

  // var rect = svg.selectAll(".day")

};
