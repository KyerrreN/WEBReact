const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    spec: { type: String, required: true },
    header: { type: String, required: true },
    piclink: { type: String, required: true },
    rating: { type: Number, required: true },
});

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

module.exports = Freelancer;
