import React, { Component, useEffect, useState } from "react";
import NewsData from "../../json/News.json";
import "./NewsFrame.css";

export default function NewsFrame() {
    const [index, setIndex] = useState(0);
    const [currentNews, setCurrentNews] = useState(NewsData[0]);

    const handlePrevious = () => {
        if (index == 0) {
            setIndex(NewsData.length - 1);
            setCurrentNews(NewsData[NewsData.length - 1]);
        } else {
            setIndex(index - 1);
            setCurrentNews(NewsData[index - 1]);
        }
    };

    const handleNext = () => {
        if (index == NewsData.length - 1) {
            setIndex(0);
            setCurrentNews(NewsData[0]);
        } else {
            setIndex(index + 1);
            setCurrentNews(NewsData[index + 1]);
        }
    };
    return (
        <div className="newsframe-frame">
            <h1>INDEX = {index}</h1>
            <h1>{currentNews.header}</h1>
            <div>{currentNews.shortDesc}</div>

            <nav className="newsframe-navigation">
                <button onClick={handlePrevious}>&lt;</button>
                <button>More</button>
                <button onClick={handleNext}>&gt;</button>
            </nav>
        </div>
    );
}
