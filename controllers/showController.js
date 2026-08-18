// Controller functions for all show-related API endpoints.
// Each function handles one route and interacts with the Show model.

import Show from "../models/Show.js";

/**
 * Converts a Mongoose document into a plain object compatible with the React frontend.
 * Renames "showId" to "id" and strips internal MongoDB fields (_id, __v).
 */
const transformShow = (show) => {
  const obj = show.toObject();
  obj.id = obj.showId;
  delete obj.showId;
  delete obj._id;
  delete obj.__v;
  return obj;
};

/**
 * GET /api/shows/search?q=<query>
 * Searches shows by name OR genre (case-insensitive regex).
 * Returns an empty array if the query is empty or missing.
 * Example: /api/shows/search?q=horror → shows with "Horror" genre or "horror" in name
 */
const searchShows = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.trim() === "") {
      return res.status(200).json([]);
    }

    // Use Mongoose $regex (safer than new RegExp which is vulnerable to injection)
    const regex = { $regex: query, $options: "i" };

    const shows = await Show.find({
      $or: [
        { name: regex },
        { genres: regex },
      ],
    });

    res.status(200).json(shows.map(transformShow));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/shows/:id
 * Returns a single show by its numeric showId.
 * Returns 400 if the ID is not a valid number, 404 if not found.
 */
const getShowById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid show ID" });
    }

    const show = await Show.findOne({ showId: id });

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json(transformShow(show));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/shows
 * Returns all shows in the database.
 * Used by the homepage featured section and explore recommended section.
 */
const getShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows.map(transformShow));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/shows
 * Creates a new show. Auto-generates a unique showId using Date.now().
 */
const createShow = async (req, res) => {
  try {
    const showId = Date.now();
    const show = await Show.create({ ...req.body, showId });
    res.status(201).json(transformShow(show));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /api/shows/:id
 * Updates an existing show by its showId.
 * Returns 404 if no show with that ID exists.
 */
const updateShow = async (req, res) => {
  try {
    const show = await Show.findOneAndUpdate(
      { showId: Number(req.params.id) },
      req.body,
      { new: true }
    );

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json(transformShow(show));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /api/shows/:id
 * Deletes a show by its showId.
 * Returns 404 if no show with that ID exists.
 */
const deleteShow = async (req, res) => {
  try {
    const show = await Show.findOneAndDelete({ showId: Number(req.params.id) });

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json({ message: "Show deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { searchShows, getShowById, getShows, createShow, updateShow, deleteShow };
