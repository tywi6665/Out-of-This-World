import React, { useState, useEffect } from 'react';
import Container from "../Components/Container";
import Stars from "../Components/Stars";
import * as d3 from "d3";
const dwarfData = require("../Data/dwarfData.json");

const Dwarf = () => {

    d3.select(".svg-body").remove();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {

        d3.select(".dwarf-system").remove();

        const data = dwarfData.data;

        const height = 400,
            width = windowWidth;

        const svg = d3.select("#svg-dwarf");

        const radiusScale = d3.scaleLinear()
            // .domain(d3.extent(data, d => d.radius))
            .domain([0, 1188.3])
            .range([0, 400]);

        const dwarfSystem = svg.append("g")
            .attr("class", "dwarf-system")
            .attr("transform", `translate(${width * 0.15}, 0)`);

        dwarfSystem.selectAll("g.dwarf-planet")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "dwarf-planet")
            .attr("transform", (d, i) => "translate(" + [(i * ((width - width * 0.15) / data.length)), 50] + ")")
            .append("circle")
            .attr("class", d => `${d.name}`)
            .attr("r", d => radiusScale(d.radius) / 10)
            .style("fill", "white");

    }, [windowWidth]);

    return (
        <Container
            page={"dwarf"}
        >
            <Stars />
            <h4>{dwarfData.definition}</h4>
            <svg
                id="svg-dwarf"
                width={windowWidth - 20}
                height="400px"
            ></svg>
        </Container>
    );
}

export default Dwarf;