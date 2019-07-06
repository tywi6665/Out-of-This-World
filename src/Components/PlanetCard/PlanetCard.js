import React, { useEffect } from 'react';
import "./PlanetCard.scss";
import * as d3 from "d3";

const PlanetCard = ({ planet }) => {

    useEffect(() => {

        const width = 100,
            height = 100;

        const svg = d3.select(`.planet-card-${planet.name}`)
            .append("svg")
            .attr("width", `${width}%`)
            .attr("height", `${height}%`)
            .attr("class", `svg-${planet.name}`);

        const boundingSize = width - 10;
        const boundingArea = svg.append("g")
            .select("g")
            .data(planet)
            .enter()
            .append("g")
            .attr("transform", (d, i) => {
                return `translate(${[i * (boundingSize + 10), height / 2]})`
            })
        // .on("mouseover", showInfo)
        // .on("mouseout", hideInfo);

        const boundingBox = boundingArea.append("rect")
            .attr("class", "bounding-box")
            .attr("y", -boundingSize / 2)
            .attr("width", boundingSize)
            .attr("height", boundingSize);

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