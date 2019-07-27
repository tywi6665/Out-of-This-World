import React from 'react';
import Container from "../Components/Container";
import Stars from "../Components/Stars";
import PlanetCard from "../Components/PlanetCard";
import * as d3 from "d3";
const outerPlanetData = require("../Data/outerPlanetsData.json");

const OuterPlanets = () => {

    d3.select(".svg-body").remove();

    const outerPlanets = outerPlanetData.data;

    return (
        <Container
            page={"outer-planets"}
        >
            <Stars />
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