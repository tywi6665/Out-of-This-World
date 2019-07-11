import React, { useEffect } from 'react';
import "./PlanetCard.scss";
import * as d3 from "d3";
import { Tween, Timeline } from "react-gsap";

const PlanetCard = ({ planet }) => {

    useEffect(() => {

        const planetData = [planet]

        const width = 150,
            height = 150;

        const svg = d3.select(`.planet-card-${planetData[0].name}`)
            .append("svg")
            .attr("width", `${width}px`)
            .attr("height", `${height}px`)
            .attr("class", `svg-${planetData[0].name}`);

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
            .attr("transform", (d, i) => `translate(${[i * (boundingSize + 10), height / 2]})`)
            // .on("mouseover", showInfo)
            // .on("mouseout", hideInfo);
            .attr("width", boundingSize)
            .attr("height", boundingSize);

        const boundingBox = boundingArea.append("rect")
            .attr("class", "bounding-box")
            .attr("y", -boundingSize / 2)
            .attr("width", boundingSize)
            .attr("height", boundingSize);

        const radiusScale = d3.scaleLinear()
            .domain([0, d3.max(planetData, d => d.radius)])
            .range([20, (boundingSize / 4) - 3]);

        const graticuleScale = d3.scaleLinear()
            .domain(d3.extent(planetData, d => d.radius))
            .range([20, 10]);

        generatePlanet(planetData)

        function generatePlanet(data) {

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
                .attr("class", `planet ${data[0].name}-inner`)
                .attr("transform", `translate(${[boundingSize / 2, 0]})`)

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
                .attr("x1", -radiusScale(data[0].radius) * 1.4)
                .attr("x2", radiusScale(data[0].radius) * 1.4)
                .attr("transform", `rotate(${90 - data[0].tilt})`);

            const fill = body.append("circle")
                .attr("r", radiusScale(data[0].radius))
                .style("fill", "url(#gradient-" + data[0].name + ")")
                .style("filter", `url(#glow-${data[0].name})`);

            const moons = d3.select(`.${data[0].name}-inner`)
                .append("g")
                .attr("transform", `translate(50, 0)`)
                .data(data[0].moons)
                .append("g")
                .each(function (d) {
                    d3.select(this)
                        .append("circle")
                        .attr("r", radiusScale(d.radius))
                        // .attr("cx", d.R)
                        // .attr("cy", 0)
                        .attr("fill", "white")
                        .attr("class", `inner-moon ${d.name}`);
                })

            // data[0].moons ? generateMoons(data[0].moons) : console.log("no moons")

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

        // function generateMoons(data) {
        //     console.log(data)
        // };

    }, []);

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