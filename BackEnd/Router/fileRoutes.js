  const express = require("express");
  const multer = require("multer");
  const path = require("path");
  const { uploadFile, downloadFile } = require("../Controller/fileController");
  const JWTverify = require("../Middleware/Jwtverify");

  const router = express.Router();

  // Configure Multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
  });
  const upload = multer({ storage });

  router.use(JWTverify);

  // Upload a file
  router.post("/upload", upload.single("file"), uploadFile);

  // Download a file
  router.get("/:id", downloadFile);

  module.exports = router;
