import React from 'react';
import "./MoonCard.scss";

const MoonCard = ({ data, location, close }) => {
    return (
        <div className="moonModal"
            style={{
                background: `linear-gradient(to bottom, #000 60%, ${data.colors[0]} 100%`,
                top: location.top,
                left: location.left
            }}
        >
            <div className="border"></div>
            <a href="#"
                id="close-content"
                className="close-content"
                onClick={close}
            >
                <span
                    className="x-1"
                    onClick={close}
                ></span>
                <span
                    className="x-2"
                    onClick={close}
                ></span>
            </a>
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