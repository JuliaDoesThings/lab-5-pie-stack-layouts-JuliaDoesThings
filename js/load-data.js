// Load data
d3.csv("./data/data.csv", d3.autoType).then(data => { //same issue as before, still had to change double dot to a single dot?
  defineScales(data);
  drawDonutCharts(data);
  drawStackedBars(data);
  drawStreamGraph(data);
  addLegend();
});