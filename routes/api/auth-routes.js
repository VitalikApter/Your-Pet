const express = require("express");



const ctrl = require("../../controllers/auth-controllers");

const { validateBody } = require("../../utils");

const { authenticate} = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

// signin
router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/users/current", authenticate, ctrl.getCurrent);

router.post("/users/logout", authenticate, ctrl.logout);

router.put(
  "/users/update/:id",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateUserById
);


module.exports = router;
