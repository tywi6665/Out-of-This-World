import React from 'react';
import "./Modal.scss";
import { Tween, Timeline } from "react-gsap";


const Modal = ({ children }) => {
    return (
        <Timeline
            wrapper={<div className="modal" />}
            target={children}
        >
            <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={10} />
        </Timeline>
    );
}

export default Modal;