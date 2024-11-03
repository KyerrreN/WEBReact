const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const cors = require("cors");

function getFreelancers() {
    const pathToFile = path.join(__dirname, "data", "f.json");
    const data = fs.readFileSync(pathToFile);
    return JSON.parse(data);
}

function getHiredFreelancers() {
    const pathToFile = path.join(__dirname, "data", "h.json");
    const data = fs.readFileSync(pathToFile);
    return JSON.parse(data);
}

// usestaticfiles
const publicPath = path.join(__dirname, "..", "client", "public");
app.use(express.static(publicPath));
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

//get requests
app.get("/api/hired", (req, res) => {
    const data = getHiredFreelancers();
    res.status(200).json(data);
});
app.get("/api/freelancers", (req, res) => {
    const data = getFreelancers();
    res.status(200).json(data);
});
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// post requests
app.post("/api/freelancers", (req, res) => {
    try {
        let freelancers = getFreelancers();

        const data = req.body;
        data.id = Math.floor(Math.random() * 1000000);
        console.log(data);
        freelancers.push(data);

        fs.writeFileSync(
            path.join(__dirname, "data", "f.json"),
            JSON.stringify(freelancers, null, 2)
        );

        res.status(201).json(data);
    } catch (e) {
        res.status(500).json("Error submitting data:" + e);
    }
});
app.post("/api/freelancers/:id", (req, res) => {
    try {
        let hiredFreel = getHiredFreelancers();

        const incParam = req.params.id;
        const data = parseInt(incParam);

        console.log(data);

        if (hiredFreel.some((hire) => hire.id === data)) {
            console.log("executed some condition");
            return res.status(400).json("Error: duplicate hired freelancer");
        }

        const jsonData = {
            id: data,
        };
        console.log(jsonData);
        hiredFreel.push(jsonData);

        fs.writeFileSync(
            path.join(__dirname, "data", "h.json"),
            JSON.stringify(hiredFreel, null, 2)
        );

        res.status(201).json(jsonData);
    } catch (e) {
        res.status(500).json("Error submitting data:" + e);
    }
});

app.listen(3001, () => {
    console.log("Server has started listening on port 3001");
});
