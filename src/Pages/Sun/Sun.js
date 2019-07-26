import React, { useEffect } from 'react';
import Container from "../../Components/Container";
import Stars from "../../Components/Stars";
import * as d3 from "d3";
const sunData = require("../../Data/sunData.json");

const Sun = () => {

    d3.select(".svg-body").remove();

    useEffect(() => {

        const svg = d3.select("#svg-sun")
            .append("g")
            .attr("transform", "translate(250, 250)")

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

        defs.append("radialGradient")
            .attr("id", "sun-gradient")
            .selectAll("stop")
            .data([
                { offset: "0%", color: "#FFF76B" },
                { offset: "50%", color: "#FFF845" },
                { offset: "90%", color: "#FFDA4E" },
                { offset: "100%", color: "#FB8933" }
            ])
            .enter().append("stop")
            .attr("offset", (d) => d.offset)
            .attr("stop-color", (d) => d.color);

        const projection = d3.geoOrthographic()
            .scale(240)
            .translate([0, 0])
            .clipAngle(90)
            .precision(0.3);

        const path = d3.geoPath()
            .projection(projection)

        const graticule = d3.geoGraticule();

        svg.append("path")
            .datum({ type: "Sphere" })
            .attr("class", "sphere")
            .attr("d", path)
            .style("fill", "url(#sun-gradient)")
            .style("filter", "url(#glow-sun)");

        svg.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path)
            .style("fill", "none");

        svg.selectAll("path.sunspot")
            .data([{ lat: 0.1278, long: 51.5074 }])
            .enter().append("path")
            .attr("class", "sunspot")
            .datum(function (d) {
                return {
                    type: "Point",
                    coordinates: [d.long, d.lat]
                };
            })
            .attr("d", path)
            .style("fill", "black");

        const allPaths = d3.selectAll("path");
        const time = Date.now();
        const rotate = [10, 0],
            velocity = [.003, -.001];

        d3.timer(() => {
            let dt = Date.now() - time;
            projection.rotate([rotate[0] + velocity[0] * dt, 0]);
            allPaths.attr("d", path);
        });

    }, []);

    return (
        <Container
            page={"sun"}
        >
            <Stars />
            <div className="sun-info">
                <h4>{sunData.name} {sunData.symbol}</h4>
                <p>{sunData.funFact}</p>
                <ul>
                    <li><b>Type:</b> {sunData.type}</li>
                    <li><b>Mass:</b> {sunData.mass}</li>
                    <li><b>Volume:</b> {sunData.volume}</li>
                    <li><b>Mean Radius:</b> {sunData.radius} km</li>
                    <li><b>Core Temperature:</b> {sunData.tempCore}</li>
                    <li><b>Surface Temperature:</b> {sunData.tempSurface}</li>
                    <li><b>Coronal Temperature:</b> {sunData.tempCorona}</li>
                    <li><b>Age:</b> {sunData.age}</li>
                    <li><b>Distance to Milky Way Core:</b> {sunData.galacticDistance}</li>
                    <li><b>Orbital Period:</b> {sunData.orbitalPeriod}</li>
                </ul>
            </div>
            <svg id="svg-sun"
                width="500px"
                height="500px"
            ></svg>
        </Container>

    );
}

export default Sun;