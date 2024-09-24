import React, { Component } from "react";
import "../Wrapper/Wrapper.css";

// Import components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import IndexAbout from "../IndexAbout/IndexAbout";
import IndexWhyUs from "../IndexWhyUs/IndexWhyUs";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Wrapper() {
    return (
        <div className="wrapper">
            <BurgerMenu />
            <Header />
            <IndexAbout />
            <IndexWhyUs />
            <Footer />
        </div>
    );
}

export default Wrapper;
