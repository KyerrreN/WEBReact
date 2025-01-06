const db = require("../db/models");
const { Op, where } = require("sequelize");
const mongoose = require("mongoose");
const FreelancerBid = require("../mongo/freelancerBid");

class FreelanceBidController {
    // 1) создание новой записи;
    async create(req, res) {
        const { freelancerId, bidId, deadline, assigned } = req.body;

        console.log(req.body);
        if (!freelancerId || !Number.isInteger(Number(freelancerId))) {
            res.status(400).json({
                success: false,
                data: "freelancerId is required and must be an integer",
            });

            return;
        }

        if (!bidId || !Number.isInteger(Number(bidId))) {
            res.status(400).json({
                success: false,
                data: "bidId is required and must be an integer",
            });

            return;
        }

        try {
            const newFreelancerBid = await db.FreelancerBid.create({
                freelancerId,
                bidId,
                deadline,
                assigned,
            });
            res.status(201).json({
                success: true,
                data: newFreelancerBid,
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                data: e.message,
            });
        }
    }
    // 2) получение списка записей с поддержкой пагинации;
    async getAllPaging(req, res) {
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        if (
            !Number.isInteger(Number(limit)) ||
            !Number.isInteger(Number(offset))
        ) {
            return res.status(400).json({
                success: false,
                data: "page and limit values must be integers",
            });
        }

        try {
            const found = await FreelancerBid.find()
                .populate("freelancerId")
                .populate("bidId")
                .skip(offset)
                .limit(Number(limit))
                .exec();

            const transformedBids = found.map((bid) => ({
                ...bid.toObject(),
                Freelancer: bid.freelancerId,
                Bid: bid.bidId,
            }));

            const totalCount = await FreelancerBid.countDocuments().exec();

            res.status(200).json({
                success: true,
                data: {
                    totalCount,
                    totalPages: Math.ceil(totalCount / limit),
                    currentPage: Number(page),
                    bids: transformedBids,
                },
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                data: e.message,
            });
        }
    }
    // 3) получение списка записей с поддержкой сортировки;
    // в моем случае по дате
    async getAllSorted(req, res) {
        console.warn("FDSAFA");
        const { sort } = req.query;
        const jsonRes = {
            success: false,
        };

        let normalizedSort;
        try {
            normalizedSort = sort.toUpperCase();
        } catch (e) {
            res.status(400).json({
                success: false,
                data: "You haven't specified sort",
            });

            return;
        }

        if (normalizedSort !== "ASC" && normalizedSort !== "DESC") {
            jsonRes.data =
                "Order has to be either ASC or DESC (case insensitive)";

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.FreelancerBid.findAll({
                order: [["deadline", normalizedSort]],
            });

            jsonRes.success = true;
            jsonRes.data = found;

            res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 4) получение списка записей с поддержкой фильтрации, в том
    // числе по нескольким полям одновременно
    async getAllFiltered(req, res) {
        const { assigned, deadline } = req.query;
        const jsonRes = {
            success: false,
        };

        const filter = {};

        if (assigned) {
            filter.assigned = assigned;
        }

        if (deadline) {
            filter.deadline = deadline;
        }

        if (JSON.stringify(filter) === "{}") {
            jsonRes.data =
                "Bad request. Accepted properties: assigned, deadline";
            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.FreelancerBid.findAll({
                where: filter,
            });

            if (found.length > 0) {
                jsonRes.success = true;
                jsonRes.data = found;

                res.status(200).json(jsonRes);
            } else {
                jsonRes.data = "Couldn't find data with your request";

                res.status(404).json(jsonRes);
            }
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 5) получение детальной информации по ID;
    async getById(req, res) {
        const { id } = req.params;
        const jsonRes = {
            success: false,
        };

        const numberId = Number(id);
        if (!Number.isInteger(numberId)) {
            jsonRes.data = "Id can only be an integer number";

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.FreelancerBid.findAll({
                where: {
                    freelancerId: numberId,
                },
            });

            if (found.length === 0) {
                jsonRes.data =
                    "Couldn't find a row with specified id. Id: " + numberId;

                res.status(404).json(jsonRes);
                return;
            }

            jsonRes.success = true;
            jsonRes.data = found;

            res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 6) обработка случая отсутствия записи; ?????????????????????????????????????????????????
    async getIsExist(req, res) {
        const { freelid, bidid } = req.params;
        const jsonRes = {
            success: false,
        };

        const numberFreelId = Number(freelid);
        if (!Number.isInteger(numberFreelId)) {
            jsonRes.data = "Id can only be an integer number";

            res.status(400).json(jsonRes);
            return;
        }

        const numberBidId = Number(bidid);
        if (!Number.isInteger(numberBidId)) {
            jsonRes.data = "Id can only be an integer number";

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.FreelancerBid.findAll({
                where: {
                    freelancerId: numberFreelId,
                    bidId: numberBidId,
                },
            });

            if (found.length === 0) {
                jsonRes.data = false;
                jsonRes.success = true;

                res.status(200).json(jsonRes);
                return;
            }

            if (found.length > 1) {
                jsonRes.data = "Several rows with id: " + numberId;

                res.status(500).json(jsonRes);
                return;
            }

            jsonRes.success = true;
            jsonRes.data = true;

            res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 8) обновление записи;
    async put(req, res) {
        const { deadline } = req.body;
        const { freelid, bidid } = req.params;
        const jsonRes = {
            success: false,
            data: "",
        };

        const numberFreelid = Number(freelid);
        if (!Number.isInteger(numberFreelid)) {
            jsonRes.data = "Id can only be integer";

            res.status(400).json(jsonRes);
            return;
        }

        const numberBidid = Number(bidid);
        if (!Number.isInteger(numberBidid)) {
            jsonRes.data = "Id can only be integer";

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.FreelancerBid.findOne({
                where: {
                    freelancerId: numberFreelid,
                    bidId: numberBidid,
                },
            });

            if (found === null) {
                jsonRes.data = "Couldn't find a row with id: " + id;

                res.status(400).json(jsonRes);
            }

            await found.update({
                deadline,
            });

            res.status(204).json();
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 8) удаление записи;
    async delete(req, res) {
        const { freelid, bidid } = req.params;
        const jsonRes = {
            success: false,
            data: "",
        };

        const numberFreelid = Number(freelid);
        if (!Number.isInteger(numberFreelid)) {
            jsonRes.data = "Id can only be integer";

            res.status(400).json(jsonRes);
            return;
        }

        const numberBidid = Number(bidid);
        if (!Number.isInteger(numberBidid)) {
            jsonRes.data = "Id can only be integer";

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.FreelancerBid.findOne({
                where: {
                    freelancerId: numberFreelid,
                    bidId: numberBidid,
                },
            });

            if (found === null) {
                jsonRes.data =
                    "Couldn't find row with freelancerId: " +
                    numberFreelid +
                    ", and bidId: " +
                    numberBidid;

                res.status(404).json(jsonRes);
                return;
            }

            await found.destroy();

            res.status(204).json();
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }
}

module.exports = new FreelanceBidController();
