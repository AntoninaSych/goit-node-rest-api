const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/contactsRoutes");
const HttpError = require("./helpers/HttpError");

const app = express();

app.use(logger("dev"));
app.use(cors());

app.use(express.json());


app.use("/api/contacts", contactsRouter);


app.use((req, res, next) => {
    next(HttpError(404, "Not found"));
});


app.use((error, req, res, next) => {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
});

module.exports = app;
