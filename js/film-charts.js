const drawFilmDonuts = (data) => {

    //select the svg we'll be working in, set it up
    const svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

  const donutContainers = svg
    .append("g")
      .attr("transform", `translate(${margin.left},
        ${margin.top})`);

    //set up the pie charts
    const genres = ["Action", "Adventure", "Comedy"];
    const formats = data.columns.filter(format =>
        format !== "genre");
    //console.log(formats);

    
    genres.forEach(genre => {
        //create a group for each of the pie charts
        const donutContainer = donutContainers
            .append("g")
                .attr("transform", `translate(${xScale(genre)}, ${innerHeight/2})`)
                .attr("class", "#donut-container")

        //create the pie chart

          const genreData = data.find(d => d.genre === genre); 

        const formattedData = [];  

        formats.forEach(format => {                                         
            formattedData.push(
                { 
                    format: format,                             
                    year: genreData[format] 
                });                                   
        });   

        console.log(genre, formattedData);
        
        const pieGenerator = d3.pie()
            .value(d => d.year)

        const annotatedData = pieGenerator(formattedData);
        console.log(annotatedData);

        //generate the donuts
        const arcGenerator = d3.arc()
            .startAngle(d => d.startAngle) 
            .endAngle(d => d.endAngle)     
            .innerRadius(60)
            .outerRadius(100)
            .padAngle(0.02)
            .cornerRadius(3);

        const arcs = donutContainer
        .selectAll(`.arc-${genre}`)  
        .data(annotatedData)          
        .join("path")                 
            .attr("class", `arc-${genre}`)
            .attr("d", arcGenerator)
            .attr("fill", d => colorScale(d.data.format));


        
        //played around with formatting data:
        
        //console.log(data.length)
        //console.log(data[1])

        /*
        const formattedData = [];
        for (let i = 0; i < data.length; i++) 
        {
            let currentEntry = data[i]
            formattedData.push(
                {
                    genre : currentEntry.genre,
                    year : currentEntry.year,
                    gross : currentEntry.gross
                });
        }

        //console.log(formattedData);
        */
    });


}