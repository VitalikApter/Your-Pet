const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/news-controllers");

router.get("/", ctrl.getAllNews);
module.exports = router;