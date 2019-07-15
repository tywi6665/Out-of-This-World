import React, { useState } from 'react';
// import "./InnerPlanets.scss";
import Container from "../../Components/Container";
import PlanetCard from "../../Components/PlanetCard";
import * as d3 from "d3";

const InnerPlanets = () => {

    const [innerPlanets, setInnerPlanets] = useState([
        { name: "mercury", tilt: 0.03, radius: 2439.7, period: 58.65, colors: ["#e7e8ec", "#b1adad"], moons: [] },
        { name: "venus", tilt: 2.64, radius: 6051.8, period: -243, colors: ["#f8e2b0", "#d3a567"], moons: [] },
        {
            name: "earth", tilt: 23.44, radius: 6371, period: 1, colors: ["#9fc164", "#6b93d6"],
            moons: [
                { name: "the-moon", radius: 1736, orbitalDistance: 385000, colors: ["grey", "lightgrey"] }
            ]
        },
        {
            name: "mars", tilt: 6.68, radius: 3389.5, period: 1.03, colors: ["#ef1501", "#ad0000"],
            moons: [
                { name: "phobos", radius: 11, orbitalDistance: 9350, colors: ["grey"] },
                { name: "deimos", radius: 6, orbitalDistance: 23460, colors: ["grey"] }
            ]
        }
    ])

    d3.select(".svg-body").remove();

    return (
        <Container
            page={"inner-planets"}
        >
            <div className="stars">
                <div className="star-group1"></div>
                <div className="star-group2"></div>
                <div className="star-group3"></div>
            </div>
            {innerPlanets.map(innerPlanet => {
                return (
                    <PlanetCard
                        planet={innerPlanet}
                        page={"inner"}
                        key={innerPlanet.name}
                    />
                )
            })}
        </Container>
    );
}

export default InnerPlanets;