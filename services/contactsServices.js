const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);
    return foundContact || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
    return removedContact;
}

// Для створення нового контакту. У body можна передавати { name, email, phone }.
async function addContact({ name, email, phone }) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
    return newContact;
}

// Оновлення контакту за ID. У body можуть бути будь-які поля: name, email, phone.
async function updateContact(contactId, body) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    // Перезаписуємо частково поля (ті, що прийшли з body, оновлюємо)
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
    return contacts[index];
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
