const express = require("express");
const router = express.Router();

const { trips: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);

router.post("/", ctrl.add);

module.exports = router;
