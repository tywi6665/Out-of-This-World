import React, { useEffect } from 'react';
import "./PlanetCard.scss";
import * as d3 from "d3";

const PlanetCard = ({ planet }) => {

    useEffect(() => {

        const planetData = [planet]
        console.log(planetData)

        const width = 150,
            height = 150;

        const svg = d3.select(`.planet-card-${planetData[0].name}`)
            .append("svg")
            .attr("width", `${width}px`)
            .attr("height", `${height}px`)
            .attr("class", `svg-${planetData[0].name}`);

        const definitions = d3.select(`.planet-card-${planetData[0].name}`).append("defs");
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
            .attr("class", "planet-area")
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
            .range([20, 10]);

        const graticuleScale = d3.scaleLinear()
            .domain(d3.extent(planetData, d => d.radius))
            .range([20, 10]);

        generatePlanet(planetData)

        function generatePlanet(data) {

            const rotation = [0, 0, data.tilt];
            const projection = d3.geoOrthographic()
                .translate([0, 0])
                .scale(radiusScale(data[0].radius))
                .clipAngle(90)
                .precision(0.1);

            const path = d3.geoPath()
                .projection(projection);
            const graticule = d3.geoGraticule();

            const body = boundingArea.append("g")
                .attr("class", `planet ${data[0].name}`)
                .attr("transform", `translate(${[boundingSize / 2, 0]})`)

            const defs = d3.select(`.planet-card-${data[0].name}`)
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
            // .style("fill", "url(#gradient-" + data[0].name + ")")
            // .style("filter", `url(#glow-${planetData[0].name})`);

            const gridLines = body.append("path")
                .attr("class", "graticule")
                .datum(graticule.step([graticuleScale(data[0].radius), graticuleScale(data[0].radius)]))
                .attr("d", path);
        }

    }, []);

    return (
        <>
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