import mongoose from "mongoose";

// Define the document schema
const DocumentSchema = new mongoose.Schema({
  fileName: { type: String, required: true }, // Original file name
  fileUrl: { type: String, required: true }, // Accessible file URL
  uploadedAt: { type: Date, default: Date.now }, // Upload timestamp
  responsible: { type: String, default: "Unknown" }, // Additional field for "Responsible"
  status: { type: String, default: "Filled" }, // File status, e.g., "Filled", "Pending"
});

// Export the model
export default mongoose.model("Document", DocumentSchema);