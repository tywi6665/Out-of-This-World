import React from 'react';
import { Icon } from 'antd';
import "./Footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div>
                <p><b>Made by tywi6665</b></p>
            </div>
            <div>
                <a href="https://github.com/tywi6665"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon type="github" />
                </a>
            </div>
        </div>
    );
}

export default Footer;