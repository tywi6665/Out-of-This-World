import React, { useState } from 'react';
import "./InnerPlanets.scss";
import Container from "../../Components/Container";
import PlanetCard from "../../Components/PlanetCard";
import * as d3 from "d3";

const InnerPlanets = () => {

    const [innerPlanets, setInnerPlanets] = useState([
        { name: "mercury", tilt: 0.03, radius: 2439.7, period: 58.65, colours: ["#e7e8ec", "#b1adad"] },
        { name: "venus", tilt: 2.64, radius: 6051.8, period: -243, colours: ["#f8e2b0", "#d3a567"] },
        { name: "earth", tilt: 23.44, radius: 6371, period: 1, colours: ["#9fc164", "#6b93d6"] },
        { name: "mars", tilt: 6.68, radius: 3389.5, period: 1.03, colours: ["#ef1501", "#ad0000"] }
    ])

    d3.select(".svg-body").remove();

    return (
        <>
            <div className="inner-planets-page">
                <div className="stars">
                    <div className="star-group1"></div>
                    <div className="star-group2"></div>
                    <div className="star-group3"></div>
                </div>
            </div>
            <Container
                page={"inner-planets"}
            >
                {innerPlanets.map(innerPlanet => {
                    return (
                        <PlanetCard
                            planet={innerPlanet}
                            key={innerPlanet.name}
                        />
                    )
                })}
            </Container>
        </>
    );
}

export default InnerPlanets;