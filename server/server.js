const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();

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
app.get("/api/format", (req, res) => {
    const hiredFreelancers = getHiredFreelancers();
    const acceptHeader = req.headers.accept;

    if (acceptHeader.includes("application/json")) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(hiredFreelancers);
    } else if (acceptHeader.includes("application/xml")) {
        let xmlFormat = '<?xml version="1.0" encoding="UTF-8"?><data>';
        hiredFreelancers.forEach((hire) => {
            xmlFormat += `<item><id>${hire.id}</id></item>`;
        });
        xmlFormat += "</data>";
        res.setHeader("Content-Type", "application/xml");
        res.status(200).send(xmlFormat);
    } else if (acceptHeader.includes("text/html")) {
        let htmlFormat =
            '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Hired Freelancers</title></head><body>';
        htmlFormat += "<h1>Hired freelancers</h1><ul>";
        hiredFreelancers.forEach((hire) => {
            htmlFormat += `<li>ID: ${hire.id}</li>`;
        });
        htmlFormat += "</ul></body></html>";
        res.setHeader("Content-Type", "text/html");
        res.send(htmlFormat);
    } else {
        res.status(406).json({
            error: 'Not acceptable MIME type. Use "application/json", "application/xml", or "text/html".',
        });
    }
});

// post requests
app.post("/api/freelancers", (req, res) => {
    try {
        let freelancers = getFreelancers();

        const data = req.body;
        data.id = Math.floor(Math.random() * 1000000);
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

        if (hiredFreel.some((hire) => hire.id === data)) {
            console.log("executed some condition");
            return res.status(400).json("Error: duplicate hired freelancer");
        }

        const jsonData = {
            id: data,
        };
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

// delete
app.delete("/api/hired/:id", (req, res) => {
    console.log(req.params.id);

    try {
        let hiredFreel = getHiredFreelancers();

        const urlId = req.params.id;
        const data = parseInt(urlId);

        if (!hiredFreel.some((hire) => hire.id === data)) {
            console.log("DIDNT FIND");
            return res.status(400).json(
                JSON.stringify({
                    Error: `No hired freelancers exist with id: ${data}`,
                })
            );
        }

        const indexToRemove = hiredFreel.findIndex((hire) => hire.id === data);

        if (indexToRemove < 0) {
            return res
                .status(500)
                .json(JSON.stringify({ Error: `Couldn't find id ${data}` }));
        }

        hiredFreel.splice(indexToRemove, 1);

        fs.writeFileSync(
            path.join(__dirname, "data", "h.json"),
            JSON.stringify(hiredFreel, null, 2)
        );

        res.status(204).send();
    } catch (e) {
        res.status(500).json("Error submitting data:" + e);
    }
});

app.listen(3001, () => {
    console.log("Server has started listening on port 3001");
});
