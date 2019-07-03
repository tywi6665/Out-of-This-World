import React from "react";
import "./Navbar.scss";

const Navbar = () => {

    let isOpen = false;

    function Nav() {
        const button = document.getElementById("nav-button");
        const nav = document.getElementById("nav");
        const overlay = document.getElementById("overlay");

        isOpen ? closeNav(button, nav, overlay) : openNav(button, nav, overlay)
    }

    function openNav(button, nav, overlay) {
        isOpen = true;
        button.innerHTML = "-";
        nav.classList.add("opened-nav");
        overlay.classList.add("on-overlay");
        overlay.addEventListener("click", () => closeNav(button, nav, overlay));
    };

    function closeNav(button, nav, overlay) {
        isOpen = false;
        button.innerHTML = "+";
        nav.classList.remove("opened-nav");
        overlay.classList.remove("on-overlay");
        overlay.removeEventListener("click", closeNav);
    }

    return (
        <>
            <button
                className="nav-button"
                id="nav-button"
                onClick={Nav}
            >+</button>
            <nav className="nav-container" id="nav">
                <ul>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                </ul>
            </nav>
            <div className="nav-overlay" id="overlay"></div>
        </>
    );
};

export default Navbar;