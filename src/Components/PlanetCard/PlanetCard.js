import React, { useState } from "react";
import "./PlanetCard.scss";

const PlanetCard = () => {

    const [isOpen, setIsOpen] = useState(false);

    function card() {
        const card = document.getElementById("planet-card");
        const openContent = document.getElementById("open-content");

        isOpen ? closeCard(card, openContent) : expandCard(card, openContent)
    };

    function expandCard(card, openContent) {
        setIsOpen(true);
        card.classList.add("clicked");
        openContent.classList.add("open");
    }

    function closeCard(card, openContent) {
        setIsOpen(false);
        card.classList.remove("clicked");
        openContent.classList.remove("open");
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
                </div>
            </div>
        </>
    );
}

export default PlanetCard;