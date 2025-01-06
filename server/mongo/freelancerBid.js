const mongoose = require("mongoose");

const freelancerBidSchema = new mongoose.Schema({
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Freelancer",
        required: true,
    },
    bidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
        required: true,
    },
    deadline: { type: Date, required: true },
    assigned: { type: Date },
});

const FreelancerBid = mongoose.model("FreelancerBid", freelancerBidSchema);

module.exports = FreelancerBid;
