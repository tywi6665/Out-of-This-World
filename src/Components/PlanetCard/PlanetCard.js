import React, { useState, useEffect } from 'react';
import "./PlanetCard.scss";
import * as d3 from "d3";
import { Tween, Timeline } from "react-gsap";

const PlanetCard = ({ planet, page }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {

        const planetData = [planet];

        d3.select(`.svg-${planetData[0].name}`).remove();

        const width = 2700,
            height = planetData[0].radius / 250;

        const svg = d3.select(`.planet-card-${planetData[0].name}`)
            .append("svg")
            .attr("width", `${width}px`)
            .attr("height", `${height}px`)
            .attr("class", `svg-planet svg-${planetData[0].name}`);

        const definitions = d3.select(`.svg-${planetData[0].name}`).append("defs");
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

        const radiusScale = d3.scaleLinear()
            .domain([0, planetData[0].radius])
            .range([0, height]);

        const orbitalScale = d3.scaleLinear()
            .domain([0, width - 50])
            .range([0, (boundingSize / 2) - 3]);

        const boundingArea = svg.append("g")
            .selectAll("g")
            .data(planetData)
            .enter()
            .append("g")
            .attr("class", `planet-area planet-area-${planetData[0].name}`)
            .attr("transform", (d, i) => `translate(${[radiusScale(planetData[0].radius) / 5, height / 2]})`)
            .attr("width", `${width}px`)
            .attr("height", `${height}px`);

        generatePlanet(planetData)

        function generatePlanet(data) {

            const moons = data[0].moons

            const rotation = [0, 0, data[0].tilt];

            const body = d3.select(`.planet-area-${data[0].name}`)
                .append("g")
                .attr("class", `planet ${data[0].name}-${page}`)
                .attr("transform", `translate(${[width / 10, height / 2.5]})`)

            const defs = d3.select(`.svg-${data[0].name}`)
                .select("defs");

            let gradient = null;

            data[0].name === "jupiter" ? linearGradient() : radialGradient(data[0], false);

            function radialGradient(data, isMoon) {
                gradient = defs.append("radialGradient")
                    .attr("cx", `${isMoon ? "75%" : "100%"}`)
                    .attr("cy", "50%")
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

            function linearGradient() {
                gradient = defs.append("linearGradient")
                    .attr("id", `gradient-${data[0].name}`)
                    .attr("x1", "5%")
                    .attr("x2", "100%")
                    .attr("y1", "25%")
                    .attr("y2", "75%")
                    .attr("gradientTransform", "rotate(36)");

                gradient.append("stop")
                    .attr("offset", "5%")
                    .attr("stop-color", data[0].colors[0]);

                gradient.append("stop")
                    .attr("offset", "8%")
                    .attr("stop-color", data[0].colors[1]);

                gradient.append("stop")
                    .attr("offset", "12%")
                    .attr("stop-color", data[0].colors[2]);

                gradient.append("stop")
                    .attr("offset", "20%")
                    .attr("stop-color", data[0].colors[3]);

                gradient.append("stop")
                    .attr("offset", "25%")
                    .attr("stop-color", data[0].colors[1]);

                gradient.append("stop")
                    .attr("offset", "30%")
                    .attr("stop-color", data[0].colors[5]);

                gradient.append("stop")
                    .attr("offset", "40%")
                    .attr("stop-color", data[0].colors[6]);

                gradient.append("stop")
                    .attr("offset", "45%")
                    .attr("stop-color", data[0].colors[7]);

                gradient.append("stop")
                    .attr("offset", "52%")
                    .attr("stop-color", data[0].colors[8]);

                gradient.append("stop")
                    .attr("offset", "58%")
                    .attr("stop-color", data[0].colors[9]);

                gradient.append("stop")
                    .attr("offset", "70%")
                    .attr("stop-color", data[0].colors[10]);

                gradient.append("stop")
                    .attr("offset", "75%")
                    .attr("stop-color", data[0].colors[11]);

                gradient.append("stop")
                    .attr("offset", "80%")
                    .attr("stop-color", data[0].colors[12]);

                gradient.append("stop")
                    .attr("offset", "85%")
                    .attr("stop-color", data[0].colors[13]);

                gradient.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", data[0].colors[14]);
            }

            const axis = body.append("line")
                .attr("class", "axis-line")
                .attr("x1", -(data[0].radius / 250) * 1.3)
                .attr("x2", (data[0].radius / 250) * 1.3)
                .attr("transform", `rotate(${90 - data[0].tilt})`);

            const fill = body.append("circle")
                .attr("r", radiusScale(data[0].radius))
                .style("fill", "url(#gradient-" + data[0].name + ")")
                .style("filter", `url(#glow-${data[0].name})`)
                .on("click", showPlanetInfo)
                .on("mouseout", hideInfo);

            if (data[0].name === "jupiter") {
                d3.select(".great-red-spot").remove();
                const greatRedSpot = d3.select(".planet-card-jupiter")
                    .append("div")
                    .attr("class", "great-red-spot");
            };

            if (data[0].name === "saturn") {
                d3.select(".saturn-rings").remove();
                const rings = d3.select(".planet-card-saturn")
                    .append("div")
                    .attr("class", "saturn-rings");
            }

            const generateMoons = body.selectAll("g.moon")
                .data(data[0].moons)
                .enter()
                .append("g")
                .attr("transform", function (d) { return `translate(0, 0)` })
                .each(function (d, i) {
                    d3.select(this)
                        .append("circle")
                        .attr("r", radiusScale(d.radius))
                        .attr("transform", function (d) { return `translate(${((orbitalScale(d.orbitalDistance)) / 1000) + radiusScale(data[0].radius)}, 0)` })
                        .attr("class", `moon ${d.name}`)
                        .style("fill", radialGradient(d, true))
                        .style("filter", `url(#glow-${data[0].name})`)
                        .on("mouseover", showMoonInfo)
                        .on("mouseout", hideInfo);
                });

            const moonModal = d3.select(`.container`)
                .append("div")
                .attr("class", "tool-tip-moon")
                .style("opacity", 0);

            const planetModal = d3.select(`.container`)
                .append("div")
                .attr("class", `tool-tip-planet`)
                .style("opacity", 0);

            function showPlanetInfo(d) {
                planetModal.transition()
                    .delay(100)
                    .duration(200)
                    .style("opacity", 1);

                planetModal.html(`
                        <div>
                            <img src=${d.url} />
                            <h4>${d.name.charAt(0).toUpperCase() + d.name.slice(1)} ${d.symbol}</h4>
                            <p>${d.funFact}</p>
                            <ul>
                                <li><b>Mass:</b> ${d.mass} km</li>
                                <li><b>Volume:</b> ${d.volume} km</li>
                                <li><b>Mean Radius:</b> ${d.radius} km</li>
                                <li><b>Mean Orbital Distance:</b> ${d.orbitalDistance} km</li>
                                <li><b>Date of Discovery: </b>${d.discovery}</li>
                                <li><b>Axial Tilt:</b> ${d.tilt}°</li>
                                <li><b>Day Length:</b> ${d.period} (compared to Earth)</li>
                                <li><b>Number of known moons: ${d.numMoons}</b></li>
                            </ul>
                        </div>`)
            }

            function showMoonInfo(d) {
                moonModal.transition()
                    .delay(100)
                    .duration(200)
                    .style("opacity", 1);

                moonModal.html(`
                        <img src=${d.url} />
                        <div>
                            <h4>${d.name.charAt(0).toUpperCase() + d.name.slice(1)}</h4>
                            <ul>
                                <li><b>Mean Radius:</b> ${d.radius} km</li>
                                <li><b>Mean Orbital Distance:</b> ${d.orbitalDistance} km</li>
                                <li><b>Date of Discovery: </b>${d.discovery}</li>
                            </ul>
                        </div>`)
                    .style("left", `${d3.event.pageX - 275}px`)
                    .style("top", `${d3.event.pageY + 25}px`);
            }

            function hideInfo(d) {
                planetModal.transition()
                    .duration(500)
                    .style("opacity", 0)

                moonModal.transition()
                    .duration(500)
                    .style("opacity", 0)
            }

            // d3.timer(function (elapsed) {
            //     projection.rotate([rotation[0] + elapsed * 0.01 / data.period, rotation[1] + elapsed * 0 / data.period, rotation[2]])
            //     gridLines.attr("d", path);
            // })
        };
    }, []);

    return (
        <>
            {/* <Timeline
                wrapper={<span className="tweened-span-inner" />}
                target={
                    <div className={`planet-card planet-card-${planet.name}`}></div>
                }
            >
                <Tween from={{ transform: "translateY(-150px)", opacity: 0 }} to={{ transform: "translateY(0px)", opacity: 1 }} duration={3} />
            </Timeline> */}
            {/* <Timeline
                wrapper={<span className="tweened-span-inner" />}
                target={
                    <div className={`planet-info planet-info-${planet.name}`}>
                        <p>{planet.name}</p>
                        <p>Radius: {planet.radius}km</p>
                        <p>Axial Tilt: {planet.tilt}°</p>
                        <p>Day Length: {planet.period}</p>
                    </div>
                }
            >
                <Tween from={{ transform: "translateY(-150px)", opacity: 0 }} to={{ transform: "translateY(0px)", opacity: 1 }} duration={3} />
            </Timeline> */}
            <div className={`planet-card planet-card-${planet.name}`}></div>
            <div className={`planet-info planet-info-${planet.name}`}>
                <h2>{planet.systemName.charAt(0).toUpperCase() + planet.systemName.slice(1)} System</h2>
            </div>
        </>
    );
}

export default PlanetCard;