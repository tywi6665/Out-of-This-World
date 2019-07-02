import React from 'react';
import from "./Modal.scss";

const Modal = ({ children }) => {
    return (
        <div className="modal">
            {children}
        </div>
    );
}

export default Modal;