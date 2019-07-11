import React from 'react';
import * as d3 from "d3";
import "./Background.scss";

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
    const planets = [
        {
            name: "mercury",
            R: 25, r: 1, speed: -1.60, phi0: 35,
            moons: []
        },
        {
            name: "venus",
            R: 45, r: 2, speed: -1.17, phi0: 185,
            moons: []
        },
        {
            name: "earth",
            R: 90, r: 2, speed: -1.00, phi0: 135,
            moons: [
                //the moon
                { R: 10, r: 1, speed: -9.00, phi0: 15 }
            ]
        },
        {
            name: "mars",
            R: 140, r: 1, speed: -0.80, phi0: 235,
            moons: [
                //Phobos
                { R: 6, r: 0.5, speed: -3.80, phi0: 15 },
                //Deimos
                { R: 9, r: 0.5, speed: -2.80, phi0: 115 }
            ]
        },
        {
            name: "jupiter",
            R: 290, r: 15, speed: -0.43, phi0: 135,
            moons: [
                //Io
                { R: 30, r: 1.5, speed: -7.70, phi0: 25 },
                //Europa
                { R: 36, r: 0.8, speed: -2.45, phi0: 95 },
                //Ganymede
                { R: 49, r: 2.5, speed: -1.10, phi0: 125 },
                //Callisto
                { R: 69, r: 1.5, speed: -0.50, phi0: 315 }
            ]
        },
        {
            name: "saturn",
            R: 550, r: 12, speed: -0.32, phi0: 260,
            moons: [
                //Mimas
                { R: 28, r: 0.8, speed: -4.10, phi0: 120 },
                //Enceladus         
                { R: 33, r: 0.8, speed: -3.90, phi0: 20 },
                //Tethys         
                { R: 38, r: 0.8, speed: -3.60, phi0: 0 },
                //Dione         
                { R: 44, r: 0.8, speed: -3.20, phi0: 100 },
                //Rhea        
                { R: 52, r: 1.5, speed: -2.90, phi0: 300 },
                //Titan    
                { R: 62, r: 2.2, speed: -1.30, phi0: 180 },
            ]
        },
        {
            name: "uranus",
            R: 850, r: 8, speed: -0.10, phi0: 325,
            moons: [
                //Puck
                { R: 15, r: 0.5, speed: -4.10, phi0: 120 },
                //Miranda       
                { R: 25, r: 0.8, speed: -3.90, phi0: 20 },
                //Ariel       
                { R: 30, r: 1.2, speed: -3.60, phi0: 0 },
                //Umbriel       
                { R: 35, r: 1.0, speed: -3.20, phi0: 100 },
                //Titania      
                { R: 50, r: 1.5, speed: -2.90, phi0: 300 },
                //Oberon        
                { R: 60, r: 1.3, speed: -1.30, phi0: 180 },]
        },
        {
            name: "neptune",
            R: 1200, r: 7, speed: -0.05, phi0: 500,
            moons: [
                //Triton
                { R: 25, r: 1.2, speed: 2.90, phi0: 20 }
            ]
        }
    ];

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
        .attr("class", "sun");

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
                    // d3.select(this)
                    //     .append("circle")
                    //     .attr("class", "orbital")
                    //     .attr("r", d.R);
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
            <div className="disclaimer">
                <p>*Not to Scale</p>
            </div>
        </>
    );
}

export default Background;