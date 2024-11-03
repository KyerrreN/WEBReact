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

// usestaticfiles
const publicPath = path.join(__dirname, "..", "client", "public");
app.use(express.static(publicPath));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

//get requests
app.get("/api/freelancers", (req, res) => {
    const data = getFreelancers();
    res.status(200).json(data);
});
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(3001, () => {
    console.log("Server has started listening on port 3001");
});
