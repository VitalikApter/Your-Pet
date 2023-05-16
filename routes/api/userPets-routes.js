const express = require("express");
const ctrl = require("../../controllers/pets-controllers");
const router = express.Router();
const { isValidId } = require("../../middlewares");
const { authenticate }  = require("../../middlewares");
const uploadCloud = require("../../middlewares/uploadMiddleware");

router.post("/adduserpet", authenticate, uploadCloud.single("image"), ctrl.addUserPet);
router.delete("/removeuserpet/:id", authenticate, isValidId, ctrl.deleteUserPet);

module.exports = router;