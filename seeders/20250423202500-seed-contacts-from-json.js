'use strict';
const fs = require("fs");
const path = require("path");

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataPath = path.resolve(__dirname, "../db/contacts.json");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const contacts = JSON.parse(raw);

    const timestampedContacts = contacts.map((contact) => ({
      ...contact,
      favorite: contact.favorite ?? false,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert("contacts", timestampedContacts);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contacts", null, {});
  }
};
