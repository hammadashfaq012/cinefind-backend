// Route definitions for all /api/shows endpoints.
// IMPORTANT: /search is registered BEFORE /:id so Express matches
// the literal path "search" instead of treating it as an :id parameter.

import express from "express";
import {
  searchShows,
  getShowById,
  getShows,
  createShow,
  updateShow,
  deleteShow,
} from "../controllers/showController.js";

const router = express.Router();

// Search by name or genre (must come before /:id to avoid route conflict)
router.get("/search", searchShows);

// Get all shows
router.get("/", getShows);

// Get a single show by numeric ID
router.get("/:id", getShowById);

// Create a new show
router.post("/", createShow);

// Update an existing show
router.put("/:id", updateShow);

// Delete a show
router.delete("/:id", deleteShow);

export default router;
