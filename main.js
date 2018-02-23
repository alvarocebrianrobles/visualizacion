var totalSales = [
  { product: 'Hoodie', sales: 7 },
  { product: 'Jacket', sales: 6 },
  { product: 'Snuggie', sales: 9 },
  ];

var svg = d3.select('svg');

var rects = svg.selectAll('rect')
  .data(totalSales);

var maxSales = d3.max(totalSales, function(d, i) {
  return d.sales;
});

var x = d3.scaleLinear()
  .range([0, 350])
  .domain([0, maxSales]);

var y = d3.scaleBand()
  .rangeRound([0, 75])
  .domain(totalSales.map(function(d, i) {
    return d.product;
   }));

var newRects = rects.enter();

var color = d3.scaleOrdinal()
    .range(['green', 'red', 'blue']);

newRects.append('rect')
  .attr('x', x(0))
  .attr('y', function(d, i) {
    return y(d.product);
  })
  .attr('height', y.bandwidth()-2)
  .attr('width', function(d, i) {
    return x(d.sales);
  })
  .attr("fill", function(d) { 
    return color(d.product); 
    });

function drawBarchChart(width, height) {
  var svg = d3.select('svg');
  drawBarchChart(svg._groups[0][0].clientWidth, svg._groups[0][0].clientHeight);
}

