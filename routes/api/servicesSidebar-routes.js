const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/servicesSidebar-controllers");

router.get("/", ctrl.getAllServices);
module.exports = router;