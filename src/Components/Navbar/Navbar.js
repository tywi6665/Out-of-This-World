import React from "react";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <button className="nav-button">+</button>
        <nav className="nav-container">
            <ul>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
            </ul>
        </nav>
        <div className="nav-overlay"></div>
    );
};

export default Navbar;