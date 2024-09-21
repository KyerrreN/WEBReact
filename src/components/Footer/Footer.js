import React, { Component } from "react";
import "../Footer/Footer.css";
import Logo from "../../img/logo/logo-black.svg";

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

                    <a href="tel:+375441234567">Phone number</a>
                    <a href="mailto:kyerrrenmgt@gmail.com">Email</a>
                    <a href="https://maps.app.goo.gl/kXw1roHZQ2bGxFnt8">
                        Location
                    </a>
                    <a href="https://github.com/KyerrreN">Github</a>
                </div>
            </div>
        </footer>
    );
}
