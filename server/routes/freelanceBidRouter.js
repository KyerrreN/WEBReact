const Router = require("express");
const router = new Router();
const freelanceBidController = require("../controllers/freelanceBidController");

// GET
router.get("/", freelanceBidController.getAllPaging);
router.get("/get/filter", freelanceBidController.getAllFiltered);
router.get("/get/sort", freelanceBidController.getAllSorted);
router.get("/get/:id", freelanceBidController.getById);

// POST
router.post("/", freelanceBidController.create);

// PUT
router.put("/:freelid/:bidid", freelanceBidController.put);

// DELETE
router.delete("/:freelid/:bidid", freelanceBidController.delete);

module.exports = router;
