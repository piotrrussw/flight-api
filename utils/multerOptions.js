const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) =>
        callback(null, `${new Date().toISOString()}-${file.originalname}`)
});

const fileFilter = (req, file, callback) => {
    const allowedMimeTypes =
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg";

    callback(null, allowedMimeTypes);
};

module.exports = { storage, fileFilter };
