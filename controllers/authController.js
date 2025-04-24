const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Joi = require("joi");
const User = require("../models/user");

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const SECRET_KEY = process.env.JWT_SECRET || "defaultsecret";

const register = async (req, res, next) => {
    try {
        // 1️⃣ Валідація даних
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { email, password } = req.body;

        // 2️⃣ Перевірка унікальності емейла
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email in use" });
        }

        // 3️⃣ Хешування пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Генерація Gravatar URL
        const avatarURL = gravatar.url(email, { s: "250", d: "retro" });

        // 5️⃣ Створення користувача з avatarURL
        const newUser = await User.create({
            email,
            password: hashedPassword,
            avatarURL,
        });

        // 6️⃣ Відповідь клієнту
        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL,
            },
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        // Валідація
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        // Перевірка існування та пароля
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }

        // Генерація токена
        const payload = { id: user.id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

        await user.update({ token });

        // Повертаємо токен і дані юзера
        res.status(200).json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
                avatarURL: user.avatarURL,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login,
};
