import React, { Component } from "react";
import "../Wrapper/Wrapper.css";

// Import components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Wrapper() {
    return (
        <div className="wrapper">
            <Header />
            <Footer />
        </div>
    );
}

export default Wrapper;
