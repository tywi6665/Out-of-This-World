import React from 'react';
import * as d3 from "d3";
import "./Background.scss";
const backgroundData = require("../../Data/backgroundData.json");

const Background = () => {

    d3.select("svg-body").remove();

    //Defining global and constant variables
    const width = 100,
        height = 100,
        sunX = (width / 2), //Sun's horiontal position
        sunY = (height / 2), //Sun's vertical position
        t0 = new Date().setHours(0, 0, 0, 0), //Setting a time baseline
        delta = (Date.now() - t0); //Calculated change in time

    //Planetary Data 
    const planets = backgroundData.data;

    //Appending svg element to body
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width + "vw")
        .attr("height", height + "vh")
        .attr("class", "svg-body")
        .attr("style", "background: whitesmoke");

    //Appending Sun to svg
    svg.append("circle")
        .attr("r", 15)
        .attr("cx", sunX)
        .attr("cy", sunY)
        .attr("fill", "yellow")
        .attr("class", "the-sun");

    //Creating planetary system variable
    const planetarySystem = svg.append("g")
        .attr("class", "planetary-system")
        .attr("transform", `translate(${sunX}, ${sunY})`)

    //Appending planets and moons to planetary system container
    planetarySystem.selectAll("g.planet")
        .data(planets)
        .enter()
        .append("g")
        .attr("class", "planet-system")
        .each(function (d) {
            d3.select(this)
                .append("circle")
                .attr("class", "orbital")
                .attr("r", d.R);
            d3.select(this)
                .append("circle")
                .attr("r", d.r)
                .attr("cx", d.R)
                .attr("cy", 0)
                .attr("class", function (d) { return `${d.name} planet` })
            d3.select(this)
                .append("g")
                .attr("transform", `translate(${d.R}, 0)`)
                .selectAll("g.moon")
                .data(d.moons)
                .enter()
                .append("g")
                .attr("class", "lunar-system")
                .each(function (d) {
                    d3.select(this)
                        .append("circle")
                        .attr("r", d.r)
                        .attr("cx", d.R)
                        .attr("cy", 0)
                        .attr("class", "moon");
                })
                .attr("transform", function (d) {
                    return "rotate(" + (delta * (d.speed / 100)) + ")";
                });
        })
        .attr("transform", function (d) {
            return "rotate(" + (delta * (d.speed / 100)) + ")";
        });

    //Orbiting animation
    setInterval(() => {
        const delta = (Date.now() - t0);
        svg.selectAll(".planet-system, .lunar-system")
            .attr("transform", function (d) {
                return "rotate(" + (delta * (d.speed / 100)) + ")";
            });
    }, 40);

    return (
        <>
            <div className="background"></div>
        </>
    );
}

export default Background;