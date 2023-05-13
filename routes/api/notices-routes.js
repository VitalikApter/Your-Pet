const express = require("express");
const ctrl = require("../../controllers/notices-controllers");
const router = express.Router();
const { validateBody } = require("../../utils");
const { NoticeSchemas } = require("../../models/notice");
const { isValidId } = require("../../middlewares");
const {authenticate}  = require("../../middlewares");

router.post("/addnotice", authenticate, validateBody(NoticeSchemas.addNotice), ctrl.addNotice);
router.get("/search/", ctrl.getNoticesByTitle);
router.get("/", ctrl.getNoticesByCategory);
router.get("/mynotices", authenticate, ctrl.getNoticesСreatedByUser);
router.get("/:id", isValidId, ctrl.getNoticeById);
router.delete("/:id", authenticate, ctrl.deleteNoticeCreatedByUser);

module.exports = router;