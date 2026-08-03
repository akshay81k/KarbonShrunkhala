const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * upload.middleware.js — Multer File Upload Middleware
 *
 * Configures disk storage for project evidence files and GeoJSON uploads.
 * Files are saved in backend/uploads/ directory.
 */

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowedExtensions = [".json", ".geojson", ".pdf", ".png", ".jpg", ".jpeg", ".zip"];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext) || file.mimetype === "application/json") {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed extensions: ${allowedExtensions.join(", ")}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max file size
});

module.exports = upload;
