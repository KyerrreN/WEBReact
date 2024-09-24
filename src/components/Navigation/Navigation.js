import React, { Component } from "react";
import "../Navigation/Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ navClass }) {
    return (
        <nav className={navClass}>
            <Link to="/">Main</Link>
            <Link to="/">Vendors</Link>
            <Link to="/news">News</Link>
        </nav>
    );
}

export default Navigation;
