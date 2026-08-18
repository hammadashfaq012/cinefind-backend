// Entry point for the CineFind backend server.
// Connects to MongoDB, sets up Express middleware, mounts API routes, and starts listening.

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import showRoutes from "./routes/showRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas cluster
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow cross-origin requests from the React frontend (Vite dev server)
app.use(cors());

// Parse incoming JSON request bodies (needed for POST/PUT)
app.use(express.json());

// Mount all show-related routes under /api/shows
app.use("/api/shows", showRoutes);

// Health-check endpoint to verify the server is running
app.get("/", (req, res) => {
  res.json({ message: "CineFind backend is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
