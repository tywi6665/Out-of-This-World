import React from 'react';
import "./Container.scss";

const Container = ({ page, children }) => {
    return (
        <div className={`container container-${page}`}>
            {children}
        </div>
    );
}

export default Container;