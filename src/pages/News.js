import React from "react";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewsSection from "../components/NewsSection/NewsSection";

export default function News() {
    return (
        <>
            <BurgerMenu />
            <Header />
            <NewsSection />
            <Footer />
        </>
    );
}
