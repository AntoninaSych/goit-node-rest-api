const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require("../services/contactsServices");

const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, favorite } = req.query;
        const contacts = await listContacts(req.user.id, { page, limit, favorite });
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

const getContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);

        if (!contact || contact.owner !== req.user.id) {
            throw HttpError(404, "Not found");
        }

        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

const addContactHandler = async (req, res, next) => {
    try {
        const { name, email, phone, favorite } = req.body;
        const newContact = await addContact({
            name,
            email,
            phone,
            favorite,
            owner: req.user.id,
        });
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);

        if (!contact || contact.owner !== req.user.id) {
            throw HttpError(404, "Not found");
        }

        await removeContact(id);
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

const updateContactHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);

        if (!contact || contact.owner !== req.user.id) {
            throw HttpError(404, "Not found");
        }

        const updatedContact = await updateContact(id, req.body);
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
