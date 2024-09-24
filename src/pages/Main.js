import React, { Component } from "react";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Header from "../components/Header/Header";
import IndexAbout from "../components/IndexAbout/IndexAbout";
import IndexWhyUs from "../components/IndexWhyUs/IndexWhyUs";
import Footer from "../components/Footer/Footer";

export default function Main() {
    return (
        <>
            <BurgerMenu />
            <Header />
            <IndexAbout />
            <IndexWhyUs />
            <Footer />
        </>
    );
}
