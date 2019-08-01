import React from 'react';
import Container from "../Components/Container";
import Stars from "../Components/Stars";
import PlanetSVG from "../Components/PlanetSVG";
import * as d3 from "d3";
const innerPlanetsData = require("../Data/innerPlanetsData.json");

const InnerPlanets = () => {

    d3.select(".svg-body").remove();

    const innerPlanets = innerPlanetsData.data

    return (
        <Container
            page={"inner-planets"}
        >
            <Stars />
            {innerPlanets.map(innerPlanet => {
                return (
                    <PlanetSVG
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