import React from 'react';
import Container from "../../Components/Container";
import Stars from "../../Components/Stars";
import PlanetCard from "../../Components/PlanetCard";
import * as d3 from "d3";
const innerPlanetsData = require("../../Data/innerPlanetsData.json");

const InnerPlanets = () => {

    d3.select(".svg-body").remove();

    const innerPlanets = innerPlanetsData.data

    return (
        <Container
            page={"inner-planets"}
        >
            <Stars />
            {innerPlanets.map(innerPlanet => {
                console.log(innerPlanet)
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