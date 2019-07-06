import React from 'react';
import "./PlanetCard.scss";
import * as d3 from "d3";
import { transform } from '@babel/core';

const PlanetCard = ({ planet }) => {

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

    return (
        <div className={`planet-card planet-card-${planet.name}`}>
            {planet.name}
        </div>
    );
}

export default PlanetCard;