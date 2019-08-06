import React from 'react';

const MoonCard = ({ data }) => {
    return (
        <>
            <img src={data.url} />
            <div>
                <h4>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h4>
                <ul>
                    <li><b>Mean Radius:</b> {data.radius} km</li>
                    <li><b>Mean Orbital Distance:</b> {data.orbitalDistance} km</li>
                    <li><b>Date of Discovery:</b> {data.discovery}</li>
                </ul>
            </div>
        </>
    );
}

export default MoonCard;