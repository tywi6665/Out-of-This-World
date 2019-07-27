import React, { useEffect } from 'react';
import Container from "../Components/Container";
import Stars from "../Components/Stars";
import * as d3 from "d3";
const dwarfData = require("../Data/dwarfData.json");

const Dwarf = () => {

    d3.select(".svg-body").remove();

    useEffect(() => {

        const data = dwarfData.data;
        console.log(data)

        const height = 400,
            width = window.innerWidth,
            padding = 15;

        const svg = d3.select("#svg-dwarf")

        const radiusScale = d3.scaleLinear()
            .domain([0, d3.extent(data, (d) => d.radius)])
            .range([0, 400])

        const dwarfSystem = svg.append("g")
            .attr("class", "dwarf-system")
            .attr("transform", "translate(120, 0)")

        dwarfSystem.selectAll("g.dwarf-planet")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "dwarf-planet")
            .attr("transform", (d, i) => "translate(" + [(i * (width / data.length)), height / 2] + ")")
            .append("circle")
            .attr("r", 10)
            .style("fill", "white")

    }, [])

    return (
        <Container
            page={"dwarf"}
        >
            <Stars />
            <h4>{dwarfData.definition}</h4>
            <svg
                id="svg-dwarf"
                width="100%"
                height="400px"
            ></svg>
        </Container>
    );
}

export default Dwarf;