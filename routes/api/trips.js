const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");

const { trips: ctrl } = require("../../controllers");

router.get("/", auth, ctrl.getAll);

router.post("/", auth, ctrl.add);

module.exports = router;
