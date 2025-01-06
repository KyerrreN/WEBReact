const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    spec: { type: String, required: true },
    payment: { type: Number, required: true },
});

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
