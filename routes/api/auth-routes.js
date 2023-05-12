const express = require("express");

const ctrl = require("../../controllers/auth-controllers");

const {validateBody} = require("../../utils");

const {authenticate, upload} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post("/users/register", validateBody(schemas.registerSchema), ctrl.register);

// signin
router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);





router.get("/users/current", authenticate, ctrl.getCurrent);

router.post("/users/logout", authenticate, ctrl.logout);

router.patch("/users/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router;