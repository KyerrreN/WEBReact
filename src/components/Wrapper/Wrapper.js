import React, { Component } from "react";
import "../Wrapper/Wrapper.css";

// Import components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import IndexAbout from "../IndexAbout/IndexAbout";
import IndexWhyUs from "../IndexWhyUs/IndexWhyUs";

function Wrapper() {
    return (
        <div className="wrapper">
            <Header />
            <IndexAbout />
            <IndexWhyUs />
            <Footer />
        </div>
    );
}

export default Wrapper;
