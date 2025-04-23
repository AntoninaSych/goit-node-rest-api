const express = require("express");
const { register, login } = require("../controllers/authController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", auth, async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
});
router.post("/logout", auth, async (req, res, next) => {
    try {
        await req.user.update({ token: null });
        res.status(204).send(); // No Content
    } catch (err) {
        next(err);
    }
});
module.exports = router;
