import React, { useEffect } from 'react';
import Container from "../../Components/Container";
import Stars from "../../Components/Stars";
import * as d3 from "d3";
const sunData = require("../../Data/sunData.json");

const Sun = () => {

    d3.select(".svg-body").remove();

    useEffect(() => {

        console.log(sunData)
        const svg = d3.select("#svg-sun")
            .append("g")
            .attr("transform", "translate(150, 150)")

        const defs = svg.append("defs");
        const filter = defs.append("filter")
            .attr("id", `glow-sun`);
        filter.append("feGaussianBlur")
            .attr("stdDeviation", 10)
            .attr("result", "coloredBlur");
        const feMerge = filter.append("feMerge")
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        svg.append("circle")
            .attr("r", 100)
            .style("fill", "yellow")
            .style("filter", "url(#glow-sun)");
    }, []);

    return (
        <Container
            page={"sun"}
        >
            <Stars />
            <div className="sun-info-left">
                Deets
            </div>
            <svg id="svg-sun"
                width="300px"
                height="300px"
            ></svg>
            <div className="sun-info-right">
                Deets
            </div>
        </Container>

    );
}

export default Sun;