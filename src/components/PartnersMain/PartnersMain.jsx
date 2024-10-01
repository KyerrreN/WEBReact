import React from "react";
import "./PartnersMain.css";

// img
import PartnershipValueImage from "../../img/whyus/payment.svg";

export default function PartnersMain() {
    return (
        <main className="container">
            <div className="partnersmain-frame">
                <div className="partnersmain-first">
                    <h1>Partnership</h1>

                    <span>
                        At FreelanceMockProject, we believe that collaboration
                        is the cornerstone of success. Our approach to
                        partnership is built on the understanding that when
                        diverse talents and ideas come together, remarkable
                        things can happen. We value the unique strengths that
                        each partner brings to the table, and we are committed
                        to fostering an environment where creativity and
                        innovation thrive. By forging strong, mutually
                        beneficial relationships, we aim to enhance our
                        capabilities and deliver exceptional results for our
                        clients. We see partnerships as a strategic avenue for
                        growth—not just for us, but for everyone involved.
                        Together, we can explore new markets, expand our service
                        offerings, and leverage each other's expertise to tackle
                        challenges and seize opportunities. Our dedication to
                        open communication and shared goals ensures that every
                        partnership is a collaborative journey toward achieving
                        excellence.
                    </span>
                </div>

                <div className="partnersmain-second">
                    {/* PLACEHOLDER. CHANGE LATER */}
                    <div>
                        <img src={PartnershipValueImage} alt="Image" />
                    </div>
                </div>
            </div>
        </main>
    );
}
