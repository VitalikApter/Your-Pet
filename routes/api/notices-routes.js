const express = require("express");
const ctrl = require("../../controllers/notices-controllers");
const router = express.Router();
const { isValidId } = require("../../middlewares");
const { authenticate } = require("../../middlewares");
const uploadCloud = require("../../middlewares/uploadMiddleware");

router.post("/addnotice", authenticate, uploadCloud.single("image"), ctrl.addNotice);
router.get("/", ctrl.getNoticesBySearchOrCategory);
router.get("/userfavoritenotices", authenticate, ctrl.getNoticesAddedToFavoriteByUser);
router.get("/:id", isValidId, ctrl.getNoticeById);
router.get("/mynotices", authenticate, ctrl.getNoticesСreatedByUser);
router.delete("/removenoticefromfavorite/:id", authenticate, isValidId, ctrl.deleteNoticeFromFavorite);
router.delete("/:id", authenticate, ctrl.deleteNoticeCreatedByUser);
router.patch("/addnoticetofavorite/:id", authenticate, isValidId, ctrl.addNoticeToFavorite);

module.exports = router;
