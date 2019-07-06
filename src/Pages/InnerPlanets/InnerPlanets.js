import React, { useState } from 'react';
import "./InnerPlanets.scss";
import Container from "../../Components/Container";
import * as d3 from "d3";

const InnerPlanets = () => {

    const [innerPlanets, setInnerPlanets] = useState([
        { name: "Mercury", tilt: 0.03, radius: 2439.7, period: 58.65, colours: ["#e7e8ec", "#b1adad"] },
        { name: "Venus", tilt: 2.64, radius: 6051.8, period: -243, colours: ["#f8e2b0", "#d3a567"] },
        { name: "Earth", tilt: 23.44, radius: 6371, period: 1, colours: ["#9fc164", "#6b93d6"] },
        { name: "Mars", tilt: 6.68, radius: 3389.5, period: 1.03, colours: ["#ef1501", "#ad0000"] }
    ])

    d3.select(".svg-body").remove();

    return (
        <>
            <div className="inner-planets-page">
                <div className="stars">
                    <div className="star-group1"></div>
                    <div className="star-group2"></div>
                    <div className="star-group3"></div>
                </div>
            </div>
            <Container
                page={"inner-planets"}
            >
            </Container>
        </>
    );
}

export default InnerPlanets;