import React, { useState, useEffect } from 'react';
import Container from "../Components/Container";
import Stars from "../Components/Stars";
import * as d3 from "d3";
import PlanetCard from '../Components/PlanetCard/PlanetCard';
import MoonCard from "../Components/MoonCard";
const dwarfData = require("../Data/dwarfData.json");

const Dwarf = () => {

    d3.select(".svg-body").remove();
    d3.select(".tool-tip-dwarf").remove();
    d3.select(".tool-tip-moon").remove();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMoonModalOpen, setIsMoonModalOpen] = useState(false);
    const [location, setLocation] = useState({ top: null, left: null })
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {

        d3.select(".dwarf-system").remove();
        d3.select("defs").remove()

        const data = dwarfData.data;

        const width = windowWidth;

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
                .attr("cx", `${100}%`)
                .attr("cy", `${50}%`)
                .attr("fx", `140%`)
                .attr("fy", `50%`)
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

            return `url(#gradient-${data.name})`;
        };

        const dwarfSystem = svg.append("g")
            .attr("class", "dwarf-system")
            .attr("transform", `translate(${width * 0.15}, 20)`);

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
                    .style("filter", glow(d))
                    .on("click", openModal)
                d3.select(this)
                    .append("text")
                    .text(d => d.name.charAt(0).toUpperCase() + d.name.slice(1))
                    .attr("transform", d => {
                        return `translate(-${(radiusScale(d.radius) / 10) + 15}, -${(radiusScale(d.radius) / 10) - 5}) rotate(-35)`
                    })
                    .style("fill", "white");
                d3.select(this)
                    .append("g")
                    .attr("class", "dwarf-moons")
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
                            .style("fill", radialGradient(d, true))
                            .on("click", openMoonModal)
                        d3.select(this)
                            .append("path")
                            .attr("id", `path-${d.name}`)
                            .style("fill", "none")
                            .attr("stroke", "none")
                            .attr("stroke-width", 0.5)
                            .attr("d", "M-45 -10 0 -40")
                        d3.select(this)
                            .append("text")
                            .attr("transform", d => `translate(10, ${Math.floor(-radiusScale(d.radius) / 10) + 20})`)
                            .style("text-anchor", "start")
                            .style("font-size", "0.8em")
                            .append("textPath")
                            .attr("xlink:href", d => `#path-${d.name}`)
                            .text(d => d.name.charAt(0).toUpperCase() + d.name.slice(1))
                            .attr("startOffset", "0%")
                            .attr("fill", "white")
                    })
            })
    }, [windowWidth]);

    const openModal = (d) => {
        setIsModalOpen(false)
        setIsMoonModalOpen(false)
        setModalData(d)
        setIsModalOpen(true);
    };

    const openMoonModal = (d) => {
        setModalData(d)
        setLocation({ top: d3.event.pageY, left: d3.event.pageX })
        setIsMoonModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsMoonModalOpen(false)
    }

    return (
        <>
            <Container
                page={"dwarf"}
            >
                <Stars />
                {isModalOpen ? <PlanetCard
                    data={modalData}
                    close={closeModal}
                    isPlanet={false}
                /> : null}
                {isMoonModalOpen ? <MoonCard
                    data={modalData}
                    location={location}
                    close={closeModal}
                /> : null}
                <h4 className="summary">{dwarfData.definition}</h4>
                <svg
                    id="svg-dwarf"
                    width={windowWidth - 20}
                    height="400px"
                ></svg>
            </Container>
        </>
    );
}

export default Dwarf;