import React, { useState } from 'react';
// import "./OuterPlanets.scss";
import Container from "../../Components/Container";
import PlanetCard from "../../Components/PlanetCard";
import * as d3 from "d3";

const OuterPlanets = () => {

    const [outerPlanets, setOuterPlanets] = useState([
        {
            name: "jupiter", tilt: 25.19, radius: 69911, period: 0.41, colors: ["#d8ca9d", "#a59186"],
            moons: [
                { name: "io", radius: 1821, orbitalDistance: 421700, colors: ["#c9be66", "#d7ce8a"] },
                { name: "europa", radius: 1560, orbitalDistance: 670900, colors: ["#b7b19c", "#88754e"] },
                { name: "ganymede", radius: 2634, orbitalDistance: 1069200, colors: ["#463b2f", "#b8a598"] },
                { name: "callisto", radius: 2410, orbitalDistance: 1885000, colors: ["#887c6f", "#3a4b68"] }
            ]
        },
        {
            name: "saturn", tilt: 26.73, radius: 58232, period: 0.44, colors: ["#f4d587", "#f4a587"],
            moons: [
                { name: "mimas", radius: 198, orbitalDistance: 185000, colors: ["grey", "lightgrey"] },
                { name: "enceladus", radius: 252, orbitalDistance: 237948, colors: ["lightgrey", "#fff"] },
                { name: "tethys", radius: 1062, orbitalDistance: 294619, colors: ["grey", "lightgrey"] },
                { name: "dione", radius: 1123, orbitalDistance: 377396, colors: ["lightgrey", "grey"] },
                { name: "rhea", radius: 1527, orbitalDistance: 527108, colors: ["grey", "lightgrey"] },
                { name: "titan", radius: 2575, orbitalDistance: 1221870, colors: ["#6e6a4c", "#dac461"] },
                { name: "lapetus", radius: 1470, orbitalDistance: 3560820, colors: ["#fff", "#403b1d"] }
            ]
        },
        { name: "uranus", tilt: 82.23, radius: 25362, period: -0.72, colors: ["#e1eeee", "#adb0c3"], moons: [] },
        { name: "neptune", tilt: 28.32, radius: 24622, period: 0.72, colors: ["#85addb", "#3f54ba"], moons: [] }
    ])

    d3.select(".svg-body").remove();

    return (
        <Container
            page={"outer-planets"}
        >
            <div className="stars">
                <div className="star-group1"></div>
                <div className="star-group2"></div>
                <div className="star-group3"></div>
            </div>
            {outerPlanets.map(outerPlanet => {
                return (
                    <PlanetCard
                        planet={outerPlanet}
                        page={"outer"}
                        key={outerPlanet.name}
                    />
                )
            })}
        </Container>
    );
}

export default OuterPlanets;