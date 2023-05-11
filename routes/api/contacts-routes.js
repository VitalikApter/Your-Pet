const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const {authenticate}  = require("../../middlewares");

const router = express.Router();

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate,  validateBody(schemas.addSchema), ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:id", authenticate,  validateBody(schemas.addSchema), ctrl.deleteContactById);

router.put(
  "/:id",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);
router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
