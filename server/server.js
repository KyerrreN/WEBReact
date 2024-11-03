const express = require("express");
const path = require("path");
const app = express();

// usestaticfiles
const publicPath = path.join(__dirname, "..", "client", "public");
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(3001, () => {
    console.log("Server has started listening on port 3001");
});
