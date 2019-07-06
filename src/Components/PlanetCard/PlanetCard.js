import React, { useEffect } from 'react';
import "./PlanetCard.scss";
import * as d3 from "d3";

const PlanetCard = ({ planet }) => {

    useEffect(() => {

        const width = 150,
            height = 150;

        const svg = d3.select(`.planet-card-${planet.name}`)
            .append("svg")
            .attr("width", `${width}px`)
            .attr("height", `${height}px`)
            .attr("class", `svg-${planet.name}`);

        const definitions = d3.select("svg").append("defs");
        const filter = definitions.append("filter")
            .attr("id", "glow");
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
            .select("g")
            .data(planet)
            .enter()
            // .append("g")
            .attr("transform", `translate(${width / 2, height / 2})`)
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
            .domain([0, planet.radius])
            .range([20, 10]);

        const rotation = [0, 0, planet.tilt];
        const projection = d3.geoOrthographic()
            .translate([0, 0])
            .scale(radiusScale())
            .clipAngle(90)
            .precision(0.1);

        const path = d3.geoPath()
            .projection(projection);
        const graticule = d3.geoGraticule();

        const body = boundingArea.append("g")
            .attr("class", `planet ${planet.name}`)
            .attr("transform", `translate(${[boundingSize / 2, 0]})`)

    }, []);

    return (
        <>
            <div className={`planet-card planet-card-${planet.name}`}></div>
            <div className={`planet-info planet-info-${planet.name}`}>
                <p>{planet.name}</p>
                <p>Radius: {planet.radius}</p>
                <p>Axial Tilt: {planet.tilt}</p>
                <p>Day Length: {planet.period}</p>
            </div>
        </>
    );
}

export default PlanetCard;