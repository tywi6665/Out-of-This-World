import React, { useState } from 'react';
import Container from "../Components/Container";
import Stars from "../Components/Stars";
import PlanetSVG from "../Components/PlanetSVG";
import PlanetCard from "../Components/PlanetCard";
import MoonCard from "../Components/MoonCard";
import * as d3 from "d3";
const innerPlanetsData = require("../Data/innerPlanetsData.json");

const InnerPlanets = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMoonModalOpen, setIsMoonModalOpen] = useState(false);
    const [location, setLocation] = useState({ top: null, left: null })
    const [modalData, setModalData] = useState(null);

    d3.select(".svg-body").remove();

    const innerPlanets = innerPlanetsData.data

    const openModal = (d) => {
        setIsModalOpen(false)
        setIsMoonModalOpen(false)
        setModalData(d)
        setIsModalOpen(true);
    };

    const openMoonModal = (d) => {
        setIsModalOpen(false)
        setIsMoonModalOpen(false)
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
            page={"inner-planets"}
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
            {innerPlanets.map(innerPlanet => {
                return (
                    <PlanetSVG
                        planet={innerPlanet}
                        page={"inner"}
                        modal={openModal}
                        moonModal={openMoonModal}
                        close={closeModal}
                        key={innerPlanet.name}
                    />
                )
            })}
        </Container>
    );
}

export default InnerPlanets;