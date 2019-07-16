import React, { useState } from 'react';
// import "./OuterPlanets.scss";
import Container from "../../Components/Container";
import PlanetCard from "../../Components/PlanetCard";
import * as d3 from "d3";

const OuterPlanets = () => {

    const [outerPlanets, setOuterPlanets] = useState([
        {
            name: "jupiter", tilt: 25.19, radius: 69911, period: 0.41, colors: ["#d8ca9d", "#a59186"],
            moons: [
                { name: "io", radius: 1821, orbitalDistance: 421700, colors: ["#c9be66", "#d7ce8a"], url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/1280px-Io_highest_resolution_true_color.jpg" },
                { name: "europa", radius: 1560, orbitalDistance: 670900, colors: ["#b7b19c", "#88754e"], url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Europa-moon-with-margins.jpg" },
                { name: "ganymede", radius: 2634, orbitalDistance: 1069200, colors: ["#463b2f", "#b8a598"], url: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Ganymede_g1_true-edit1.jpg" },
                { name: "callisto", radius: 2410, orbitalDistance: 1885000, colors: ["#887c6f", "#3a4b68"], url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Callisto.jpg" }
            ]
        },
        {
            name: "saturn", tilt: 26.73, radius: 58232, period: 0.44, colors: ["#f4d587", "#f4a587"],
            moons: [
                { name: "mimas", radius: 198, orbitalDistance: 185000, colors: ["grey", "lightgrey"], url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Mimas_Cassini.jpg/1280px-Mimas_Cassini.jpg" },
                { name: "enceladus", radius: 252, orbitalDistance: 237948, colors: ["lightgrey", "#fff"], url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Enceladus_from_Voyager.jpg" },
                { name: "tethys", radius: 1062, orbitalDistance: 294619, colors: ["grey", "lightgrey"], url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/PIA18317-SaturnMoon-Tethys-Cassini-20150411.jpg" },
                { name: "dione", radius: 1123, orbitalDistance: 377396, colors: ["lightgrey", "grey"], url: "https://upload.wikimedia.org/wikipedia/commons/4/42/Dione_in_natural_light.jpg" },
                { name: "rhea", radius: 1527, orbitalDistance: 527108, colors: ["grey", "lightgrey"], url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/PIA07763_Rhea_full_globe5.jpg/1024px-PIA07763_Rhea_full_globe5.jpg" },
                { name: "titan", radius: 2575, orbitalDistance: 1221870, colors: ["#6e6a4c", "#dac461"], url: "https://upload.wikimedia.org/wikipedia/commons/4/45/Titan_in_true_color.jpg" },
                { name: "lapetus", radius: 1470, orbitalDistance: 3560820, colors: ["#fff", "#403b1d"], url: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Iapetus_706_1419_1.jpg" }
            ]
        },
        {
            name: "uranus", tilt: 82.23, radius: 25362, period: -0.72, colors: ["#e1eeee", "#adb0c3"],
            moons: [
                { name: "miranda", radius: 235, orbitalDistance: 129390, colors: ["lightgrey", "#fff"], url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/PIA18185_Miranda%27s_Icy_Face.jpg" },
                { name: "ariel", radius: 579, orbitalDistance: 190900, colors: ["grey", "lightgrey"], url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Ariel_%28moon%29.jpg/1024px-Ariel_%28moon%29.jpg" },
                { name: "umbriel", radius: 584, orbitalDistance: 266000, colors: ["lightgrey", "grey"], url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/PIA00040_Umbrielx2.47.jpg" },
                { name: "titania", radius: 788, orbitalDistance: 435910, colors: ["grey", "lightgrey"], url: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Titania_%28moon%29_color%2C_edited.jpg" },
                { name: "oberon", radius: 761, orbitalDistance: 583520, colors: ["grey", "lightgrey"], url: "https://upload.wikimedia.org/wikipedia/commons/0/09/Voyager_2_picture_of_Oberon.jpg" },
            ]
        },
        {
            name: "neptune", tilt: 28.32, radius: 24622, period: 0.72, colors: ["#85addb", "#3f54ba"],
            moons: [
                { name: "proteus", radius: 420, orbitalDistance: 117646, colors: ["grey", "lightgrey"], url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Proteus_%28Voyager_2%29.jpg" },
                { name: "triton", radius: 2705, orbitalDistance: 354759, colors: ["#606855", "#beb6b4"], url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Triton_moon_mosaic_Voyager_2_%28large%29.jpg/1024px-Triton_moon_mosaic_Voyager_2_%28large%29.jpg" },
            ]
        }
    ])

    d3.select(".svg-body").remove();

    return (
        <Container
            page={"outer-planets"}
        >
            <div className="stars">
                <div className="star-group1"></div>
                <div className="star-group2"></div>
                <div className="star-group3"></div>
            </div>
            {outerPlanets.map(outerPlanet => {
                return (
                    <PlanetCard
                        planet={outerPlanet}
                        page={"outer"}
                        key={outerPlanet.name}
                    />
                )
            })}
        </Container>
    );
}

export default OuterPlanets;