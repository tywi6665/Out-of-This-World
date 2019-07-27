import React from 'react';
import Container from "../Components/Container";
import Stars from "../Components/Stars";
import * as d3 from "d3";
const dwarfData = require("../Data/dwarfData.json");

const Dwarf = () => {

    d3.select(".svg-body").remove();

    return (
        <Container
            page={"dwarf"}
        >
            <Stars />
            <p>{dwarfData.definition}</p>
        </Container>
    );
}

export default Dwarf;