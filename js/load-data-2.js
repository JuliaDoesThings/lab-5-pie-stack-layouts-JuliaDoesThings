// Load data
d3.csv("./data/films.csv", d3.autoType).then(data => { 
  defineNewScales(data);
  drawFilmDonuts(data);
  
    /*defineScales(data);
  drawDonutCharts(data);
  drawStackedBars(data);
  drawStreamGraph(data);
  addLegend();
  */
 //console.log(data);
 //console.log(data.genre);
});