import React from "react";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PartnersMain from "../components/PartnersMain/PartnersMain";
import PartnersList from "../components/PartnersList/PartnersList";

export default function Partners() {
    return (
        <>
            <BurgerMenu />
            <Header />
            <PartnersMain />
            <PartnersList />
            <Footer />
        </>
    );
}
