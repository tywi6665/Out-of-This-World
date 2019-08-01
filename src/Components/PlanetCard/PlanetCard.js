import React from 'react';
import "./PlanetCard.scss";

const PlanetCard = () => {
    return (
        <>
            <div class="planet-card">
                <div class="border"></div>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/deathtostock-00.jpg" />
                <h1>Hey now, you're an allstar</h1>
            </div>

            <div id="cover" class="cover"></div>

            <div id="open-content" class="open-content">
                <a href="#" id="close-content" class="close-content"><span class="x-1"></span><span class="x-2"></span></a>
                <img id="open-content-image" src="" />
                <div class="text" id="open-content-text">
                </div>
            </div>
        </>
    );
}

export default PlanetCard;