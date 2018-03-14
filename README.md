# 01 - Mandatory Exercise

Taking the "barchart refactor" sample that can be downloaded from here:

https://github.com/Lemoncode/d3js-samples

The goal of this exercise is:

-  Add some space between columns.

-  Add colors to each bar.

-  Add a legend.

-  Show the chart vertically.

**Step by step solution**

1. First part of the exercise can be done just subtracting some px from attribute 'width' when filling SVG with bars

```javascript
  .attr('width', y.bandwidth()-4)
```

2. Second part has been done by adding a new variable 'color' which stablishes them and adding a new attribute to the rectangle making function (bars painting):

```javascript
  var color = d3.scaleOrdinal()
  .range(['green', 'red', 'blue']);

newRects.append('rect')
// here there are some others attributes
  .attr("fill", function(d) { 
    return color(d.product); 
  });
```

3. Part three consists in add a new variable 'legend' to the rectangles making function (bars painting function) like shown below:

```javascript
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
```

4. For last, in order to exchange X axis for Y axis is needed to make some adjustmens:

    - Change scales config. Note that y range has to be changed for height-0, instead of 0-width.

          ```javascript
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
          ````

    - Change x and y attributes

          ```javascript
          newRects.append('rect')
            .attr('y', function(d) {
              return y(d.sales);})
            .attr('x', function(d, i) {
              return x(d.product);
            })
          ```
    
    - Change width and height attributes
          
          ```javascript
            .attr('width', x.bandwidth()-4)
            .attr('height', function(d, i) {
              return height - y(d.sales);
            })
          ```