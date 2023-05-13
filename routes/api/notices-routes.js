const express = require("express");
const ctrl = require("../../controllers/notices-controllers");
const router = express.Router();
const { validateBody } = require("../../utils");
const { NoticeSchemas } = require("../../models/notice");
const { isValidId } = require("../../middlewares");

router.post("/addnotice", validateBody(NoticeSchemas.addNotice), ctrl.addNotice);
router.get("/search/", ctrl.getNoticesByTitle);
router.get("/", ctrl.getNoticesByCategory);
router.get("/:id", isValidId, ctrl.getNoticeById);
module.exports = router;