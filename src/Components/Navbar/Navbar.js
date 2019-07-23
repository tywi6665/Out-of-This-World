import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    function Nav(e) {
        e.stopPropagation();
        const button = document.getElementById("nav-button");
        const nav = document.getElementById("nav");
        const overlay = document.getElementById("overlay");
        const ul = document.getElementById("ul");

        isOpen ? closeNav(button, nav, overlay, ul) : openNav(button, nav, overlay, ul)
    }

    function openNav(button, nav, overlay, ul) {
        setIsOpen(true);
        button.innerHTML = "-";
        nav.classList.add("opened-nav");
        overlay.classList.add("on-overlay");
        overlay.addEventListener("click", () => closeNav(button, nav, overlay, ul));
        ul.addEventListener("click", () => closeNav(button, nav, overlay, ul));
    };

    function closeNav(button, nav, overlay, ul) {
        setIsOpen(false);
        button.innerHTML = "+";
        nav.classList.remove("opened-nav");
        overlay.classList.remove("on-overlay");
        overlay.removeEventListener("click", closeNav);
        ul.removeEventListener("click", closeNav);
    }

    return (
        <>
            <button
                className="nav-button"
                id="nav-button"
                onClick={Nav}
            >+</button>
            <nav className="nav-container" id="nav">
                <ul id="ul">
                    <li><Link to="/home"><span className="nav-item nav-item-home">Home</span></Link></li>
                    <li><Link to="/innerplanets"><span className="nav-item nav-item-inner">Inner</span></Link></li>
                    <li><Link to="/outerplanets"><span className="nav-item nav-item-outer">Outer</span></Link></li>
                    <li><a href="#"><span className="nav-item nav-item-sun">Sun</span></a></li>
                    <li><a href="#"><span className="nav-item nav-item-misc">Misc</span></a></li>
                </ul>
            </nav>
            <div className="nav-overlay" id="overlay"></div>
        </>
    );
};

export default Navbar;