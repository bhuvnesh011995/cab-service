const multer = require("multer");
const fs = require("fs");

const uploadDir = "uploads/images/";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `dixxi${
      Date.now() + Math.round(Math.random() * 1e9) + file.originalname
    }`;
    cb(null, uniqueName);
  },
});

const uploadFile = multer({ storage });
module.exports = { uploadFile };
