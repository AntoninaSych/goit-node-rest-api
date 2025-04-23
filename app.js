const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const contactsRouter = require("./routes/contacts");
const HttpError = require("./helpers/HttpError");
const { connectDB } = require("./db/sequelize");

const app = express();
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use((req,
         res,
         next) => {
    next(HttpError(404, "Not found"));
});

app.use((error,
         req,
         res, next) => {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
});

const start = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};

start();