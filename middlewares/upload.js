const multer  = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../temp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, tempDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${req.user.id}_${Date.now()}${ext}`);
    }
});

module.exports = multer({ storage });
