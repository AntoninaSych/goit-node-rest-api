const Contact = require('../models/contact');

const listContacts = async () => {
    return await Contact.findAll();
};

const getContactById = async (id) => {
    return await Contact.findByPk(id);
};

const removeContact = async (id) => {
    const contact = await getContactById(id);
    if (!contact) return null;
    await contact.destroy();
    return contact;
};

const addContact = async ({ name, email, phone }) => {
    return await Contact.create({ name, email, phone });
};

const updateContact = async (id, data) => {
    const contact = await getContactById(id);
    if (!contact) return null;
    await contact.update(data);
    return contact;
};

const updateStatusContact = async (id, { favorite }) => {
    const contact = await getContactById(id);
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
