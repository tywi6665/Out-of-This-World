import React, { useEffect } from 'react';
import Container from "../../Components/Container";
import Stars from "../../Components/Stars";
import * as d3 from "d3";
const sunData = require("../../Data/sunData.json");

const Sun = () => {

    d3.select(".svg-body").remove();

    useEffect(() => {

        const sunspotData = sunData.sunspotLocations;
        const composition = sunData.composition;
        const radius = 50;

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

        defs.append("radialGradient")
            .attr("id", "sunspot-gradient")
            .selectAll("stop")
            .data([
                { offset: "0%", color: "#000000" },
                { offset: "80%", color: "#200000" },
                { offset: "100%", color: "#fe6006" }
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
            .data(sunspotData)
            .enter().append("path")
            .attr("class", "sunspot")
            .datum(function (d) {
                return {
                    type: "Point",
                    coordinates: [d.long, d.lat]
                };
            })
            .attr("d", path)
            .attr("fill", "url(#sunspot-gradient)")
            .attr("fill-opacity", 0.7)

        const allPaths = d3.selectAll("path");
        const time = Date.now();
        const rotate = [10, 0],
            velocity = [.010, -.001];

        d3.timer(() => {
            let dt = Date.now() - time;
            projection.rotate([rotate[0] + velocity[0] * dt, 0]);
            allPaths.attr("d", path);
        });

        const pie = d3.pie()
            .sort(null)
            .value(d => d.value)

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(100, 100) / 2 - 1)

        const arcs = pie(composition);
        const pieSvg = d3.select("#svg-composition")
            .attr("viewBox", [-50, -50, 100, 100]);

        const color = d3.scaleLinear()
            .domain(d3.extent(composition, d => d.value))
            .range(["#bc5090", "#ffa600"]);

        pieSvg.append("g")
            .attr("stroke", "white")
            .selectAll("path.pie-path")
            .data(arcs)
            .join("path")
            .attr("class", "pie-path")
            .attr("fill", d => color(d.value))
            .attr("d", arc);

        pieSvg.selectAll("allPolylines")
            .data(arcs)
            .enter()
            .append("polyline")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr("points", (d) => {
                let posA = arc.centroid(d);
                let posB = arc.centroid(d);
                let posC = arc.centroid(d);
                let midangle = d.startAngle + (d.endAngle - d.startAngle);
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                return [posA, posB, posC]
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
                    <li>
                        <b>Composition: </b>
                        <svg id="svg-composition"
                            width="100px"
                            height="100px"
                        ></svg>
                    </li>
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