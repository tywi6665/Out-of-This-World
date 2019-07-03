import React from 'react';
import "./Modal.scss";
import { Tween, Timeline } from "react-gsap";


const Modal = ({ children }) => {
    return (
        <Timeline
            wrapper={<div className="tweenedDiv" />}
            target={
                <div className="modal">
                    {children}
                </div>
            }
        >
            <Tween from={{ transform: "translateY(-150px)", opacity: 0}} to={{ transform: "translateY(0px)", opacity: 1 }} duration={3} />
        </Timeline>
    );
}

export default Modal;