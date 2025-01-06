const db = require("../db/models");
const { Op } = require("sequelize");
const mongoose = require("mongoose");
const Bid = require("../mongo/bid");

class BidController {
    // 1) создание новой записи;
    async create(req, res) {
        const { name, desc, spec, payment } = req.body;

        try {
            const newBid = await Bid.create({
                name,
                desc,
                spec,
                payment,
            });
            return res.status(201).json({
                success: true,
                data: newBid,
            });
        } catch (e) {
            return res.status(400).json({
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
            const bids = await Bid.find()
                .skip(offset)
                .limit(Number(limit))
                .exec();

            const totalCount = await Bid.countDocuments();

            if (bids.length === 0) {
                if (totalCount > 0) {
                    return res.status(404).json({
                        success: false,
                        data: "No more rows using your paging parameters are available",
                    });
                }

                return res.status(404).json({
                    success: false,
                    data: "No values in the table Bids",
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    totalCount,
                    bids,
                },
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                data: e.message,
            });
        }
    }

    // 3) получение списка записей с поддержкой сортировки;
    // в моем случае по оплате
    async getAllSorted(req, res) {
        const { sort } = req.query;
        const jsonRes = {
            success: false,
        };

        const normalizedSort = sort ? sort.toUpperCase() : "ASC";

        if (normalizedSort !== "ASC" && normalizedSort !== "DESC") {
            jsonRes.data =
                "Order has to be either ASC or DESC (case insensitive)";
            return res.status(400).json(jsonRes);
        }

        try {
            const found = await Bid.find()
                .sort({ payment: normalizedSort === "ASC" ? 1 : -1 })
                .exec();

            jsonRes.success = true;
            jsonRes.data = found;

            return res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;
            return res.status(500).json(jsonRes);
        }
    }

    // 4) получение списка записей с поддержкой фильтрации, в том
    // числе по нескольким полям одновременно
    async getAllFiltered(req, res) {
        const { name, spec } = req.query;
        const jsonRes = {
            success: false,
        };

        const filter = {};

        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        if (spec) {
            filter.spec = { $regex: spec, $options: "i" };
        }

        if (Object.keys(filter).length === 0) {
            jsonRes.data = "Bad request. Accepted properties: name, spec";
            return res.status(400).json(jsonRes);
        }

        try {
            const found = await Bid.find(filter).exec();

            if (found.length > 0) {
                jsonRes.success = true;
                jsonRes.data = found;
                return res.status(200).json(jsonRes);
            } else {
                jsonRes.data = "Couldn't find data with your request";
                return res.status(404).json(jsonRes);
            }
        } catch (e) {
            jsonRes.data = e.message;
            return res.status(500).json(jsonRes);
        }
    }

    // 5) получение списка записей с поддержкой поиска, в том числе по
    // нескольким полям одновременно;
    async getAllSearch(req, res) {
        const { query } = req.query;
        const jsonRes = {
            success: false,
        };

        if (!query) {
            jsonRes.data = 'Query "query" must be specified';
            return res.status(400).json(jsonRes);
        }

        try {
            const found = await Bid.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { desc: { $regex: query, $options: "i" } },
                    { spec: { $regex: query, $options: "i" } },
                ],
            }).exec();

            if (found.length === 0) {
                jsonRes.data = "No match for your search query.";
                return res.status(404).json(jsonRes);
            }

            jsonRes.data = found;
            jsonRes.success = true;

            return res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;
            return res.status(500).json(jsonRes);
        }
    }

    // 6) получение детальной информации по ID;
    async getById(req, res) {
        const { id } = req.params;
        const jsonRes = {
            success: false,
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            jsonRes.data = "Id must be a valid ObjectId";
            return res.status(400).json(jsonRes);
        }

        try {
            const found = await Bid.findById(id).exec();

            if (!found) {
                jsonRes.data =
                    "Couldn't find a bid with specified id. Id: " + id;
                return res.status(404).json(jsonRes);
            }

            jsonRes.success = true;
            jsonRes.data = found;

            return res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;
            return res.status(500).json(jsonRes);
        }
    }

    // 7) обработка случая отсутствия записи; ?????????????????????????????????????????????????
    async getIsExist(req, res) {
        const { id } = req.params;
        const jsonRes = {
            success: false,
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            jsonRes.data = "Id must be a valid ObjectId";
            return res.status(400).json(jsonRes);
        }

        try {
            const found = await Bid.findById(id).select("id").exec();

            if (!found) {
                jsonRes.data = false;
                jsonRes.success = true;
                return res.status(200).json(jsonRes);
            }

            jsonRes.success = true;
            jsonRes.data = true;

            return res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;
            return res.status(500).json(jsonRes);
        }
    }

    // 8) обновление записи;
    async put(req, res) {
        const { name, desc, spec, payment } = req.body;
        const reqId = req.params.id;
        const jsonRes = {
            success: false,
            data: "",
        };

        const id = Number(reqId);

        if (!Number.isInteger(id)) {
            jsonRes.data = "Id can only be integer";

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.Bid.findByPk(id, {
                attributes: ["id"],
            });

            if (found === null) {
                jsonRes.data = "Couldn't find a row with id: " + id;

                res.status(400).json(jsonRes);
            }

            await found.update({
                name: name,
                desc: desc,
                spec: spec,
                payment: payment,
            });

            res.status(204).json();
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 9) удаление записи;
    async delete(req, res) {
        const reqId = req.params.id;
        const jsonRes = {
            success: false,
            data: "",
        };

        const id = Number(reqId);

        if (!Number.isInteger(id)) {
            jsonRes.data = "Id can only be integer";

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.Bid.findByPk(id, {
                attributes: ["id"],
            });

            if (found === null) {
                jsonRes.data = "Couldn't find row with id: " + id;

                res.status(404).json(jsonRes);
                return;
            }

            await found.destroy();

            res.status(201).json();
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }
}

module.exports = new BidController();
