const drawDonutCharts = (data) => {
  // Generate the donut charts here
  const svg = d3.select("#donut")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  const donutContainers = svg
    .append("g")
      .attr("transform", `translate(${margin.left},
        ${margin.top})`);


  const years = [1975, 1995, 2013];
  const formats = data.columns.filter(format => //we dont need the column label saying what year it is
      format != "year"
  );

  years.forEach(year => {
    const donutContainer = donutContainers //copy pasted from the textbook this line. why did it work and the one i typed threw an error. to look at later.
    .append("g")
      .attr("transform", `translate(${xScale(year)}, ${innerHeight/2})`);

    const yearData = data.find(d => d.year === year); //make sure its a year we care about
    
    const formattedData = [];

    formats.forEach(format => {
      formattedData.push({ format: format,
        sales: yearData[format] });
    });

    formats.forEach(format => console.log(format));

    const pieGenerator = d3.pie()
    .value(d => d.sales);

  const annotatedData = pieGenerator(formattedData);

  const arcGenerator = d3.arc()
    .startAngle(d => d.startAngle) 
    .endAngle(d => d.endAngle)     
    .innerRadius(60)
    .outerRadius(100)
    .padAngle(0.02)
    .cornerRadius(3);

  const arcs = donutContainer
    .selectAll(`.arc-${year}`)  
    .data(annotatedData)          
    .join("path")                 
      .attr("class", `arc-${year}`)
      .attr("d", arcGenerator);  
  });
  
};