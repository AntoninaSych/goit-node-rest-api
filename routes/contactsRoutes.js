const express = require("express");
const ctrl = require("../controllers/contactsControllers");
const validateBody = require("../helpers/validateBody");
const schemas = require("../schemas/contactsSchemas");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContact);

router.post("/", validateBody(schemas.addContactSchema), ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put(
    "/:id",
    validateBody(schemas.updateContactSchema),
    ctrl.updateContact
);

module.exports = router;
