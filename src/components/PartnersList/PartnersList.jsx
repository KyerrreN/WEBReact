import { React } from "react";
import "./PartnersList.css";
import PartnersData from "../../json/Partners.json";

// MUI
import { Box } from "@mui/material";

import PartnerIndividual from "../PartnerIndividual/PartnerIndividual";

export default function PartnersList() {
    return (
        <section className="container">
            <div className="partnerslist-frame">
                <h1>Check out our best partners</h1>

                <Box>
                    {PartnersData.map((partner) => (
                        <PartnerIndividual partner={partner} />
                    ))}
                </Box>
            </div>
        </section>
    );
}
