import React from 'react';
import "./InnerPlanets.scss";
import Container from "../../Components/Container";
import * as d3 from "d3";

const InnerPlanets = () => {

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