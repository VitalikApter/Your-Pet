const express = require("express");
const ctrl = require("../../controllers/pets-controllers");
const router = express.Router();
const { validateBody } = require("../../utils");
const { UserPetSchemas } = require("../../models/userPet");
const { isValidId } = require("../../middlewares");

router.post("/", validateBody(UserPetSchemas.addUserPet), ctrl.addUserPet);
router.delete("/:id", isValidId, ctrl.deleteUserPet);

module.exports = router;