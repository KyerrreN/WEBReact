import React, { Component } from "react";
import "../Wrapper/Wrapper.css";
import { Route, Routes } from "react-router-dom";

// Import components
import Main from "../../pages/Main.js";
import News from "../../pages/News.js";
import Partners from "../../pages/Partners.jsx";

function Wrapper() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/news" element={<News />} />
                <Route path="/partners" element={<Partners />} />
            </Routes>
        </div>
    );
}

export default Wrapper;
