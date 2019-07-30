import React, { useState, useEffect } from 'react';
import Container from "../Components/Container";
import Stars from "../Components/Stars";
import * as d3 from "d3";
const dwarfData = require("../Data/dwarfData.json");

const Dwarf = () => {

    d3.select(".svg-body").remove();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {

        d3.select(".dwarf-system").remove();

        const data = dwarfData.data;

        const height = 400,
            width = windowWidth;

        const svg = d3.select("#svg-dwarf");

        const radiusScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.radius)])
            .range([0, 400]);

        const dwarfSystem = svg.append("g")
            .attr("class", "dwarf-system")
            .attr("transform", `translate(${width * 0.15}, 0)`)
        //     .selectAll("g")
        //     .data(data)
        //     .enter()
        //     .append("g")
        //     .attr("class", d => `dwarf-system dwarf-system-${d.name}`)
        //     .attr("transform", (d, i) => "translate(" + [(i * ((width - width * 0.15) / data.length)), 50] + ")")
        //     .append("g")
        //     .attr("class", "dwarf-planet")
        //     .append("circle")
        //     .attr("class", d => `${d.name}`)
        //     .attr("r", d => radiusScale(d.radius) / 10)
        //     .style("fill", "white")
        //     .each((d) => {
        //         console.log(this)
        //     })

        // generateDwarfPlanets(data);

        // function generateDwarfPlanets(data) {
        //     console.log(data);

        //     const dwarfPlanet = d3.select(`.dwarf-system`)
        //         .selectAll("g")
        //         .data(data)
        //         .append("g")
        // };
        dwarfSystem.selectAll("g.dwarf-planet")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "dwarf-planet-moons")
            .attr("transform", (d, i) => "translate(" + [(i * ((width - width * 0.15) / data.length)), 50] + ")")
            .each(function (d) {
                d3.select(this)
                    .append("circle")
                    .attr("class", d => `dwarf-planet ${d.name}`)
                    .attr("r", d => radiusScale(d.radius) / 10)
                    .style("fill", "white")
                !d.moons.length ? console.log(`${d.name} doesn't have any moons :(`) : (
                    d3.select(this)
                        .append("g")
                        .attr("transform", (d, i) => `translate(0, ${(i + 1) * 50})`)
                        .selectAll("g.dwarf-moon")
                        .data(d.moons)
                        .enter()
                        .append("g")
                        .each(function (d) {
                            d3.select(this)
                                .append("circle")
                                .attr("class", `${d.name} dwarf-moon`)
                                .attr("r", radiusScale(d.radius) / 10)
                                .style("fill", "white")
                                .attr("transform", (d, i) => `translate(0, ${(i) * 50})`)
                        })
                )
            })


        // dwarfSystem.selectAll("g.dwarf-planet")
        //     .data(data)
        //     .enter()
        //     .each((d) => {
        //         console.log(this)
        //         d3.select(this)
        //             .selectAll("g.dwarf-moon")
        //             .data(d.moons)
        //             .enter()
        //             .each(function (d) {
        //                 d3.select(this)
        //                     .append("g")
        //                     .attr("class", "dwarf-lunar-system")
        //                     .append("circle")
        //                     .attr("r", d => radiusScale(d.radius) / 10)
        //                     .attr("transform", (d, i) => "translate(" + [0, (i * 10) + 50] + ")")
        //                     .attr("class", "dwarf-moon")
        //                     .style("fill", "red");
        //             })
        //     })



    }, [windowWidth]);

    return (
        <Container
            page={"dwarf"}
        >
            <Stars />
            <h4>{dwarfData.definition}</h4>
            <svg
                id="svg-dwarf"
                width={windowWidth - 20}
                height="400px"
            ></svg>
        </Container>
    );
}

export default Dwarf;