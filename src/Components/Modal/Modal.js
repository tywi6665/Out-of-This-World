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
            <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={5} />
        </Timeline>
    );
}

export default Modal;