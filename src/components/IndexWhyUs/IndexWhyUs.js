import React, { Component } from "react";

// css
import "../IndexWhyUs/IndexWhyUs.css";

// img
import Top from "../../img/whyus/top.svg";
import Options from "../../img/whyus/options.svg";
import Process from "../../img/whyus/process.svg";
import Payment from "../../img/whyus/payment.svg";

// child component
import WhyUsReason from "../WhyUsReason/WhyUsReason";

export default function IndexWhyUs() {
    return (
        <section className="container">
            <div className="indexwhyus-frame">
                <h1>Why choose us</h1>

                <div className="indexwhyus-reasons">
                    <WhyUsReason
                        image={Top}
                        alt="Top Image"
                        header="Access to Top Talent"
                        description="Our platform features a curated selection of freelancers with proven expertise and positive client reviews."
                    />

                    <WhyUsReason
                        image={Options}
                        alt="Options Image"
                        header="Flexible Options"
                        description="Whether you need short-term assistance or long-term collaboration, we offer flexible hiring options to suit your project requirements."
                    />

                    <WhyUsReason
                        image={Process}
                        alt="Process Image"
                        header="Streamlined Process"
                        description="Easily post your project, review proposals, and select the right freelancer—all in one place."
                    />

                    <WhyUsReason
                        image={Payment}
                        alt="Payment IMG"
                        header="Secure Payments"
                        description="Our secure payment system ensures that your funds are protected until the work is completed to your satisfaction."
                    />
                </div>
            </div>
        </section>
    );
}
