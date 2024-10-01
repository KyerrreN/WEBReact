import React, { Component } from "react";
import "../Footer/Footer.css";
import Logo from "../../img/logo/logo-black.svg";
import { Tooltip } from "@mui/material";

export default function Footer() {
    return (
        <footer className="container">
            <div className="footer-frame">
                <img className="footer-logo" src={Logo} alt="" />

                <div className="footer-nav">
                    <span>Legal information</span>

                    <a>Terms of use</a>
                    <span>Copyright (c) 2024</span>
                </div>

                <div className="footer-nav">
                    <span>Contact us</span>

                    <Tooltip
                        title="Call us: +375441234567"
                        placement="left-start"
                        arrow
                    >
                        <a href="tel:+375441234567">Phone number</a>
                    </Tooltip>

                    <Tooltip
                        title="Email us to kyerrrenmgt@gmail.com"
                        placement="left-start"
                        arrow
                    >
                        <a href="mailto:kyerrrenmgt@gmail.com">Email</a>
                    </Tooltip>

                    <Tooltip
                        title="Click to know where our office is located"
                        placement="left-start"
                        arrow
                    >
                        <a href="https://maps.app.goo.gl/kXw1roHZQ2bGxFnt8">
                            Location
                        </a>
                    </Tooltip>

                    <Tooltip
                        title="Visit my github: https://github.com/KyerrreN"
                        placement="left-start"
                        arrow
                    >
                        <a href="https://github.com/KyerrreN">Github</a>
                    </Tooltip>
                </div>
            </div>
        </footer>
    );
}
