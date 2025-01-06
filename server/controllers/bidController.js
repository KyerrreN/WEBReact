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

        const normalizedSort = sort.toUpperCase();
        console.log(normalizedSort);

        if (normalizedSort !== "ASC" && normalizedSort !== "DESC") {
            jsonRes.data =
                "Order has to be either ASC or DESC (case insensitive)";

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.Bid.findAll({
                order: [["payment", normalizedSort]],
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
        const { name, spec } = req.query;
        const jsonRes = {
            success: false,
        };

        const filter = {};

        if (name) {
            filter.name = { [Op.like]: `%${name}%` };
        }

        if (spec) {
            filter.spec = { [Op.like]: `%${spec}%` };
        }

        if (JSON.stringify(filter) === "{}") {
            jsonRes.data = "Bad request. Accepted properties: name, spec";
            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.Bid.findAll({
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

    // 5) получение списка записей с поддержкой поиска, в том числе по
    // нескольким полям одновременно;
    async getAllSearch(req, res) {
        const { query } = req.query;
        const jsonRes = {
            success: false,
        };

        if (!query) {
            jsonRes.data = 'Query "query" must be specified';

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.Bid.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { desc: { [Op.like]: `%${query}%` } },
                        { spec: { [Op.like]: `%${query}%` } },
                    ],
                },
            });

            if (found.length === 0) {
                jsonRes.data = "No match for your search query.";

                res.status(404).json(jsonRes);
                return;
            }

            jsonRes.data = found;
            jsonRes.success = true;

            res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 6) получение детальной информации по ID;
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
            const found = await db.Bid.findAll({
                where: {
                    id: numberId,
                },
            });

            if (found.length === 0) {
                jsonRes.data =
                    "Couldn't find a row with specified id. Id: " + numberId;

                res.status(404).json(jsonRes);
                return;
            }

            if (found.length > 1) {
                jsonRes.data = "Several rows with id: " + numberId;

                res.status(500).json(jsonRes);
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

    // 7) обработка случая отсутствия записи; ?????????????????????????????????????????????????
    async getIsExist(req, res) {
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
            const found = await db.Bid.findAll({
                attributes: ["id"],
                where: {
                    id: numberId,
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
