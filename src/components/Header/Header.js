import React, { Component } from "react";
import "../Header/Header.css";
import Logo from "../../img/logo/logo-no-background.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
    return (
        <header className="container">
            <div className="header-frame">
                <img
                    src={Logo}
                    alt="FreelanceMockProject"
                    className="header-logo"
                />

                <Navigation />
            </div>
        </header>
    );
}

export default Header;
