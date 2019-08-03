import React, { useState } from "react";
import "./PlanetCard.scss";

const PlanetCard = ({ data, toggle }) => {

    console.log(data)

    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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
    }

    function closeCard(card, openContent, cover, openContentText, openContentImage) {
        setIsOpen(false);
        openContent.classList.remove("open");
        animateBackward(card, cover, openContentText, openContentImage)
    };

    function animateForward(card, cover, openContentText, openContentImage) {
        const cardPosition = card.getBoundingClientRect();
        const cardStyle = getComputedStyle(card);
        setCoverPosition(cardPosition, cover);
        // setCoverColor(cardStyle);
        scaleCoverToWindow(cardPosition, cover);
    };

    function animateBackward(card, cover, openContentText, openContentImage) {
        const cardPosition = card.getBoundingClientRect();
        setCoverPosition(cardPosition, cover);
        scaleCoverToWindow(cardPosition, cover);
        cover.style.transform = `scaleX(1) scaleY(1) translate3d(0px, 0px, 0px)`;
        setTimeout(function () {
            // openContentText.innerHTML = '';
            // openContentImage.src = '';
            cover.style.width = '0px';
            cover.style.height = '0px';
            setIsOpen(false);
            card.classList.remove("clicked");
        }, 301);

    }

    function setCoverPosition(cardPosition, cover) {
        cover.style.left = cardPosition.left + 'px';
        cover.style.top = cardPosition.top + 'px';
        cover.style.width = cardPosition.width + 'px';
        cover.style.height = cardPosition.height + 'px';
    };

    function scaleCoverToWindow(cardPosition, cover) {
        const scaleX = windowWidth / cardPosition.width;
        const scaleY = windowHeight / cardPosition.height;
        const offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
        const offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
        cover.style.transform = `scaleX(${windowWidth}) scaleY(${+scaleY}) translate3d(${offsetX}px, ${offsetY})px, 0px)`;
    };

    return (
        <>
            <div id="planet-card" className="planet-card" onClick={card}>
                <div className="border"></div>
                <a href="#"
                    id="close-content"
                    className="close-content"
                    onClick={toggle}
                >
                    <span className="x-1"></span>
                    <span className="x-2"></span>
                </a>
                <img src={data.url} />
                <h1>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
                <p>{data.funFact}</p>
                <p className="click-me">Click me for more details</p>
            </div>

            <div id="cover" className="cover"></div>

            <div id="open-content" className="open-content">
                <a href="#"
                    id="close-content"
                    className="close-content"
                    onClick={toggle}
                >
                    <span className="x-1"></span>
                    <span className="x-2"></span>
                </a>
                <img id="open-content-image" src="" />
                <div className="text" id="open-content-text">
                    Hey now, you're an allstarHey now, you're an allstarHey now, you're an allstarHey now, you're an allstar
                <ul>
                        <li><b>Location: </b>{data.location}</li>
                        <li><b>Mass:</b> {data.mass}</li>
                        <li><b>Volume:</b> {data.volume}</li>
                        <li><b>Mean Radius:</b> {data.radius} km</li>
                        <li><b>Mean Orbital Distance:</b> {data.orbitalDistance}</li>
                        <li><b>Date of Discovery: </b>{data.discoveryDate}</li>
                    </ul>
                    <ul>
                        <li><b>Date of Discovery: </b>{data.discoveryDate}</li>
                        <li><b>Discovered By: </b>{data.discoverer}</li>
                        <li><b>Inclination to ecliptic:</b> {data.inclination}°</li>
                        <li><b>Year Length:</b> {data.yearLength} (compared to Earth)</li>
                        <li><b>Number of known moons: </b>{data.moons.length}</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default PlanetCard;