const xScale = d3.scaleBand();
const colorScale = d3.scaleOrdinal();

const defineNewScales = (data) => {
    //console.log("goss", data.map(d => d.genre));

    xScale
        .domain(data.map(d => d.genre))
        .range([0, innerWidth])
        .paddingInner(0.2);

    //magic lines from the given code formatsInfo i guess where did it come from where did it goes 
    // something something cotten eye joe
    colorScale
        .domain(formatsInfo.map(f => f.id))
        .range(formatsInfo.map(f => f.color))
};