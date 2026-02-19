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
    //const genres = ["Action"];
    const genres = ["Action", "Adventure", "Comedy"];
    const formats = data.columns.filter(format =>
        format !== "genre");
    //console.log(formats);

    svg
        .append("text")
            .text("Film Genres Broken Down By Release Year")
            .attr("y", 35)
            .attr("x", 10);

    //honestly no idea why the position is fighting me like this. time to slap a solution together i guess?
    let adjustment = 0;

    genres.forEach(genre => {
        //create a group for each of the pie charts
        //fuck it i guess we hardcode the postition??
        if (genre === "Adventure") 
        {
            adjustment += 120;
        }

        const donutContainer = donutContainers
            .append("g")
                .attr("transform", `translate(${xScale(genre) + adjustment}, ${innerHeight/2})`)
                .attr("class", `#donut-container-${genre}`)

            console.log(genre, ": ", `translate(${xScale(genre) + adjustment}, ${innerHeight/2})`)

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
            .join("g")
                .attr("class", `arc-${genre}`);
            
        arcs
            .append("path")                 
                .attr("class", `arc-${genre}`)
                .attr("d", arcGenerator)
                .attr("fill", d => colorScale(d.data.format));

        arcs
            .append("text")
                .text(d => {
                d["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI);
                console.log(d3.format(".0%")(d.percentage)) //debugging: num is being calculated
                return d3.format(".0%")(d.percentage); 
                })
                .attr("x", d => {
                d["centroid"] = arcGenerator
                    .startAngle(d.startAngle)
                    .endAngle(d.endAngle)
                    .centroid();
                //console.log(d.centroid[0]) debugging: centroid number makes sense
                return d.centroid[0];
                })
                .attr("class", "#percentage-label")
                .attr("y", d => d.centroid[1])
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("fill", "#f6fafc") //debugging: changing this to black changes nothing 
                .attr("fill-opacity", d => d.percentage < 0.05 ? 0 : 1)
                .style("font-size", "16px")
                .style("font-weight", 500);


        donutContainer
            .append("text")
                .text(genre)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .style("font-size", "24px")
                .style("font-weight", 500);

        adjustment = adjustment + 200;
        console.log("adj: ", adjustment);

        if (genre === "Adventure") 
        {
            adjustment -= 120;
        }

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