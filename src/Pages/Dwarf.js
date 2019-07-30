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

        const defs = d3.select(`#svg-dwarf`).append("defs");

        let gradient = null;
        let filter = null

        function glow(data) {
            filter = defs.append("filter")
                .attr("id", `glow-${data.name}`);
            filter.append("feGaussianBlur")
                .attr("stdDeviation", 2)
                .attr("result", "coloredBlur");
            const feMerge = filter.append("feMerge")
            feMerge.append("feMergeNode")
                .attr("in", "coloredBlur");
            feMerge.append("feMergeNode")
                .attr("in", "SourceGraphic");

            return `url(#glow-${data.name})`
        }

        function radialGradient(data, isMoon) {
            gradient = defs.append("radialGradient")
                .attr("cx", `${isMoon ? "75%" : "100%"}`)
                .attr("cy", `${Math.random() * 100}%`)
                .attr("id", `gradient-${data.name}`)
                .attr("gradientTransform", `${isMoon ? "rotate(" + Math.random() * 90 + ")" : "rotate(0)"}`)

            if (isMoon) {
                gradient.append("stop")
                    .attr("offset", `${Math.random() * 50}%`)
                    .attr("stop-color", data.colors[0]);

                gradient.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", data.colors[1]);
            } else {
                gradient.append("stop")
                    .attr("offset", "5%")
                    .attr("stop-color", data.colors[0]);

                gradient.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", data.colors[1]);
            }

            return `url(#gradient-${data.name})`
        }

        const dwarfSystem = svg.append("g")
            .attr("class", "dwarf-system")
            .attr("transform", `translate(${width * 0.15}, 0)`)

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
                    .style("fill", radialGradient(d, false))
                    .style("filter", glow(d.name))
                // .on("click", showDwarfPlanetInfo)
                // .on("mouseout", hideInfo);

                // d3.select(this)
                //     .append("text")
                //     .text(d => d.name)
                //     .attr("transform", "translate(-50, -25)")
                //     .style("fill", "white");
                !d.moons.length ? console.log(`${d.name} doesn't have any moons :(`) : (
                    d3.select(this)
                        .append("g")
                        .attr("transform", `translate(0, 100)`)
                        .selectAll("g.dwarf-moon")
                        .data(d.moons)
                        .enter()
                        .append("g")
                        .attr("transform", (d, i) => `translate(0, ${(i) * 50})`)
                        .each(function (d) {
                            d3.select(this)
                                .append("circle")
                                .attr("class", `${d.name} dwarf-moon`)
                                .attr("r", radiusScale(d.radius) / 10)
                                .style("fill", "white")
                                .style("fill", radialGradient(d, true))
                        })
                )
            });

        // const dwarfPlanetModal = d3.select(`.container`)
        //     .append("div")
        //     .attr("class", `tool-tip-planet`)
        //     .style("opacity", 0);


        // function showDwarfPlanetInfo(d) {
        //     dwarfPlanetModal.transition()
        //         .delay(100)
        //         .duration(200)
        //         .style("opacity", 1);

        //     dwarfPlanetModal.html(`
        //                 <div>
        //                     <img src=${d.url} />
        //                     <h4>${d.name.charAt(0).toUpperCase() + d.name.slice(1)} ${d.symbol}</h4>
        //                     <p>${d.funFact}</p>
        //                     <span>
        //                         <ul>
        //                             <li><b>Mass:</b> ${d.mass}</li>
        //                             <li><b>Volume:</b> ${d.volume}</li>
        //                             <li><b>Mean Radius:</b> ${d.radius} km</li>
        //                             <li><b>Mean Orbital Distance:</b> ${d.orbitalDistance} km</li>
        //                             <li><b>Date of Discovery: </b>${d.discovery}</li>
        //                         </ul>
        //                         <ul>
        //                             <li><b>Axial Tilt:</b> ${d.tilt}°</li>
        //                             <li><b>Day Length:</b> ${d.dayLength} (compared to Earth)</li>
        //                             <li><b>Year Length:</b> ${d.yearLength} (compared to Earth)</li>
        //                             <li><b>Number of known moons: </b>${d.numMoons}</li>
        //                         </ul>
        //                     </span>
        //                 </div>`)
        // }

        // function hideInfo(d) {
        //     dwarfPlanetModal.transition()
        //         .duration(500)
        //         .style("opacity", 0)
        // }

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