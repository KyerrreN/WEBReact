import React, { Component } from "react";
import "../IndexAbout/IndexAbout.css";
import FreelancePic from "../../img/freelance/image.png";

export default function IndexAbout() {
    return (
        <main className="container">
            <div className="indexabout-frame">
                <img
                    src={FreelancePic}
                    alt="Freelance Pic"
                    className="indexabout-pic"
                />

                <div className="indexabout-main">
                    <h1>Ready to outsource your work?</h1>

                    <span>
                        At FreelanceMockProject, we connect you with talented
                        freelancers from around the world, ready to help you
                        bring your projects to life. Whether you need a graphic
                        designer, a web developer, or a content writer, our
                        diverse pool of skilled professionals is here to meet
                        your needs.
                    </span>
                </div>
            </div>
        </main>
    );
}
