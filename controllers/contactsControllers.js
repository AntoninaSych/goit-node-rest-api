const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require("../services/contactsServices");

const HttpError = require("../helpers/HttpError");

// Отримати весь список контактів (GET /api/contacts)
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

// Отримати контакт за id (GET /api/contacts/:id)
const getContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);
        if (!contact) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

// Додати новий контакт (POST /api/contacts)
const addContactHandler = async (req, res, next) => {
    try {
        // Якщо дійшли сюди – body вже провалідований мідлварою
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

// Видалити контакт за id (DELETE /api/contacts/:id)
const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const removedContact = await removeContact(id);
        if (!removedContact) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(removedContact);
    } catch (error) {
        next(error);
    }
};

// Оновити контакт за id (PUT /api/contacts/:id)
const updateContactHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        // У body можуть бути будь-які з [name, email, phone], але хоча б одне з них
        const updatedContact = await updateContact(id, req.body);
        if (!updatedContact) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllContacts,
    getContact,
    addContact: addContactHandler,
    deleteContact,
    updateContact: updateContactHandler,
};
