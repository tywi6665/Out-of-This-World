import React, { useState } from "react";
import "./PlanetCard.scss";

const PlanetCard = ({ data, close, isPlanet }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    // const [fillWindow, setFillWindow] = useState(0);

    function card() {

        const card = document.getElementById("planet-card");
        const openContent = document.getElementById("open-content");
        const cover = document.getElementById('cover');
        const openContentText = document.getElementById('open-content-text')
        const openContentImage = document.getElementById('open-content-image')

        isOpen ? closeCard(card, openContent, cover, openContentText, openContentImage) : expandCard(card, openContent, cover, openContentText, openContentImage)
    };

    function expandCard(card, openContent, cover, openContentText, openContentImage) {
        setIsOpen(true);
        card.classList.add("clicked");
        setTimeout(() => {
            animateForward(card, cover, openContentText, openContentImage)
        }, 500);
        openContent.classList.add("open");
        setTimeout(function () {
            card.classList.add("out");
        }, 200);
    }

    function closeCard(card, openContent, cover, openContentText, openContentImage) {
        setIsOpen(false);
        card.classList.remove("clicked");
        card.classList.remove("out");
        openContent.classList.remove("open");
        animateBackward(card, cover, openContentText, openContentImage)
    };

    function animateForward(card, cover, openContentText, openContentImage) {
        const cardPosition = card.getBoundingClientRect();
        const cardStyle = getComputedStyle(card);
    };

    function animateBackward(card, cover, openContentText, openContentImage) {
        const cardPosition = card.getBoundingClientRect();
        cover.style.transform = `scaleX(1) scaleY(1) translate3d(0px, 0px, 0px)`;
        setTimeout(function () {
            cover.style.width = '0px';
            cover.style.height = '0px';
            setIsOpen(false);
            card.classList.remove("clicked");
        }, 301);

    }

    return (
        <>
            <div
                id="planet-card"
                className="planet-card"
                onClick={card}
                style={{
                    background: `linear-gradient(to bottom, #000 60%, ${data.colors[0]} 100%`,
                    transform: `translate(${(windowWidth / 2) - 177}px, 70px)`
                }}
            >
                <div className="border"></div>
                <a href="#"
                    id="close-content"
                    className="close-content"
                    onClick={close}
                >
                    <span
                        className="x-1"
                        onClick={close}
                    ></span>
                    <span
                        className="x-2"
                        onClick={close}
                    ></span>
                </a>
                <img src={data.url} />
                <h1>{data.name.charAt(0).toUpperCase() + data.name.slice(1)} {data.symbol}</h1>
                <p>{data.funFact}</p>
                <p className="click-me">Click me for more details</p>
            </div>

            <div
                id="cover"
                className="cover"
                style={{ background: `linear-gradient(to bottom, #000 60%, ${data.colors[0]} 100%` }}
            ></div>

            <div
                id="open-content"
                className="open-content"
                style={{
                    transform: `translate(${(windowWidth / 2) - 259}px, 50px)`
                }}
            >
                <div className="border"></div>
                <a href="#"
                    id="close-content"
                    className="close-content"
                    onClick={close}
                >
                    <span
                        className="x-1"
                        onClick={close}
                    ></span>
                    <span
                        className="x-2"
                        onClick={close}
                    ></span>
                </a>
                <img
                    id="open-content-image"
                    className="image-banner"
                    src={data.url1}
                />
                <div id="open-content-text" className="open-content-wrapper">
                    <h4>{data.name.charAt(0).toUpperCase() + data.name.slice(1)} {data.symbol}</h4>
                    <div className="text">
                        <div className="image-header">
                            <div className="image-wrapper">
                                <img src={data.url} />
                            </div>
                        </div>

                        {isPlanet ? (
                            <ul>
                                <li><b>Planet Order: </b>{data.order}</li>
                                <li><b>Mass:</b> {data.mass}</li>
                                <li><b>Volume:</b> {data.volume}</li>
                                <li><b>Mean Radius:</b> {data.radius} km</li>
                                <li><b>Axial Tilt:</b> {data.tilt}°</li>
                                <li><b>Mean Orbital Distance:</b> {data.orbitalDistance}</li>
                                <li><b>Discovery: </b>{data.discovery}</li>
                                <li><b>Day Length: </b>{data.dayLength} (compared to Earth)</li>
                                <li><b>Year Length:</b> {data.yearLength} (compared to Earth)</li>
                                <li><b>Number of known moons: </b>{data.numMoons}</li>
                            </ul>
                        ) : (
                                <ul>
                                    <li><b>Location: </b>{data.location}</li>
                                    <li><b>Mass:</b> {data.mass}</li>
                                    <li><b>Volume:</b> {data.volume}</li>
                                    <li><b>Mean Radius:</b> {data.radius} km</li>
                                    <li><b>Mean Orbital Distance:</b> {data.orbitalDistance}</li>
                                    <li><b>Date of Discovery: </b>{data.discoveryDate}</li>
                                    <li><b>Discovered By: </b>{data.discoverer}</li>
                                    <li><b>Inclination to ecliptic:</b> {data.inclination}°</li>
                                    <li><b>Year Length:</b> {data.yearLength} (compared to Earth)</li>
                                    <li><b>Number of known moons: </b>{data.moons.length}</li>
                                </ul>
                            )}

                    </div>
                </div>
            </div>
        </>
    );
}

export default PlanetCard;