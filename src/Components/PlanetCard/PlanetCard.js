import React, { useState } from "react";
import "./PlanetCard.scss";

const PlanetCard = ({ data }) => {

    console.log(data);

    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    function card() {
        const card = document.getElementById("planet-card");
        const openContent = document.getElementById("open-content");
        const cover = document.getElementById('cover');

        isOpen ? closeCard(card, openContent, cover) : expandCard(card, openContent, cover)
    };

    function expandCard(card, openContent, cover) {
        setIsOpen(true);
        card.classList.add("clicked");
        setTimeout(() => {
            animateForward(card, cover)
        }, 500);
        openContent.classList.add("open");
    }

    function closeCard(card, openContent, cover) {
        setIsOpen(false);
        card.classList.remove("clicked");
        openContent.classList.remove("open");
    };

    function animateForward(card, cover) {
        const openContentText = document.getElementById('open-content-text')
        const openContentImage = document.getElementById('open-content-image')
        const cardPosition = card.getBoundingClientRect();
        const cardStyle = getComputedStyle(card);
        setCoverPosition(cardPosition, cover);
        // setCoverColor(cardStyle);
        scaleCoverToWindow(cardPosition, cover);
    };

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
        cover.style.transform = `scaleX(${scaleX}) scaleY(${+scaleY}) translate3d(${offsetX}px, ${offsetY})px, 0px)`;
    };

    return (
        <>
            <div id="planet-card" className="planet-card" onClick={card}>
                <div className="border"></div>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/deathtostock-00.jpg" />
                <h1>Hey now, you're an allstar</h1>
            </div>

            <div id="cover" className="cover"></div>

            <div id="open-content" className="open-content">
                <a href="#"
                    id="close-content"
                    className="close-content"
                    onClick={card}
                >
                    <span className="x-1"></span>
                    <span className="x-2"></span>
                </a>
                <img id="open-content-image" src="" />
                <div className="text" id="open-content-text">
                    Hey now, you're an allstarHey now, you're an allstarHey now, you're an allstarHey now, you're an allstar
                </div>
            </div>
        </>
    );
}

export default PlanetCard;