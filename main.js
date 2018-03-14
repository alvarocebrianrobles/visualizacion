
// 1. Setting every variable to null. They are going to be change later with functions
let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; 

setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendChartBars();

// 2. Setting up the size of the canvas and in which part of it is going to be working 
function setupCanvasSize() {
  margin = {top: 10, left: 80, bottom: 20, right: 30};
  width = 700 - margin.left - margin.right;
  height = 340 - margin.top - margin.bottom; //Change the height value
}

function appendSvg(domElement) {
  svg = d3.select(domElement).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",`translate(${margin.left}, ${margin.top})`);
}

// 3. Setting up the axis scale
    // It is necessary to change scale x and y when showing the chart vertically
function setupYScale()
{
  var maxSales = d3.max(totalSales, function(d, i) {
    return d.sales;
  });

  y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, maxSales]);

}

function setupXScale()
{
  x = d3.scaleBand()
    .rangeRound([0, width-100])
    .domain(totalSales.map(function(d, i) {
      return d.product;
    }));
}

// 4. Transforming axis and grouping SVG shapes together

function appendXAxis() {
  // Add the X Axis
  svg.append("g")
    .attr("transform",`translate(0, ${height})`)
    .call(d3.axisBottom(x));
}

function appendYAxis() {
  // Add the Y Axis
  svg.append("g")
  .call(d3.axisLeft(y));
}

// 5. Inserting bars into the SVG created before
function appendChartBars()
{
    var rects = svg.selectAll('rect')
    .data(totalSales);

    // Now it's time to append to the list of Rectangles we already have
    var newRects = rects.enter();

    var color = d3.scaleOrdinal()
    .range(['green', 'red', 'blue']);

    // Let's append a new Rectangles
    newRects.append('rect')
      .attr('y', function(d) {
        return y(d.sales);})
      .attr('x', function(d, i) {
        return x(d.product);
      })
      // Changing bandwidth to add some space between columns
      .attr('width', x.bandwidth()-4)
      .attr('height', function(d, i) {
        return height - y(d.sales);
      })
      .attr("fill", function(d) { 
        return color(d.product); 
        });
    
    var legend = svg.selectAll(".legend")
        .data(totalSales.slice())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });
    
    legend.append("rect")
        .attr("x", 520)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d, i) {
            return color(d.product);
        });
    
    legend.append("text")
        .attr("x", 600)
        .attr("y", 10)
        .attr("dy", ".15em")
        .style("text-anchor", "end")
        .text(function (d) { return d.product; });
}



