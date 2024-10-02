import React, { useEffect } from "react";
import "../WhyUsReason/WhyUsReason.css";
import Aos from "aos";
import "aos/dist/aos.css";

export default function WhyUsReason({ image, alt, header, description }) {
    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    return (
        <div className="whyus-reason" data-aos="zoom-in">
            <div className="whyus-reason-pic">
                <img src={image} alt={alt}></img>
            </div>

            <h1>{header}</h1>

            <span>{description}</span>
        </div>
    );
}
