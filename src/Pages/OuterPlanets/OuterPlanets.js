import React, { useState } from 'react';
// import "./OuterPlanets.scss";
import Container from "../../Components/Container";
import PlanetCard from "../../Components/PlanetCard";
import * as d3 from "d3";

const OuterPlanets = () => {

    const [outerPlanets, setOuterPlanets] = useState([
        { name: "jupiter", tilt: 25.19, radius: 69911, period: 0.41, colors: ["#d8ca9d", "#a59186"], moons: [] },
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