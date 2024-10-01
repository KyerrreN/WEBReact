import { React, useState } from "react";
import "./PartnersList.css";

// MUI
import { Box } from "@mui/material";

import PartnerIndividual from "../PartnerIndividual/PartnerIndividual";

export default function PartnersList() {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <section className="container">
            <div className="partnerslist-frame">
                <h1>Check out our best partners</h1>

                <Box>
                    <PartnerIndividual />
                    <PartnerIndividual />
                    <PartnerIndividual />
                    <PartnerIndividual />
                </Box>
            </div>
        </section>
    );
}
