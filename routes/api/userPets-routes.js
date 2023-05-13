const express = require("express");
const ctrl = require("../../controllers/pets-controllers");
const router = express.Router();
const { validateBody } = require("../../utils");
const { UserPetSchemas } = require("../../models/userPet");
const { isValidId } = require("../../middlewares");
const {authenticate}  = require("../../middlewares");

router.post("/", authenticate, validateBody(UserPetSchemas.addUserPet), ctrl.addUserPet);
router.delete("/:id", authenticate, isValidId, ctrl.deleteUserPet);

module.exports = router;