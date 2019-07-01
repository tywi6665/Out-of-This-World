import React from 'react';
import * as d3 from "d3";
import "./Background.scss";

const Background = () => {

    function solarSystem() {

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
                R: 23, r: 1, speed: -1.60, phi0: 35, moons: []
            },
            {
                R: 45, r: 2, speed: -1.17, phi0: 185, moons: []
            },
            {
                R: 87, r: 2, speed: -1.00, phi0: 135, moons: [   // earth
                    { R: 10, r: 1, speed: -9.00, phi0: 15 }           // the moon
                ]
            },
            {
                R: 140, r: 1, speed: -0.80, phi0: 235, moons: [   // mars
                    { R: 6, r: 0.5, speed: -3.80, phi0: 15 },          // phobos
                    { R: 9, r: 0.5, speed: -2.80, phi0: 115 }           // deimos
                ]
            },
            {
                R: 290, r: 15, speed: -0.43, phi0: 135, moons: [   // jupiter
                    { R: 30, r: 2, speed: -7.70, phi0: 25 },          // io
                    { R: 36, r: 1, speed: -2.45, phi0: 95 },          // europa
                    { R: 49, r: 3, speed: -1.10, phi0: 125 },          // ganymede
                    { R: 79, r: 2, speed: -0.50, phi0: 315 }           // callisto
                ]
            },
            {
                R: 583, r: 12, speed: -0.32, phi0: 260, moons: [   // saturn
                    { R: 28, r: 1, speed: -4.10, phi0: 120 },          // mimas
                    { R: 33, r: 1, speed: -3.90, phi0: 20 },          // enceladus
                    { R: 38, r: 1, speed: -3.60, phi0: 0 },          // tethys
                    { R: 44, r: 1, speed: -3.20, phi0: 100 },          // dione
                    { R: 58, r: 2, speed: -2.90, phi0: 300 },          // rhea
                    { R: 98, r: 5, speed: -1.30, phi0: 180 },          // titan
                    { R: 188, r: 2, speed: -0.10, phi0: 10 }           // lapetus
                ]
            }
        ];

        //Appending svg element to body
        const svg = d3.select("body")
            .append("svg")
            .attr("width", width + "vw")
            .attr("height", height + "vh");

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
                    .attr("class", "planet");
                // d3.select(this)
                //   .append("g")
                //   .attr("transform", `translate(${d.R}, 0)`)
                //   .selectAll("g.moon")
                //   .data(d.moons)
                //   .enter()
                //   .append("g"
                //     .attr("class", "lunar-system"))
                //   .each(function (d) {
                //     d3.select(this)
                //       .append("circle")
                //       .attr("class", "orbital")
                //       .attr("r", d.R);
                //     d3.select(this)
                //       .append("circle")
                //       .attr("r", d.r)
                //       .attr("cx", d.R)
                //       .attr("cy", 0)
                //       .attr("class", "moon");
                //   })
                //   .attr("transform", function (d) {
                //     return `rotate(${(d.phi0 + (delta * (d.speed / 100)))})`;
                //   });
            })
            .attr("transform", function (d) {
                return `rotate(${(d.phi0 + (delta * (d.speed / 100)))})`;
            });

        //Orbiting animation
        setInterval(function () {
            planetarySystem.selectAll(".planetary-system, .lunar-system")
                .attr("transform", function (d) {
                    return `rotate(${(d.phi0 + (delta * (d.speed / 100)))})`;
                });
        }, 40);
    };

    solarSystem();

    return (
        <div className="background"></div>
    );
}

export default Background;