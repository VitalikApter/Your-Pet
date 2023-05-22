const express = require("express");
const ctrl = require("../../controllers/auth-controllers");
const { validateBody } = require("../../utils");
const { authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const uploadCloud = require("../../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/users/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/users/logout", authenticate, ctrl.logout);
router.get("/users/current", authenticate, ctrl.getCurrent);
router.put("/users/update/:id", authenticate, validateBody(schemas.addSchema), ctrl.updateUserById);
router.get("/users/newtoken/:id", authenticate, ctrl.refreshToken);
router.patch("/users/updateavatar", authenticate, uploadCloud.single("image"), ctrl.updateAvatar)

module.exports = router;
