const Contact = require("../models/contact");

const listContacts = async (ownerId) => {
    return await Contact.findAll({ where: { owner: ownerId } });
};

const getContactById = async (id, ownerId) => {
    return await Contact.findOne({ where: { id, owner: ownerId } });
};

const addContact = async ({ name, email, phone, owner }) => {
    return await Contact.create({ name, email, phone, owner });
};

const removeContact = async (id, ownerId) => {
    const contact = await getContactById(id, ownerId);
    if (!contact) return null;
    await contact.destroy();
    return contact;
};

const updateContact = async (id, data, ownerId) => {
    const contact = await getContactById(id, ownerId);
    if (!contact) return null;
    await contact.update(data);
    return contact;
};

const updateStatusContact = async (id, { favorite }, ownerId) => {
    const contact = await getContactById(id, ownerId);
    if (!contact) return null;
    await contact.update({ favorite });
    return contact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
};
