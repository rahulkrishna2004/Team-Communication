const FileModel = require("../Model/FileModel");
const path = require("path");

// Upload file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const file = new FileModel({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      uploader: req.user._id,
    });

    await file.save();
    res.status(201).json({ message: "File uploaded successfully", file });
  } catch (error) {
    console.error("Upload File Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Download file by ID
const downloadFile = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });

    res.download(path.resolve(file.path), file.originalName);
  } catch (error) {
    console.error("Download File Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadFile, downloadFile };
