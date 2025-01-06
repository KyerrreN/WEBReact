require("dotenv").config({ path: `${process.cwd()}/.env` });
const path = require("path");
const PORT = process.env.APP_PORT || 3001;
const express = require("express");
const db = require("./db/models/index");
const cors = require("cors");
const router = require("./routes/index");
const mongoose = require("mongoose");

const app = express();

// MW
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/api", router);

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/FreelancerMockProject", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
