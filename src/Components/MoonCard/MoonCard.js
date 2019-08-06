import React from 'react';
import "./MoonCard.scss";

const MoonCard = ({ data }) => {
    return (
        <div className="moonModal"
            style={{ background: `linear-gradient(to bottom, #000 60%, ${data.colors[0]} 100%` }}
        >
            <div className="border"></div>
            <img src={data.url} />
            <div className="wrapper">
                <h4>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h4>
                <ul>
                    <li><b>Mean Radius:</b> {data.radius} km</li>
                    <li><b>Mean Orbital Distance:</b> {data.orbitalDistance} km</li>
                    <li><b>Date of Discovery:</b> {data.discovery}</li>
                </ul>
            </div>
        </div>
    );
}

export default MoonCard;