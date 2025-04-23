const express = require('express');
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
} = require('../services/contactsServices');

const router = express.Router();

// PATCH /api/contacts/:id/favorite
router.patch('/:id/favorite', async (req, res, next) => {
    try {
        const { favorite } = req.body;

        // 1. Перевірка: чи передано поле favorite
        if (favorite === undefined) {
            return res.status(400).json({ message: 'Missing field favorite' });
        }

        // 2. Валідація типу (true/false)
        if (typeof favorite !== 'boolean') {
            return res.status(400).json({ message: 'Field favorite must be boolean' });
        }

        // 3. Оновлення
        const contact = await updateStatusContact(req.params.id, { favorite });

        // 4. Обробка "не знайдено"
        if (!contact) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
