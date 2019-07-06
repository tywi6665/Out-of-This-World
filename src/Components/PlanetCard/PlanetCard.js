import React from 'react';
import * as d3 from "d3";

const PlanetCard = ({ planet }) => {
    return (
        <div className={`planet-card planet-card-${planet.name}`}>
            {planet.name}
        </div>
    );
}

export default PlanetCard;