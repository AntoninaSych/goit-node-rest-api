const express = require("express");
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
} = require("../services/contactsServices");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.json(contacts);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const contact = await getContactById(req.params.id);
        if (!contact) return res.status(404).json({ message: "Not found" });
        res.json(contact);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newContact = await addContact({ name, email, phone });
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const contact = await removeContact(req.params.id);
        if (!contact) return res.status(404).json({ message: "Not found" });
        res.json(contact);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Body must have at least one field" });
        }

        const contact = await updateContact(req.params.id, req.body);
        if (!contact) return res.status(404).json({ message: "Not found" });
        res.json(contact);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id/favorite", async (req, res, next) => {
    try {
        const { favorite } = req.body;
        if (typeof favorite !== "boolean") {
            return res.status(400).json({ message: "Missing field favorite" });
        }

        const contact = await updateStatusContact(req.params.id, { favorite });
        if (!contact) return res.status(404).json({ message: "Not found" });
        res.json(contact);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
