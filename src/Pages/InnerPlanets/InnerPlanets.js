import React from 'react';
// import "./InnerPlanets.scss";
import Container from "../../Components/Container";
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
            <div className="stars">
                <div className="star-group1"></div>
                <div className="star-group2"></div>
                <div className="star-group3"></div>
            </div>
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