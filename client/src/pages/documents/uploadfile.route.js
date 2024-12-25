import express from "express";
import multer from "multer";
import Document from "./uploadfilesmodel.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Local uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({ storage });

// Upload a document
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { originalname } = req.file; // Get original file name
    const fileUrl = `http://localhost:3000/files/${req.file.filename}`; // Generate accessible URL

    // Save file details in MongoDB
    const document = new Document({
      fileName: originalname,
      fileUrl,
      responsible: req.body.responsible || "Admin", // Optional responsible person
    });

    const savedDocument = await document.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    console.error("Error uploading document:", error.message);
    res.status(500).json({ error: "Failed to upload document." });
  }
});

// Get all documents
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find().sort({ uploadedAt: -1 }); // Sort by latest uploaded
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error.message);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
});

// Delete a document by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findByIdAndDelete(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found." });
    }

    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error("Error deleting document:", error.message);
    res.status(500).json({ error: "Failed to delete document." });
  }
});

// Serve files
router.use("/files/:filename", express.static("uploads"));

export default router;

