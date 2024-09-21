import React, { Component } from "react";
import "../Wrapper/Wrapper.css";

// Import components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import IndexAbout from "../IndexAbout/IndexAbout";

function Wrapper() {
    return (
        <div className="wrapper">
            <Header />
            <IndexAbout />
            <Footer />
        </div>
    );
}

export default Wrapper;
