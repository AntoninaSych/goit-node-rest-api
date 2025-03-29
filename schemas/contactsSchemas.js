const Joi = require("joi");

// Схема для створення нового контакту (POST)
const addContactSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" is required`,
    }),
    email: Joi.string().required().messages({
        "any.required": `"email" is required`,
    }),
    phone: Joi.string().required().messages({
        "any.required": `"phone" is required`,
    }),
});

// Схема для оновлення (PUT) – принаймні одне з полів має бути
const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
}).min(1);

module.exports = {
    addContactSchema,
    updateContactSchema,
};
