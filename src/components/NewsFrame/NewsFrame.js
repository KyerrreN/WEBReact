import React, { useEffect, useState } from "react";
import NewsData from "../../json/News.json";
import Popup from "reactjs-popup";
import "./NewsFrame.css";
import "reactjs-popup/dist/index.css";

export default function NewsFrame() {
    const [index, setIndex] = useState(0);
    const [currentNews, setCurrentNews] = useState(NewsData[0]);

    // Navigation for buttons
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

    // Keyboard events
    useEffect(() => {
        document.addEventListener("keydown", handlePreviousPress);
        document.addEventListener("keydown", handleNextPress);

        return () => {
            document.removeEventListener("keydown", handlePreviousPress);
            document.removeEventListener("keydown", handleNextPress);
        };
    }, [index]);

    const handlePreviousPress = (event) => {
        if (event.key === "ArrowLeft" || event.key === "a") {
            handlePrevious();
        }
    };

    const handleNextPress = (event) => {
        if (event.key === "ArrowRight" || event.key === "d") {
            handleNext();
        }
    };
    const renderDescription = (description) => {
        return description.split("\n").map((item, index) => (
            <React.Fragment key={index}>
                {item}
                <br />
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="newsframe-frame">
            <img src={currentNews.pictureLink} />

            <div>
                <h1>{currentNews.header}</h1>
            </div>

            <div>{currentNews.shortDesc}</div>

            <nav className="newsframe-navigation">
                <button onClick={handlePrevious}>&lt;</button>
                <Popup
                    trigger={<button>More</button>}
                    modal
                    nested
                    lockScroll={true}
                >
                    {(close) => (
                        <div className="modal">
                            <h1 className="content">{currentNews.header}</h1>
                            <span>
                                {renderDescription(currentNews.longDesc)}
                            </span>
                            <div>
                                <button
                                    className="button-modal"
                                    onClick={() => close()}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
                <button onClick={handleNext}>&gt;</button>
            </nav>
            <span className="newsframe-counter">
                Reading {index + 1} out of {NewsData.length}
            </span>
        </div>
    );
}
