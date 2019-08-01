import React from 'react';
import "./PlanetCard.scss";

const PlanetCard = () => {

    function expandCard(e) {
        const card = document.getElementById("planet-card");
        card.classList.add("clicked");
        const openContent = document.getElementById("open-content");
        openContent.classList.add("open")
    };

    function closeCard() {

    };

    return (
        <>
            <div id="planet-card" className="planet-card" onClick={expandCard}>
                <div className="border"></div>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/deathtostock-00.jpg" />
                <h1>Hey now, you're an allstar</h1>
            </div>

            <div id="cover" className="cover"></div>

            <div id="open-content" className="open-content">
                <a href="#"
                    id="close-content"
                    className="close-content"
                    onClick={closeCard}
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