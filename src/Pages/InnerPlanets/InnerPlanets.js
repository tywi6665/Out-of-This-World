import React from 'react';
import "./InnerPlanets.scss";
import * as d3 from "d3";

const InnerPlanets = () => {

    d3.select("svg-body").remove();

    return (
        <>
            <div className="stars">
                <div className="star-group1"></div>
                <div className="star-group2"></div>
                <div className="star-group3"></div>
            </div>
        </>
    );
}

export default InnerPlanets;