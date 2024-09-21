import React, { Component } from "react";
import "../Header/Header.css";
import Logo from "../../img/logo/logo-no-background.svg";

function Header() {
    return (
        <header className="container">
            <div className="header-frame">
                <img
                    src={Logo}
                    alt="FreelanceMockProject"
                    className="header-logo"
                />

                <nav className="header-nav">
                    <a href="#">Login</a>
                    <a href="#">Vendors</a>
                    <a href="#">News</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
