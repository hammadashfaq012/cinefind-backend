import express from "express";
import { searchShows, getShowById, getShows, createShow, updateShow, deleteShow } from "../controllers/showController.js";

const router = express.Router();

router.get("/search", searchShows);
router.get("/", getShows);
router.get("/:id", getShowById);
router.post("/", createShow);
router.put("/:id", updateShow);
router.delete("/:id", deleteShow);

export default router;
