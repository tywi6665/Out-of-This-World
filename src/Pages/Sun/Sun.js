import React, { useEffect } from 'react';
import Container from "../../Components/Container";
import Stars from "../../Components/Stars";
import * as d3 from "d3";


const Sun = () => {

    d3.select(".svg-body").remove();

    useEffect(() => {
        const svg = d3.select("#svg-sun")
            .append("g")
            .attr("transform", "translate(150, 150)")
            .append("circle")
            .attr("r", 100)
            .style("fill", "yellow");
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