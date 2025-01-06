const db = require("../db/models");
const { Op } = require("sequelize");
const Freelancer = require("../mongo/freelancer");
const mongoose = require("mongoose");

class FreelancerController {
    // 1) создание новой записи;
    async create(req, res) {
        const { name, surname, spec, rating, header, piclink } = req.body;

        if (!name || !surname || !spec || !rating || !header) {
            return res.status(400).json({
                success: false,
                data: "Specify all fields: name, surname, spec, rating, header",
            });
        }

        try {
            const newFreelancer = new Freelancer({
                name,
                surname,
                spec,
                rating,
                header,
                piclink: "1.jpg",
            });

            // Save the new freelancer to the database
            await newFreelancer.save();

            // Respond with success
            res.status(201).json({
                success: true,
                data: newFreelancer,
            });
        } catch (e) {
            // Handle validation errors or other issues
            res.status(400).json({
                success: false,
                data: e.message,
            });
        }
    }
    // 2) получение списка записей с поддержкой пагинации;
    async getAllPaging(req, res) {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const offset = (pageNumber - 1) * limitNumber;

        if (
            !Number.isInteger(pageNumber) ||
            !Number.isInteger(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1
        ) {
            return res.status(400).json({
                success: false,
                data: "Page and limit values must be positive integers",
            });
        }

        try {
            const freelancers = await Freelancer.find()
                .skip(offset)
                .limit(limitNumber);

            const totalFreelancers = await Freelancer.countDocuments();

            if (freelancers.length === 0) {
                return res.status(404).json({
                    success: false,
                    data: "No freelancers found",
                });
            }

            res.status(200).json({
                success: true,
                data: {
                    freelancers,
                    total: totalFreelancers,
                    page: pageNumber,
                    limit: limitNumber,
                    totalPages: Math.ceil(totalFreelancers / limitNumber),
                },
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                data: e.message,
            });
        }
    }

    // 3) получение списка записей с поддержкой сортировки;
    // в моем случае по рейтингу
    async getAllSorted(req, res) {
        const { sort } = req.query;
        const jsonRes = {
            success: false,
        };

        const normalizedSort = (sort && sort.toUpperCase()) || "ASC";

        if (normalizedSort !== "ASC" && normalizedSort !== "DESC") {
            jsonRes.data =
                "Order has to be either ASC or DESC (case insensitive)";
            return res.status(400).json(jsonRes);
        }

        try {
            const freelancers = await Freelancer.find().sort({
                rating: normalizedSort === "ASC" ? 1 : -1,
            });

            jsonRes.success = true;
            jsonRes.data = freelancers;

            res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;
            res.status(500).json(jsonRes);
        }
    }

    // 4) получение списка записей с поддержкой фильтрации, в том
    // числе по нескольким полям одновременно
    async getAllFiltered(req, res) {
        const { name, surname, spec, rating } = req.query;
        const jsonRes = {
            success: false,
        };

        const filter = {};

        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        if (surname) {
            filter.surname = { $regex: surname, $options: "i" };
        }

        if (spec) {
            filter.spec = { $regex: spec, $options: "i" };
        }

        if (rating) {
            filter.rating = rating;
        }

        if (Object.keys(filter).length === 0) {
            jsonRes.data =
                "Bad request. Accepted properties: name, surname, spec, rating";
            return res.status(400).json(jsonRes);
        }

        try {
            const freelancers = await Freelancer.find(filter);

            if (freelancers.length > 0) {
                jsonRes.success = true;
                jsonRes.data = freelancers;
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
            const found = await Freelancer.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { surname: { $regex: query, $options: "i" } },
                    { spec: { $regex: query, $options: "i" } },
                ],
            });

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
            const found = await Freelancer.findById(id);

            if (!found) {
                jsonRes.data =
                    "Couldn't find a freelancer with specified id. Id: " + id;
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
            const found = await Freelancer.findById(id).select("id");

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
        const { name, surname, spec, header } = req.body;
        const reqId = req.params.id;
        const jsonRes = {
            success: false,
            data: "",
        };

        if (!mongoose.Types.ObjectId.isValid(reqId)) {
            jsonRes.data = "Id must be a valid ObjectId";
            return res.status(400).json(jsonRes);
        }

        try {
            const found = await Freelancer.findById(reqId);

            if (!found) {
                jsonRes.data = "Couldn't find a freelancer with id: " + reqId;
                return res.status(404).json(jsonRes);
            }

            found.name = name;
            found.surname = surname;
            found.spec = spec;
            found.header = header;

            await found.save();
            return res.status(204).json();
        } catch (e) {
            jsonRes.data = e.message;
            return res.status(500).json(jsonRes);
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
            const found = await db.Freelancer.findByPk(id, {
                attributes: ["id"],
            });

            if (found === null) {
                jsonRes.data = "Couldn't find row with id: " + id;

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

module.exports = new FreelancerController();
