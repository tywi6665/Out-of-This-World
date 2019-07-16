import React, { useState, useEffect } from 'react';
import "./PlanetCard.scss";
import * as d3 from "d3";
import { Tween, Timeline } from "react-gsap";

const PlanetCard = ({ planet, page }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {

        const planetData = [planet];

        d3.select(`.svg-${planetData[0].name}`).remove();

        const width = windowWidth,
            height = 100;

        const svg = d3.select(`.planet-card-${planetData[0].name}`)
            .append("svg")
            .attr("width", `${width}px`)
            .attr("height", `${height}%`)
            .attr("class", `svg-planet svg-${planetData[0].name}`);

        const definitions = d3.select(`.svg-${planetData[0].name}`).append("defs");
        const filter = definitions.append("filter")
            .attr("id", `glow-${planetData[0].name}`);
        filter.append("feGaussianBlur")
            .attr("class", "blur")
            .attr("stdDeviation", 2)
            .attr("result", "coloredBlur");
        const feMerge = filter.append("feMerge")
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        const boundingSize = width - 10;
        const boundingArea = svg.append("g")
            .selectAll("g")
            .data(planetData)
            .enter()
            .append("g")
            .attr("class", `planet-area planet-area-${planetData[0].name}`)
            .attr("transform", (d, i) => `translate(${[0, height / 2]})`)
            .attr("width", `${width}px`)
            .attr("height", `${height}%`);

        // const boundingBox = boundingArea.append("rect")
        //     .attr("class", "bounding-box")
        //     .attr("y", -boundingSize / 2)
        //     .attr("width", `${width}%`)
        //     .attr("height", `${height - 4}%`);

        const radiusScale = d3.scaleLinear()
            .domain([0, 69911])
            .range([0, height * 1.5]);

        const orbitalScale = d3.scaleLinear()
            .domain([0, width - 50])
            .range([0, (boundingSize / 2) - 3]);

        // const graticuleScale = d3.scaleLinear()
        //     .domain(d3.extent(planetData, d => d.radius))
        //     .range([20, 10]);

        generatePlanet(planetData)

        function generatePlanet(data) {

            const moons = data[0].moons

            const rotation = [0, 0, data[0].tilt];
            // const projection = d3.geoOrthographic()
            //     .translate([0, 0])
            //     .scale(radiusScale(data[0].radius))
            //     .clipAngle(90)
            //     .precision(0.1);

            // const path = d3.geoPath()
            //     .projection(projection);
            // const graticule = d3.geoGraticule();

            const body = d3.select(`.planet-area-${data[0].name}`)
                .append("g")
                .attr("class", `planet ${data[0].name}-${page}`)
                .attr("transform", `translate(${[width / 8, height / 2.5]})`)

            const defs = d3.select(`.svg-${data[0].name}`)
                .select("defs");

            const gradient = defs.append("radialGradient")
                .attr("id", `gradient-${data[0].name}`)
                .attr("cx", "25%")
                .attr("cy", "25%");

            gradient.append("stop")
                .attr("offset", "5%")
                .attr("stop-color", data[0].colors[0]);

            gradient.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", data[0].colors[1]);

            const axis = body.append("line")
                .attr("class", "axis-line")
                .attr("x1", -(data[0].radius / 1000) * 1.4)
                .attr("x2", (data[0].radius / 1000) * 1.4)
                .attr("transform", `rotate(${90 - data[0].tilt})`);

            const fill = body.append("circle")
                .attr("r", data[0].radius / 1000)
                .style("fill", "url(#gradient-" + data[0].name + ")")
                .style("filter", `url(#glow-${data[0].name})`);

            const generateMoons = body.selectAll("g.moon")
                .data(data[0].moons)
                .enter()
                .append("g")
                .attr("transform", function (d) { return `translate(0, 0)` })
                .each(function (d, i) {
                    d3.select(this)
                        .append("circle")
                        .attr("r", radiusScale(d.radius))
                        // .attr("transform", function (d) { return `translate(${(orbitalScale(d.orbitalDistance)) / 1000}, 0)` })
                        .attr("cx", orbitalScale(d.orbitalDistance) / 1000)
                        .attr("cy", 0)
                        .attr("fill", d.colors[0])
                        .attr("class", `moon ${d.name}`)
                        .on("mouseover", showInfo)
                        .on("mouseout", hideInfo);
                })

            const div = d3.select(`.planet-card-${planet.name}`)
                .append("div")
                .attr("class", "tool-tip")
                .style("opacity", 0);

            function showInfo(d) {
                // d3.select(this)

                div.transition()
                    .delay(100)
                    .duration(200)
                    .style("opacity", 0.9);

                div.html("<p>Hey Hey Hey</p>")
                    .style("left", `${d3.event.pageX - 55}px`)
                    .style("top", `${d3.event.pageY - 125}px`)
            }

            function hideInfo(d) {
                // d3.select(this)

                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            }

            // const gridLines = d3.select(`.${data[0].name}-inner`)
            //     .append("path")
            //     .attr("class", "graticule")
            //     .datum({ type: "Sphere" })
            //     .attr("d", path);

            // d3.timer(function (elapsed) {
            //     projection.rotate([rotation[0] + elapsed * 0.01 / data.period, rotation[1] + elapsed * 0 / data.period, rotation[2]])
            //     gridLines.attr("d", path);
            // })
        };
    }, [windowWidth]);

    return (
        <>
            {/* <Timeline
                wrapper={<span className="tweened-span-inner" />}
                target={
                    <div className={`planet-card planet-card-${planet.name}`}></div>
                }
            >
                <Tween from={{ transform: "translateY(-150px)", opacity: 0 }} to={{ transform: "translateY(0px)", opacity: 1 }} duration={3} />
            </Timeline> */}
            {/* <Timeline
                wrapper={<span className="tweened-span-inner" />}
                target={
                    <div className={`planet-info planet-info-${planet.name}`}>
                        <p>{planet.name}</p>
                        <p>Radius: {planet.radius}km</p>
                        <p>Axial Tilt: {planet.tilt}°</p>
                        <p>Day Length: {planet.period}</p>
                    </div>
                }
            >
                <Tween from={{ transform: "translateY(-150px)", opacity: 0 }} to={{ transform: "translateY(0px)", opacity: 1 }} duration={3} />
            </Timeline> */}
            <div className={`planet-card planet-card-${planet.name}`}></div>
            <div className={`planet-info planet-info-${planet.name}`}>
                <p>{planet.name}</p>
                <p>Radius: {planet.radius}km</p>
                <p>Axial Tilt: {planet.tilt}°</p>
                <p>Day Length: {planet.period}</p>
            </div>
        </>
    );
}

export default PlanetCard;