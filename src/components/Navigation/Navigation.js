import React, { Component } from "react";
import "../Navigation/Navigation.css";

function Navigation({ navClass }) {
    return (
        <nav className={navClass}>
            <a href="#">Login</a>
            <a href="#">Vendors</a>
            <a href="#">News</a>
        </nav>
    );
}

export default Navigation;
