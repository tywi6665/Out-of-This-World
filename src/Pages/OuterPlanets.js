import React, { useState } from 'react';
import Container from "../Components/Container";
import Stars from "../Components/Stars";
import PlanetSVG from "../Components/PlanetSVG";
import PlanetCard from "../Components/PlanetCard";
import MoonCard from "../Components/MoonCard";
import * as d3 from "d3";
const outerPlanetData = require("../Data/outerPlanetsData.json");

const OuterPlanets = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMoonModalOpen, setIsMoonModalOpen] = useState(false);
    const [location, setLocation] = useState({ top: null, left: null })
    const [modalData, setModalData] = useState(null);

    d3.select(".svg-body").remove();

    const outerPlanets = outerPlanetData.data;

    const openModal = (d) => {
        setIsModalOpen(false)
        setIsMoonModalOpen(false)
        setModalData(d)
        setIsModalOpen(true);
    };

    const openMoonModal = (d) => {
        setModalData(d)
        setLocation({ top: d3.event.pageY, left: d3.event.pageX })
        setIsMoonModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsMoonModalOpen(false)
    }

    return (
        <Container
            page={"outer-planets"}
        >
            <Stars />
            {isModalOpen ? <PlanetCard
                data={modalData}
                close={closeModal}
                isPlanet={true}
            /> : null}
            {isMoonModalOpen ? <MoonCard
                data={modalData}
                location={location}
                close={closeModal}
                isPlanet={false}
            /> : null}
            {outerPlanets.map(outerPlanet => {
                return (
                    <PlanetSVG
                        planet={outerPlanet}
                        page={"outer"}
                        modal={openModal}
                        moonModal={openMoonModal}
                        close={closeModal}
                        key={outerPlanet.name}
                    />
                )
            })}
        </Container>
    );
}

export default OuterPlanets;