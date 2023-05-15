const express = require("express");
const ctrl = require("../../controllers/notices-controllers");
const router = express.Router();
const { validateBody } = require("../../utils");
const { NoticeSchemas } = require("../../models/notice");
const { isValidId } = require("../../middlewares");
const { authenticate } = require("../../middlewares");

router.post(
  "/addnotice",
  authenticate,
  validateBody(NoticeSchemas.addNotice),
  ctrl.addNotice
);
router.get("/search/", ctrl.getNoticesByTitle);
router.get("/", ctrl.getNoticesByCategory);
router.get("/userfavoritenotices", authenticate, ctrl.getNoticesAddedToFavoriteByUser);
router.get("/mynotices", authenticate, ctrl.getNoticesСreatedByUser);
router.get("/:id", isValidId, ctrl.getNoticeById);
router.delete("/removenoticefromfavorite/:id", authenticate, isValidId, ctrl.deleteNoticeFromFavorite);
router.delete("/:id", authenticate, ctrl.deleteNoticeCreatedByUser);
router.post("/addnoticetofavorite/:id", authenticate, isValidId, ctrl.addNoticeToFavorite);

module.exports = router;
