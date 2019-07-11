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
                { name: "Io", radius: 1821, orbitalDistance: 421700, colors: ["#c9be66", "#d7ce8a"] },
                { name: "Europa", radius: 1560, orbitalDistance: 670900, colors: ["#b7b19c", "#88754e"] },
                { name: "Ganymede", radius: 2634, orbitalDistance: 1069200, colors: ["#463b2f", "#b8a598"] },
                { name: "Callisto", radius: 2410, orbitalDistance: 1885000, colors: ["#887c6f", "#3a4b68"] }]
        },
        { name: "saturn", tilt: 26.73, radius: 58232, period: 0.44, colors: ["#f4d587", "#f4a587"], moons: [] },
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