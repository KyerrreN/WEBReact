import React, { Component } from "react";
import "./NewsSection.css";
import NewsFrame from "../NewsFrame/NewsFrame";

export default function NewsSection() {
    return (
        <section className="container">
            <div className="news-frame">
                <h1>We have many news. Keep up with our platform!</h1>

                <NewsFrame />
            </div>
        </section>
    );
}
